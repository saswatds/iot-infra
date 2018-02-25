<template>
  <el-container>
    <el-header>Pipeline Commander</el-header>
    <el-main>
      <el-row>
        <el-col :md="24" :lg="12">
          <el-form ref="pipelineForm" :model="pipelineForm" label-width="100px">
            <el-form-item label="Pipeline" prop="name">
              <el-input type="text" v-model="pipelineForm.name" placeholder="Sample Pipeline"></el-input>
            </el-form-item>
            <el-form-item label="Inputs" prop="input">
                <el-select
                  v-model="pipelineForm.input"
                  multiple
                  filterable
                  placeholder="Choose input topics">
                  <el-option
                    v-for="item in options.input"
                    :key="item.topic"
                    :label="item.topic"
                    :value="item.topic">
                  </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="Outputs" prop="output">
                 <el-select
                  v-model="pipelineForm.output"
                  multiple
                  filterable
                  placeholder="Choose output topics">
                  <el-option label="log" value="log"></el-option>
                  <el-option label="store" value="store"></el-option>
                  <el-option
                    v-for="item in options.output"
                    :key="item.topic"
                    :label="item.topic"
                    :value="item.topic">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Function" prop="code">
            trigger (
            <el-tooltip class="item" effect="dark" content="type: String" placement="top-start">
              <el-tag size="mini">data</el-tag>
            </el-tooltip> ,
            <el-tooltip class="item" effect="dark" content="Invoke done with (err, response)" placement="top-start">
              <el-tag size="mini" >done</el-tag>
            </el-tooltip>) {
            <editor v-model="pipelineForm.code" lang="javascript" height="300"></editor>
            }
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="createPipeline">Create</el-button>
              <el-button @click="resetForm('pipelineForm')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-switch
            style="float: right"
            v-model="mode"
            active-text="Logs"
            inactive-text="Pipelines">
          </el-switch>
          <log v-if="mode"></log>
          <pipeline v-else></pipeline>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import editor from 'vue2-ace-editor'
import Pipeline from '@/components/Pipeline'
import Log from '@/components/Log'
export default {
  name: 'Home',
  components: {
    editor,
    Pipeline,
    Log
  },
  data() {
    return {
      pipelineForm: {
        name: '',
        input: [],
        output: [],
        code: ''
      },
      mode: false,
      doneRegx: /done\(([\sa-zA-Z"']+),([\sa-zA-Z0-9\(\)"',|.\{\}:]+)\)/
    };
  },
  computed: {
    options() {
      return {
        input: this.$store.getters['topic/list'].filter(i=> i.type === 'input'),
        output: this.$store.getters['topic/list'].filter(i=> i.type === 'output'),
      }
    }
  },
  methods: {
    createPipeline: function () {

      // Step one check that done has been called in the code with two paramemters
      if(!(this.pipelineForm.name)) return this.$message.error('Opps, Pipeline name is required');
      if(!(this.pipelineForm.input && this.pipelineForm.input.length)) return this.$message.error('Opps, atleast one input topic is needed');
      if(!(this.pipelineForm.output && this.pipelineForm.output.length)) return this.$message.error('Opps, atleast one output topic is needed');
      if(!this.pipelineForm.code.match(this.doneRegx)) return this.$message.error('Oops, done has to be called with both parameters');

      const pipeline = Object.assign({}, {
        name: this.pipelineForm.name,
        input: this.pipelineForm.input,
        output: this.pipelineForm.output,
        operations: [{
          name: 'trigger',
          func: this.pipelineForm.code,
        }]
      });
      console.log('creating new pipeline');
      this.$store.dispatch('pipeline/create', pipeline);
    },
    resetForm(formName) {
        console.log(formName);
        this.$refs[formName].resetFields();
    }
  },
   beforeCreate () {
    this.$store.dispatch('topic/find');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
