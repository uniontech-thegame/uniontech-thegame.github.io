<template>
  <div class="page">
    <div class="container">
      <h1>Membres bienfaiteurs</h1>
      <p>Merci à eux !</p>
      <p>
        <ul>
          <li v-for="benefactor of benefactors"><b>{{ benefactor.name.first }} {{ benefactor.name.last }}</b></li>
        </ul>
      </p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'eva.js'

export default {
  computed: {
    ...mapState(['benefactors'])
  }
}
</script>

<style scoped>
.page {
  background-color: #f39c12;
}

.container {
  overflow-y: auto;
}

li {
  font-size: 20px;
}
</style>
