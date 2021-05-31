<template>
  <div class="search">
    <div class="search-top">
      <span>搜索</span>
      <span>"{{keyWords}}"</span>
      <span>找到了{{songCount}}首单曲</span>
    </div>
    
      <el-table ref="singleTable" :data="songs" highlight-current-row
      @current-change="handleCurrentChange" @row-click="getMusicId" :lazy="true" style="width: 100%" height="645px" class="search-table">
          <el-table-column type="index" width="100">
          </el-table-column>
          <el-table-column label="歌曲" property="name" width="250">
          </el-table-column>
          <el-table-column label="歌手" property="artists[0].name" width="200">
          </el-table-column>
          <el-table-column label="专辑" property="album.name" width="200">
          </el-table-column>
          <el-table-column label="时长" property="duration">
            <template scope="scope">
                {{ scope.row.duration | showTime }}
            </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { getSearchAll } from 'network/home'
import { getTime } from 'common/utils'

export default {
  data(){
    return{
      keyWords: "",
      songCount: 0,
      songs: []
    }
  },
  created(){
    this.keyWords = this.$route.params.keyWords //获取输入内容
    this.getSearchAll()
  },
  watch:{
    //监听第一次搜索过后输入框的变化
    '$route.path':function(newVal,oldVal){
      if(this.keyWords != ""){
        console.log("我是第N次搜索！！")
        this.keyWords = this.$route.params.keyWords
        this.getSearchAll()
      }
    }
  },
  methods:{
    //搜索歌曲
    getSearchAll(){
      getSearchAll(this.keyWords).then(res => {
        console.log(res)
        this.songCount = res.result.songCount
        this.songs = res.result.songs
      })
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    //点击歌曲传row.id给footer播放歌曲
    getMusicId(row){
      console.log(row)
      console.log("我被点击了")
      this.$bus.$emit("getMusicId",row.id)
    }
  },
  filters:{
    showTime(value){
      let date = new Date(value/1000);
      //将date进行格式化
      return getTime(date)
    }
  }
}
</script>

<style>

.search-top{
  padding-left: 10px;
  font-size:14px;
}
.search-table{
  cursor: pointer;
}

</style>

<style scoped>
.search{
  height: 100%;
  width: 100%;
  padding: 10px 0;
}
.el-table{
  background-color: rgba(255, 255, 255, 0)
}
/deep/.el-table th{
  background-color: rgba(255, 255, 255, 0);
}
/deep/.el-table tr {
  background-color: rgba(255, 255, 255, 0);
}

</style>