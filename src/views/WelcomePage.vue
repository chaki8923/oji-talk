<template>
  <div class="container">
    <div class="welcome">
      <div v-if="shouldShowLogin">
        <login-form @redirectToChatRoom="redirectToChatRoom" />
        <p>
          未登録の方は<span class="p-form__swicth" @click="toggleShowForm"
            >コチラ</span
          >から
        </p>
      </div>
      <div v-if="!shouldShowLogin">
        <sign-up @redirectToChatRoom="redirectToChatRoom" />
        <p>
          登録済みの方は<span class="p-form__swicth" @click="toggleShowForm"
            >コチラ</span
          >から
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import SignUp from "../components/SignUp.vue";
export default {
  components: { LoginForm, SignUp },
  data() {
    return {
      shouldShowLogin: true,
    };
  },
  methods: {
    toggleShowForm() {

      this.shouldShowLogin = !this.shouldShowLogin;
    },
    redirectToChatRoom(){
      this.$router.push('/chatroomlist')
    }
  },
  mounted() {},
};
</script>


<style lang="scss" scoped>
</style>