<template>
  <div>
    <p v-for="log in logs" :key="log.timestamp">
      {{log.message}}
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    logs () {
      return this.$store.getters['log/list'];
    }
  },
   beforeCreate () {
    this.$store.dispatch('log/find');
  }
}
</script>

<style>

</style>
