<template>
  <div>
    <div>
      Pipeline Count: {{pipelines.length}}<br>
      {{pipelines}}
    </div>
    <form>
      Pipeline:
      <input type="text" v-model="name" placeholder="Sample Pipeline">
      <br>
      Input topic:
      <input type="text" v-model="input" placeholder="identity">
      <br>
      Output topic:
      <input type="text" v-model="output" placeholder="log">
      <br>
      function (data, callback) => {<br>
      <textarea v-model.lazy="code"></textarea>
      <br>
      }
      <br>
      <button v-on:click="createPipeline">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      name: null,
      input: null,
      output: null,
      code: '',
    };
  },
  computed: {
    pipelines () {
      return this.$store.getters['pipeline/list'];
    }
  },
  methods: {
    createPipeline: function () {
      const pipeline = Object.assign({}, {
        name: this.name,
        input: [this.input],
        output: [this.output],
        operations: [{
          name: 'tigger',
          func: this.code,
        }]
      });

      this.$store.dispatch('pipeline/create', pipeline);
    }
  },

  beforeCreate () {
    this.$store.dispatch('pipeline/find');
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
