<template>
  <div>
    <el-table
      :data="pipelines"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Name">
      </el-table-column>
      <el-table-column
        label="Input">
         <template slot-scope="scope">
          {{scope.row.input &&scope.row.input.length && scope.row.input.join(', ')}}
        </template>
      </el-table-column>
      <el-table-column
        label="Output">
        <template slot-scope="scope">
          {{scope.row.output &&scope.row.output.length && scope.row.output.join(', ')}}
        </template>
      </el-table-column>
      <el-table-column
        label="Function">
        <template slot-scope="scope">
          <el-popover v-for="opp in scope.row.operations" :key="opp.name" trigger="hover" placement="bottom">
            <i>function</i> trigger(data, done) {<br>
            <span style="margin-left: 20px">{{ opp.func }}</span>
            <br>}
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ opp.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
   computed: {
    pipelines () {
      return this.$store.getters['pipeline/list'];
    }
  },
  methods:{
    handleDelete(index, row) {
      if(confirm("Are you sure?")) this.$store.dispatch('pipeline/remove',row._id);
    }
  },
  beforeCreate () {
    this.$store.dispatch('pipeline/find');
  }
}
</script>

<style>

</style>
