<template>
<v-layout row wrap>
  <v-progress-linear v-bind:indeterminate="true" v-if="loading"></v-progress-linear>
  <v-flex xs12 v-if="rss_sources" v-for="rss_source in rss_sources" :key="rss_source.source_id">
    <v-card>
      <v-card-text>
        <v-text-field label="Name" v-model="rss_source.source_name"></v-text-field>
        <v-text-field label="URL" v-model="rss_source.source_url" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn v-on:click="saveRSS(rss_source)">Save</v-btn>
        <v-btn error v-on:click="deleteRSS(rss_source)">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
  <v-btn fixed dark fab bottom right class="pink" v-on:click="addRSS()">
    <v-icon>add</v-icon>
  </v-btn>
</v-layout>
</template>

<script>
import axios from 'axios'
export default{
  data: () => ({
    loading: true,
    rss_sources: []
  }),
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      axios.get('http://172.17.210.18:5000/api/rss_sources/')
      .then(response => {
        this.rss_sources = response.data
        this.loading = false
      })
    },
    saveRSS (rssSource) {
      if (rssSource.source_id) {
        axios.put('http://172.17.210.18:5000/api/rss_sources/' + rssSource.source_id, rssSource)
        .then(response => {
          this.fetchData()
        })
      } else {
        axios.post('http://172.17.210.18:5000/api/rss_sources/', rssSource)
        .then(response => {
          this.fetchData()
        })
      }
    },
    deleteRSS (rssSource) {
      axios.delete('http://172.17.210.18:5000/api/rss_sources/' + rssSource.source_id)
      .then(response => {
        this.rss_sources.splice(this.rss_sources.indexOf(rssSource), 1)
      })
    },
    addRSS () {
      this.rss_sources.push({source_name: '', source_url: ''})
    }
  }
}
</script>