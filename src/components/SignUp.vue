<template>
  <div>
    <h2>新規登録</h2>
    <div class="p-form__group">
      <input
        type="text"
        v-model="name"
        placeholder="Name"
        class="p-form__input"
      />
      <input
        type="text"
        v-model="email"
        placeholder="Email"
        class="p-form__input"
      />
      <form action="">
        <input
          type="password"
          v-model="password"
          placeholder="パスワード"
          class="p-form__input"
          autocomplete="true"
        />

        <input
          type="password"
          v-model="passwordConfirmation"
          placeholder="パスワード(確認用)"
          class="p-form__input"
          autocomplete="true"
        />
      </form>
      <file-upload-form @imagePath="imageInfo = $event" ref="child" />
      <div class="error">
        <p>{{ error }}</p>
      </div>
      <button @click="signup">新規登録</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FileUploadForm from "./FileUploadForm.vue";
import  setItem from '../auth/setItem';

export default {
  emits: ["redirectToChatRoom"],
  components: { FileUploadForm },

  data() {
    return {
      name: "",
      email: "",
      image: null,
      password: "",
      passwordConfirmation: "",
      error: null,
      fileName: "",
      imageInfo: [],
    };
  },
  methods: {
    async signup() {
      //子コンポーネントのcropFileイベント発火
      // this.$refs.child.cropFile()
      this.error = null;
      console.log("パラメーター画像");

      let formData = new FormData();

      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append(
        "image",
        this.imageInfo["blob"],
        this.imageInfo["fileName"]
      );
      formData.append("password", this.password);
      formData.append("password_confirmation", this.passwordConfirmation);

      try {
        const res = await axios.post("http://localhost:3000/auth", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res) {
          this.error = "新規登録できませんでした";
          throw new Error("ログインできませんでした");
        }

        if (!this.error) {
          console.log("登録成功");
          setItem(res.headers,res.data.data)
          console.log(res);
          this.$emit("redirectToChatRoom");
        }

        return res;
      } catch (error) {
        console.log(error);
        this.error = "登録に失敗しました";
      }
    },
    toggleShowForm() {
      this.$emit("toggleShowForm");
    },
  },
};
</script>

<style lang="scss">
</style>