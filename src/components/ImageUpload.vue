<template>
  <div>
    
      <h2>画像登録</h2>
      <div class="p-form__group">
        <file-upload-form @imagePath="image = $event" />
  
        <div class="error">
          <p>{{ error }}</p>
        </div>
        <button @click="signup">画像登録</button>
      </div>
    
  </div>
</template>

<script>
import axios from "axios";
import FileUploadForm from "./FileUploadForm.vue";

export default {
  components: { FileUploadForm },

  data() {
    return {
      image: null,
      error: null,
    };
  },
  methods: {
    async signup() {
      this.error = null;
      console.log("アバター");
      console.log(this.image);
      let formData = new FormData();

      formData.append("image", this.image);

      try {
        const res = await axios.post(
          "http://localhost:3000/users/1/avatars",formData,
          { headers: {
      'Content-Type': 'application/json'
    }}
        );

        if (!res) {
          this.error = "新規登録できませんでした";
          throw new Error("ログインできませんでした");
        }

        console.log("登録成功");
        // this.$router.push('/chatroomlist')
        console.log(res);

        return res;
      } catch (error) {
        console.log(error);
        this.error = "登録に失敗しました";
      }
    },
  },
};
</script>

<style lang="scss">
</style>