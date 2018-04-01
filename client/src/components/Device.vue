<template>
  <el-row style="margin-top: 40px">
    <el-col :span="7" v-for="o in topics" :key="o._id" style="margin-right: 15px; margin-top:10px">
      <el-card :body-style="{ padding: '0px' }">
        <div style="padding: 14px;">
          <h4>{{o.topic.toUpperCase()}}</h4>
          <span style="word-wrap: break-word">{{o.type}}: {{o.value || 'no data'}}</span>
          <div class="bottom clearfix">
            <div class="time">{{o._id}}</div>
          </div>
        </div>
      </el-card>
    </el-col>
</el-row>
</template>

<script>
export default {
  computed: {
    topics() {
      return this.$store.getters["topic/list"].filter(function(topic){
        return topic.type === 'input'
      });
    }
  }
};
</script>

<style scoped>
  .time {
    font-size: 11px;
    color: #24e;
  }

  .bottom {
    margin-top: 13px;
    line-height: 10px;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
