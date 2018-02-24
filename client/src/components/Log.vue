<template>
  <div style="margin:20px">
    <span v-for="(log, index) in logs" :key="log.timestamp">
      {{log.origin || index+1}} : {{log.message}}<br>
    </span>
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
