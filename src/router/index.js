import Vue from 'vue'
import Router from 'vue-router'
import RssSources from '@/components/RssSources'
import RssEntries from '@/components/RssEntries'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: RssEntries
    },
    {
      path: '/rss_source',
      name: 'RSS Sources',
      component: RssSources
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
