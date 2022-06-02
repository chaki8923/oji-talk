<template>
  <div>
    <form @submit.prevent="createRoom"  class="p-form">
    <h2>ルーム登録</h2>
      <div class="p-form__group">
        <input type="text" v-model="email" placeholder="Email" class="p-form__input" />
        <input type="password" v-model="password" placeholder="パスワード" class="p-form__input" />
        <div class="error">
          <p>{{ error }}</p>
        </div>
        <button>ログイン</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  }
}
</script>
