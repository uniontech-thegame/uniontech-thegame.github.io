<template>
  <div id="app">
    <div v-if="isLoading" class="loading-screen"><p>Chargement... On y est presque !</p></div>
    <img src="../assets/images/logo.png" alt="UNION'TECH" id="logo" role="banner">
    <custom-menu></custom-menu>
    <router-view role="main"></router-view>
    <div class="free_counter"><span>{{ availableEnigmasCount }} énigme{{ availableEnigmasCount > 1 ? 's' : '' }} et {{ availableGiftsCount }} code{{ availableGiftsCount > 1 ? 's' : '' }} cadeau non trouvé{{ availableEnigmasCount > 1 || availableGiftsCount > 1 ? 's' : '' }}</span></div>
  </div>
</template>

<script>
import CustomMenu from './Menu'
import {mapState, mapActions} from 'eva.js'

export default {
  computed: {
    ...mapState(['isLoading', 'availableGiftsCount', 'availableEnigmasCount'])
  },
  methods: {
    ...mapActions(['refreshState'])
  },
  components: {
    CustomMenu
  },
  created () {
    this.refreshState()
  }
}
</script>

<style>
  html, body, #app, .page {
    height: 100%;
  }
  body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  }
  * {
    box-sizing: border-box;
    font-family: 'Source Sans Pro', sans-serif;
  }

  .page {
    background-color: white;
    
    padding-bottom: 50px;
  }

  .page .container {
    width: 80%;
    height: 100%;

    padding-top: 20px;
    padding-right: 10%;
    margin-left: 20%;

    overflow-y: auto;
  }

  h1, h2 {
    margin: 0;
  }

  h1 {
    font-size: 50px;
    text-shadow: 3px 3px 0 rgba(0, 0, 0, .3);
  }

  h1, p {
    color: #fff;
  }
</style>

<style scoped>
  #logo {
    position: fixed;
    top: 10px;
    left: 10px;

    width: 64px;
    height: 64px;
  }

  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, .8);

    text-align: center;
    color: #fff;
    font-size: 30px;

    z-index: 2;
  }

  .loading-screen > p {
    margin-top: 50vh;
    transform: translateY(-50%);
  }
  
  .free_counter {
    position: absolute;
    width: 100%;
    height: 50px;
    
    left: 0;
    bottom: 0;
    
    text-align: center;
    
    background-color: #fff;
    box-shadow: 0 -3px 5px rgba(0, 0, 0, .2);
    z-index: 1;
  }
  
  .free_counter > span {
    line-height: 50px;
    font-size: 20px;
  }
</style>
