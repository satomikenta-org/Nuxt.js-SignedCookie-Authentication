<template>
  <div>
    <h1>Private Page</h1>
    <div>Your ID : {{ $store.state.token }}</div>
    <button @click="$router.push('/')">Go To Home</button>
  </div>
</template>

<script>
export default {
  middleware: 'authenticate',
  beforeMount() {
    console.log(this.$store.state);
  }
}
</script>

<style>

</style>
