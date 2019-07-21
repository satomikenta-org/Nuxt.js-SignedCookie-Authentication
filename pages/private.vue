<template>
  <div>
    <h1>Private Page</h1>
    <div>Your Cookie : {{ $store.state.token }}</div>
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
