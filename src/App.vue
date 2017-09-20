<template>
  <v-app>
    <v-navigation-drawer temporary v-model="drawer" light overflow absolute>
      <v-list class="pt-0" dense>
        <v-list-tile v-for="item in $router.options.routes" :key="item.title" v-on:click="$router.push(item.path)">
          <v-list-tile-content>
           <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed class="light-green" dark dense absolute>
      <v-toolbar-side-icon v-on:click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ $router.currentRoute.name }}</v-toolbar-title>
    </v-toolbar>

    <main>
      <v-container fluid grid-list-md>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
}
</script>