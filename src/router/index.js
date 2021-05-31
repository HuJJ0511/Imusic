import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'views/center/right/musics/MusicsView'
import recommend from 'views/center/right/musics/Comps/Recommend'
import songs from 'views/center/right/musics/Comps/Songs'
import anchor from 'views/center/right/musics/Comps/Anchor'
import singer from 'views/center/right/musics/Comps/Singer'

import vedios from 'views/center/right/vedios/VediosView'
import radios from 'views/center/right/radios/RadiosView'
import search from 'components/content/search'
import detail from 'components/content/detail'

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect: '/home/recommend'
  },
  {
    path: '/home',
    name: '/home',
    component: Home,
    children:[
      {
        path: 'recommend',
        name: 'recommend',
        component: recommend
      },
      {
        path: 'songs',
        name: 'songs',
        component: songs
      },
      {
        path: 'anchor',
        name: 'anchor',
        component: anchor
      },
      {
        path: 'singer',
        name: 'singer',
        component: singer
      }
    ]
  },
  {
    path: '/vedios',
    name: '/vedios',
    component: vedios
  },
  {
    path: '/radios',
    name: '/radios',
    component: radios
  },
  {
    path: '/search:keyWords',
    name: '/search',
    component: search
  },
  {
    path: '/detail',
    name: '/detail',
    component: detail
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router