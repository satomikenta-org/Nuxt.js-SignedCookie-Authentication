<template>
  <div class="container">
    <div>LOGIN</div>
    <button @click="handleLogin" v-if="!token">Login</button>
    <button @click="$router.push('/private')">Go To Private</button>
    <button @click="handleLogout" v-if="token">LOGOUT</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  middleware: 'authenticate',
  computed: {
    ...mapState(["token"])
  },
  methods: {
    async handleLogin() {
      try {
        await axios.post('/api/login', { email: 'satomi@gmail.com'});
        this.$store.commit('setToken', 'satomi@gmail.com');
        this.$router.push('/private');
      } catch (ex) {
        console.log(ex);
      }
    },
    async handleLogout() {
      try {
        await axios.get('/api/logout');
        this.$store.commit('removeToken');
      } catch (ex) {
        console.log(ex);
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
