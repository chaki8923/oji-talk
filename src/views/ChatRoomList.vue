<template>
  <div>
    <h2>チャットルーム</h2>
    <nav-bar />

    <div v-if="rooms">
      <div class="p-room">
        <ul v-for="room in rooms" :key="room.id">
          <li>
            <h3
              class="p-room__title"
              @click="chatRoomLink(room.user_room[0].room_id)"
            >
              {{ room.name }}
            </h3>
            <span
              class="btn btn-success"
              v-if="!room.user_room.some((r) => r.user_id === Number(userId))"
              @click="request(room.user_room[0].room_id)"
              >リクエスト</span
            >
          </li>
        </ul>
      </div>
      <div class="error">
        <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import ActionCable from "actioncable";
export default {
  components: { NavBar },
  data() {
    return {
      userId: window.localStorage.getItem("id"),
      rooms: [],
      error: null,
      userImage: window.localStorage.getItem("image"),
    };
  },
  methods: {
    async getRooms() {
      this.error = null;

      try {
        const res = await axios.get(
          `http://localhost:3000/users/${this.userId}/rooms`
        );
        if (!res) {
          console.log("ルーム取得失敗");
          throw new Error("ルーム取得失敗");
        }

        console.log("取得成功");
        this.rooms = res.data;
        console.log(res.data);
      } catch (error) {
        console.log(error);
        this.error = error.response.data.message;
      }
    },
    async request(room_id) {
      try {
        ここは承認押されたらの処理
        // const res = await axios.post(
        //   `http://localhost:3000/users/${this.userId}/user_rooms`,
        //   {
        //     room_id: room_id,
        //   },
        //   {
        //     headers: {
        //       uid: window.localStorage.getItem("uid"),
        //       "access-token": window.localStorage.getItem("access-token"),
        //       client: window.localStorage.getItem("client"),
        //     },
        //   }
        // );

        // if (!res) {
        //   throw new Error("リクエスト失敗");
        // }

        // console.log("リクエスト送信");
        // console.log(res);
        // console.log("connectCable");

      this.messageChannel.perform("receive", {
        message: 'リクエストが届きました。',
        room_id: room_id,
        email: window.localStorage.getItem("uid"),
        requestFlg:true
      });
      } catch (err) {
        console.log(err);
      }
    },
    chatRoomLink(id) {
      console.log(id);

      window.localStorage.setItem("room_id", id);
      this.$router.push("/chatroom");
    },
  },
  mounted() {
    this.getRooms();
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    this.messageChannel = cable.subscriptions.create(
      { channel: "RoomChannel",user_id:this.userId},
      {
        connected: () => {
          console.log("connected");
          this.getRooms();
        },
        received: () => {
          console.log("received");
          this.getRooms();
        },
      }
    );
  },
  computed: {
    // agreeCheck(){
    // }
  },
};
</script>

<style scoped lang="scss">
.user-image {
  width: 260px;
  height: 260px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
ul li {
  display: inline-block;
  clear: both;
  padding: 24px 16px;
  width: 100%;
  h3 {
    text-align: center;
    font-weight: normal;
  }
  .btn {
    color: #fff;
    padding: 12px 8px;
    cursor: pointer;
    font-size: 10px;
    margin-left: 16px;
  }
}
</style>