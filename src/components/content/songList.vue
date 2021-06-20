<template>
  <div class="song-list">
    <div class="song-list-top">
      <div class="song-list-top-left">
        <img :src="songlist.coverImgUrl">
      </div>
      <div class="song-list-top-right">
        <div class="songListName">
          {{songlist.name}}
        </div>
        <div class="creator">
          <div class="creator-img">
            <img :src="creator.avatarUrl" alt="">
          </div>
          <div class="creator-name"> 
            {{creator.nickname}}
          </div>
          <div class="create-time">
            创建于{{songlist.createTime | showDate}}
          </div>
        </div>
        <div class="create-title">
          标签：
          <div v-for="(item,index) in songlist.tags" :key="index">#{{item}}</div>
        </div>
        <div class="create-text">
          简历：<p>{{songlist.description}}</p>
        </div>
        <el-button type="primary" round>播放全部</el-button>
        <el-button round>收藏</el-button>
        <el-dropdown>
            <el-button class="el-icon-more" round></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>下载</el-dropdown-item>
            <el-dropdown-item>批量操作</el-dropdown-item>
            <el-dropdown-item>分享</el-dropdown-item>
            <el-dropdown-item>举报</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="song-list-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="'歌曲' + songListTotal" name="first">
          <el-table :data="songlistSongs" style="width: 100%"  @row-click="getMusicId" :lazy="true">
            <el-table-column property="name" label="歌曲" width="250">
            </el-table-column>
            <el-table-column property="singer" label="歌手" width="250">
            </el-table-column>
            <el-table-column property="al" label="专辑" width="250">
            </el-table-column>
            <el-table-column property="duration" label="时长">
              <template scope="scope">
                {{ scope.row.duration | showTime }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="评论" name="second">
          
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getSongList } from 'network/songList'
import { formatDate,getTime } from 'common/utils'
import { getSongDetail } from 'network/home'

export default {
  data(){
    return{
      songlist: [],
      creator: [],
      activeName: 'first',
      trackIds: [],
      songlistSongs: [],
      songListTotal: 0
    }
  },
  created(){
    // const songListId = this.$route.params.songListId
    //获取推荐歌单详情
    getSongList(this.$route.params.songListId).then(res => {
      this.songlist = res.playlist
      this.creator = res.playlist.creator
      this.trackIds = res.playlist.trackIds
      console.log(res)
      this.getTrackIds()
    })
  },
  mounted(){
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //获取推荐歌单的歌曲
    getTrackIds(){
      this.trackIds.forEach(element => {
        let trackIdsObj = {}
        getSongDetail(element.id).then(res => {
          trackIdsObj.id = res.songs[0].id
          trackIdsObj.name = res.songs[0].name
          trackIdsObj.al = res.songs[0].al.name
          let singerObj = []
          res.songs[0].ar.forEach(value => {
            singerObj.push(value.name)
          })
          trackIdsObj.singer = singerObj.join('/')
          trackIdsObj.duration = res.songs[0].dt
          this.songlistSongs.push(trackIdsObj);
          this.songListTotal = this.songlistSongs.length
        })
      })
    },
    getMusicId(row){
      console.log(row)
      console.log("我被点击了")
      this.$bus.$emit("getMusicId",row.id)
    }
  },
  filters: {
		  showDate(value) {
        //1.将时间戳转成Date对象
        let date = new Date(value);
        //2.将date进行格式化
        return formatDate(date, 'yyyy-MM-dd')
      },
      showTime(value){
        let date = new Date(value/1000);
        //将date进行格式化
        return getTime(date)
      }
  },
  beforeRouteEnter(to,from,next){
    if(from.name === "recommend"){
      to.meta.keepAlive = false
      console.log(to.meta)
    }
    next()
  }
}
</script>

<style>
.song-list{
  padding: 10px;
  height: 680px;
  overflow-y: hidden;
}
.song-list:hover{
  overflow-y: auto;
}
.song-list-top{
  width: 100%;
  height: 220px;
  display: flex;
}
.song-list-top-left{
  height: 100%;
  width: 220px;
  border-radius: 15px;
  overflow: hidden
}
.song-list-top-left img{
  width: 100%;
  height: 100%;
}
.song-list-top-right{
  flex: 1;
  height: 220px;
  padding-left: 20px;
  width: 760px;
}
.songListName{
  height: 40px;
  font-size: 30px;
  width: 100%;
  word-break: keep-all;/* 不换行 */
  white-space: nowrap;/* 不换行 */
  overflow: hidden;/* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis;/* 当对象内文本溢出时显示省略标记(...)*/
}
.creator{
  width: 100%;
  height: 40px;
  display: flex;
}
.creator-img{
  height: 100%;
  width: 30px;
  overflow: hidden;
  /* margin-top: 8px; */
}
.creator-img img{
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-top: 6px;
}
.creator-name,.create-time{
  height: 100%;
  font-size: 12px;
  padding: 20px 0 0 5px;
}
.create-title{
  display: flex;
  width: 100%;
  height: 40px;
  padding-top: 10px;
  font-size: 16px;
}
.create-title>div{
  margin: 0 10px;
}
.create-text{
  font-size: 16px;
  height: 66px;
  display: flex;
}
.create-text p{
  margin-left: 10px;
  height: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  width: 92%;
}
.song-list-content{
  width: 100%;
  height: 600px;
}
</style>

<style scoped>
.el-button{
  padding: 8px 16px!important;
}
.el-dropdown{
  margin-left: 10px;
}
/deep/.el-tabs__nav-wrap::after{
  width: 0;
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