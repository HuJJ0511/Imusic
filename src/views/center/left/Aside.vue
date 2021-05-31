<template>
    <el-aside width="200px">
      <el-scrollbar class="page-srcoll">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title"> 
              在线音乐
            </template>
            <div v-for="item in cetgory" @click="clickName(item.clickName)">
              <span>{{item.name}}</span>
            </div>
          </el-collapse-item>

          <el-collapse-item title="我的音乐">
            <div><span>我喜欢</span></div>
            <div><span>本地和下载</span></div>
            <div><span>播放历史</span></div>
            <div><span>试听列表</span></div>
            <div><span>已购音乐</span></div>
          </el-collapse-item>
          
          <el-collapse-item title="创建的歌单">
            <div><span>靓仔才听的歌</span></div>
            <div><span>夜半曲库</span></div>
            <div><span>非主流日记</span></div>
          </el-collapse-item>
          <el-collapse-item title="收藏的歌单">
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
            <div><span>抖音红曲</span></div>
       
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </el-aside>
</template>

<script>
export default {
 data() {
  return {
    activeName: '1',
      cetgory:[
          {name:'音乐馆',clickName:'/home/recommend'},
          {name:'视频',clickName:'/vedios'},
          {name:'电台',clickName:'/radios'},
        ]
    };
  },
  methods:{
    clickName(path){
      this.$router.push(path).catch(err=>{});
    },
    // getMusic(){
    //   this.$router.push('/').catch(err=>{})
    // },
    // getVedio(){
    //   this.$router.push('/videos').catch(err=>{})
    // }, 
    // getVedio(){
    //   this.$router.push('/radios').catch(err=>{})
    // }
  }
}
</script>

<style scoped>
.el-aside{
  height: 100%;
}
.el-collapse-item div{
  padding: 0 10px;
  height: 49px;
  position: relative;
}
.el-collapse-item div:hover{
  background-color: #ccc;
  cursor: pointer;
}
.el-collapse-item div span{
  position: absolute;
  top: 10px;
  height: 80%;
}
::v-deep .el-collapse-item__content{
  padding-bottom: 0px;
}
</style>