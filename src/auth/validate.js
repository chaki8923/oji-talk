import axios from "axios"
import { ref } from "vue"

const error = ref(null)


const validate = async() =>{

  error.value = null

  const accessToken = window.localStorage.getItem('access-token')
  const uid = window.localStorage.getItem('uid')
  const client = window.localStorage.getItem('client')
  try{
    const res = await axios.get('http://localhost:3000/auth/validate_token',{
      headers:{
        uid:uid,
        "access-token":accessToken,
        client:client
      }
    })

    if(!res){
      throw new Error('認証エラー')
    }

  
    
    
    return res
    
  }catch(err){
    console.log(err);
    error.value = '認証に失敗しました'
    window.localStorage.clear()
  }
}


const useValidate = () =>{
  return { error,validate }
}

export default useValidate