<template>
  <div class="">
    <nav-bar />
    <chat-window :messages="messages" />
    <new-chat-form @connectCable="connectCable" />
  </div>
</template>

<script>
import ChatWindow from "../components/ChatWindow.vue";
import NavBar from "../components/NavBar.vue";
import axios from "axios";
import NewChatForm from "../components/NewChatForm.vue";
import ActionCable from "actioncable";
export default {
  components: { NavBar, ChatWindow, NewChatForm },
  data() {
    return {
      messages: [],
      userId: window.localStorage.getItem("id"),
      roomId: window.localStorage.getItem("room_id"),
    };
  },
  methods: {
    async getMessages() {
      console.log("GET");

      try {
        const res = await axios.get(
          `http://localhost:3000/rooms/${this.roomId}/messages`,
          {
            headers: {
              uid: window.localStorage.getItem("uid"),
              "access-token": window.localStorage.getItem("access-token"),
              client: window.localStorage.getItem("client"),
            },
          }
        );

        if (!res) {
          console.log("メッセージを取得できませんでした。");
        }

        console.log("取得成功");
        console.log(res);

        this.messages = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    connectCable(message) {
      console.log("connectCable");

      this.messageChannel.perform("receive", {
        message: message,
        room_id: this.roomId,
        email: window.localStorage.getItem("uid"),
      });
    },
  },
  mounted() {
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    this.messageChannel = cable.subscriptions.create(
      { channel: "RoomChannel" , user_id:this.userId, room_id:this.roomId},
      {
        connected: () => {
          console.log("connected");
          this.getMessages();
        },
        received: () => {
          console.log("received");
          this.getMessages();
        },
      }
    );
  },
  beforeUnmount() {
    this.messageChannel.unsubscribe();
  },
};
</script>