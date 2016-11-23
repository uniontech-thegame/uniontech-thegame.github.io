<template>
  <div class="page">
    <div class="container">
      <h1>Sponsors</h1>
      <p>
        <ul>
          <li><a href="https://www.decathlon.fr"><img src="../assets/images/sponsors/decathlon.png" alt="Decathlon"></a></li>
          <li><a href="https://www.topachat.com"><img src="../assets/images/sponsors/topachat.png" alt="Top Achat"></a></li>
          <li><a href="https://www.g2a.com"><img src="../assets/images/sponsors/g2a.png" alt="G2A"></a></li>
          <li><a href="http://www.goclecd.fr"><img src="../assets/images/sponsors/goclecd.png" alt="Goclecd"></a></li>
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
  background-color: #532c00;
}

.container {
  overflow-y: auto;
}

li {
  font-size: 20px;
}
</style>
