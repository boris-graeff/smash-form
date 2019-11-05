<template>
  <div class="home">
    <h1>Home</h1>
    <router-link :to="{ name: 'character', params: { name: 'mario' }}">Mario</router-link>
  </div>
</template>

<script>
export default {
};
</script>
