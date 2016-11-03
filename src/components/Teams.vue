<template>
  <div class="page">
    <div class="container">
      <h1>Équipes et classement</h1>
      <p>Ceci est le classement des équipes. Vous pouvez également consulter les membres de chaque équipe et l'historique des points.</p>
      <p>
        <ul>
          <li v-for="(team, name) in teams" :class="{ yellow: name === 'Jaune', red: name === 'Rouge', green: name === 'Vert', blue: name === 'Bleu' }">
            <span class="position">{{ Object.keys(teams).indexOf(name) + 1 }}</span>
            Équipe {{ name }} avec <span class="points">{{ team.points }}</span> point{{ team.points > 1 ? 's' : '' }}
            <span class="action">
              <router-link :to="`/equipe/${name.toLowerCase()}`"><i class="material-icons">more_horiz</i> Membres et détail des points</router-link>
            </span>
          </li>
        </ul>
      </p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'eva.js'

export default {
  computed: {
    ...mapState(['teams'])
  }
}
</script>

<style scoped>
.page {
  background-color: #2c3e50;
}

ul {
  padding: 0;

  list-style-type: none;
}

li {
  width: 100%;
  min-width: 500px;

  padding-left: 10px;
  padding-bottom: 5px;

  line-height: 50px;
  border-bottom: 2px solid rgba(0, 0, 0, .3);
}

li > .position {
  font-size: 40px;
}

li > .points {
  font-size: 20px;
}

li.yellow { background-color: #f1c40f; }
li.red { background-color: #e74c3c; }
li.green { background-color: #2ecc71; }
li.blue { background-color: #3498db; }

.action {
  display: block;
  float: right;

  margin-right: 10px;
}

a {
  color: #fff;
}
</style>
