import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from "../views/WelcomePage"
import ChatRoomList from "../views/ChatRoomList"
import AvatarRegister from "../views/AvatarRegister"
import ChatRoom from "../views/ChatRoom"

import useValidate from '@/auth/validate'
const {error, validate } = useValidate()

const requireAuth = async(to, from, next)=>{
  //toは次に表示されるページのルート
  //fromは遷移元
  //nextはそのページにアクセスさせるか、他のページへリダイレクトさせるかなどを操作するためのメソッド

  const accessToken = window.localStorage.getItem('access-token')
  const uid = window.localStorage.getItem('uid')
  const client = window.localStorage.getItem('client')
  
  if(!accessToken || !uid || !client){
    console.log('ログインしていません');
    next({name:'Welcome'})
    return
  }
  
  
  await validate()
  
  if(error.value){
    console.log('認証失敗');
    next({path:'/'})
    
  }else{
    
    next()
  }
  
  
}

const noRequireAuth = async(to,from,next) => {
  
  const accessToken = window.localStorage.getItem('access-token')
  const uid = window.localStorage.getItem('uid')
  const client = window.localStorage.getItem('client')

  if(!accessToken && !uid && !client){
    console.log('認証なし');
    next()
    return
    
  }
  await validate()

  if(!error.value){
    console.log('認証済みや');
    
    next({name:'ChatRoomList'})
    
   

  }else{
    next()
  }

  
}


const routes = [
  {
    path:'/',
    name:'Welcome',
    component:WelcomePage,
    beforeEnter:noRequireAuth
    
  },
  {
    path:'/chatroomlist',
    name:'ChatRoomList',
    component:ChatRoomList,
    beforeEnter:requireAuth
  },
  {
    path:'/imageupload',
    name:'ImageUpload',
    component:AvatarRegister,
  },
  
  {
    path:'/chatroom',
    name:'ChatRoom',
    component:ChatRoom,
    beforeEnter:requireAuth
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
