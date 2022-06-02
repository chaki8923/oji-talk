<template>
  <div class="chat-window">
    <div class="messages" v-if="messages">
      <ul class="message" v-for="message in messages" :key="message.id">
        <li
          :class="{
            received: message.user_id !== id,
            sent: message.user_id == id
          }"
        >

          <span class="name">{{ message.name }}</span>
          <span class="message">{{ message.content }}</span>
          <span class="created_at">{{ message.created_at }}</span>
          <button v-if="message.requestFlg" class="btn-danger">承認</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["messages"],
  data() {
    return {
      id: window.localStorage.getItem("id"),
    };
  },
};
</script>

<style scoped>
.chat-window {
  background: white;
  padding: 30px 20px;
  border-bottom: 1px solid #eee;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
ul li {
  display: inline-block;
  clear: both;
}
.received .message {
  background: #eee;
  padding: 10px;
  display: inline-block;
  border-radius: 30px;
  margin-bottom: 2px;
  max-width: 400px;
}
.received {
  float: left;
}
.sent {
  float: right;
}
.sent .message {
  background: #677bb4;
  color: white;
  padding: 10px;
  display: inline-block;
  border-radius: 30px;
  margin-bottom: 2px;
  max-width: 400px;
}
.name {
  position: relative;
  margin-right: 6px;
  display: block;
  font-size: 13px;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 20px;
  margin-left: 4px;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
</style>