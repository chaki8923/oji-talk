<template>
  <div>
    <form @submit.prevent="login" class="p-form">
      <h2>ログイン</h2>
      <div class="p-form__group">
        <input
          type="text"
          v-model="email"
          placeholder="Email"
          class="p-form__input"
        />
        <input
          type="password"
          v-model="password"
          placeholder="パスワード"
          class="p-form__input"
          autocomplete="true"
        />
        <div class="error">
          <p>{{ error }}</p>
        </div>
        <button>ログイン</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import  setItem from '../auth/setItem';
export default {
  emits:['redirectToChatRoom'],
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        const res = await axios.post("http://localhost:3000/auth/sign_in", {
          email: this.email,
          password: this.password,
        });
        if (!res) {
          this.error = "Emailまたはパスワードが違います";
          throw new Error("Emailまたはパスワードが違います");
        }

        if (!this.error) {
          console.log(res);
          console.log("ログイン成功");
          this.$emit("redirectToChatRoom");

          setItem(res.headers,res.data.data)
        }
      } catch (error) {
        console.log(error.response.data.errors[0]);

        this.error = "Emailまたはパスワードが違います";
      }
    },
  },
};
</script>

<style lang="scss">
</style>