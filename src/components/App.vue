<template>
  <div id="app">
    <div v-if="isLoading" class="loading-screen"><p>Chargement... On y est presque !</p></div>
    <modal v-if="showAvailableModal" @close="showAvailableModal = false">
      <h3 slot="header">Codes et énigmes non trouvés</h3>
      <div slot="body" style="color: #000;">
        <h4>Énigmes non trouvées</h1>
        <ul>
          <template v-if="availableEnigmas.length !== 0">
            <li v-for="enigma in availableEnigmas">Énigme <i>{{ enigma.id }}</i></li>
          </template>
          <li v-else>Aucune</li>
        </ul>
        
        <h4>Codes cadeaux non trouvés</h1>
        <ul>
          <li v-for="count, location in availableGifts">{{ count }} {{ location | formatLocation }}</li>
        </ul>
      </div>
    </modal>
    <img src="../assets/images/logo.png" alt="UNION'TECH" id="logo" role="banner">
    <custom-menu></custom-menu>
    <router-view role="main"></router-view>
    <div class="free_counter"><span>{{ availableEnigmas.length }} <i class="material-icons">search</i> et {{ availableGifts.total }} <i class="material-icons">card_giftcard</i> non trouvé{{ availableEnigmas.length > 1 || availableGifts.total > 1 ? 's' : '' }} - <a href="#" @click.prevent="openAvailableModal">Détail</a></span></div>
  </div>
</template>

<script>
import CustomMenu from './Menu'
import {mapState, mapActions} from 'eva.js'
import Modal from './Modal'

export default {
  data () {
    return {
      showAvailableModal: false
    }
  },
  computed: {
    ...mapState(['isLoading', 'availableGifts', 'availableEnigmas'])
  },
  methods: {
    ...mapActions(['refreshState']),
    openAvailableModal () {
      this.showAvailableModal = true
    }
  },
  filters: {
    formatLocation (type) {
      switch (type) {
        case 'website':
          return 'sur le site Web'
        case 'total':
          return 'au total'
        case 'building':
          return "dans le bâtiment IN'TECH"
        case 'email':
          return 'dans les e-mails'
      }
    }
  },
  components: { Modal, CustomMenu },
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
