<template>
<nav>
  <div>
    <p>こんにちは、{{name}}さん</p>
    <p class="email">現在、{{email}}でログイン中です</p>
    <img :src="userImage" alt="" class="p-user__image">
  </div>
  <button @click="logout" class="btn-success">ログアウト</button>
</nav>
</template>

<script>
import axios from "axios";
export default {
  emits: [],
  data() {
    return {
      name:window.localStorage.getItem('name'),
      email:window.localStorage.getItem('uid'),
      userImage:window.localStorage.getItem('image'),
      error:null
    };
  },
  methods: {
    async logout(){
      this.error = null
      try{
        const res = await axios.delete("http://localhost:3000/auth/sign_out",{
          headers:{
            uid:this.email,
            "access-token":window.localStorage.getItem('access-token'),
            client:window.localStorage.getItem('client')
          }
        })

        if(!res){
          throw new Error('ログアウトできません')
        }

        window.localStorage.clear()
        console.log('成功');
        this.$router.push('/')
        
        console.log({res});
        
      }catch(error){
        console.log({error});
        this.error = 'ログアウトできませんでした'
        
      }
    }
  },
};
</script>

<style lang="scss">
 nav {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
</style>