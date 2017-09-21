<template>
<v-layout row wrap>
  <v-progress-linear v-bind:indeterminate="true" v-if="loading"></v-progress-linear>
  <v-flex xs12 v-if="!loading" v-for="rss_entry in rss_entries" :key="rss_entry.rssId">
    <v-card>
      <v-card-actions>
        <v-icon class="rss_title_icon" v-on:click="toggleShow(rss_entry, $event)">
          {{ rss_entry.show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
        </v-icon>
        <div>
          <h5 class="rss_title"><a target="_blank" v-bind:href="rss_entry.link" v-html="rss_entry.title"></a></h5>
          <span class="grey--text">{{rss_entry.source}}</span>
        </div>
        <v-spacer></v-spacer>
        <v-icon class="rss_title_icon" v-on:click="toggleShow(rss_entry, $event)">
          {{ rss_entry.show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
        </v-icon>
      </v-card-actions>
      <v-slide-y-transition>
        <v-card-text v-if="rss_entry.show">
          <div v-html="rss_entry.summary" class="content"></div>
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </v-flex>
  <v-btn block error v-on:click="deleteAll()" v-if="rss_entries.length > 0">
    Mark all as read
  </v-btn>
  <v-btn fixed dark fab bottom right class="teal" v-on:click="fetchData()">
    <v-icon>refresh</v-icon>
  </v-btn>
</v-layout>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    loading: true,
    rss_entries: []
  }),
  created () {
    this.fetchData()
  },
  methods: {
    hideEntry (entry) {
      entry.show = false
      return entry
    },
    fetchData () {
      this.loading = true
      axios.get('/api/rss_entries')
      .then(response => {
        this.rss_entries = response.data.map(this.hideEntry)
        this.loading = false
        window.scrollTo(0,0)
      })
    },
    toggleShow (rssEntry, event) {
      let currentShow = rssEntry.show
      this.rss_entries = this.rss_entries.map(this.hideEntry)
      rssEntry.show = !currentShow
      event.target.parentNode.parentNode.parentNode.scrollIntoView()
    },
    deleteAll () {
      let rssIds = this.rss_entries.map(x => x.rssId).join()
      axios.delete('/api/rss_entries/' + rssIds)
      .then(response => {
        this.fetchData()
      })
    }
  }
}
</script>

<style>
.content img{
  max-width: 100%;
}

.content h1,
.content h2,
.content h3,
.content h4 {
  font-size: 1.2em;
}
</style>

<style scoped>
.rss_title {
  line-height: inherit;
  margin-bottom: 0;
}

.rss_title_icon {
  margin-left: -0.2em;
  margin-right: 0;
}
</style>
