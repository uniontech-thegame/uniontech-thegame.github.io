<template>
  <div class="page">
    <div class="container">
      <h1>Équipe <span :class="{ yellow: team === 'jaune', red: team === 'rouge', green: team === 'vert', blue: team === 'bleu' }">{{team | capitalize}}</span></h1>

      <div class="team">
        <h2>Membres</h2>

        <p>
          <ul>
            <li v-for="player of currentTeam.players">{{ player.name.first }} {{ player.name.last }} (S{{ player.semester }})</li>
          </ul>
        </p>
      </div>

      <div class="points">
        <h2>Historique des points</h2>

        <h3><i class="material-icons">directions_run</i> Activités</h3>
        <p>
          <ul v-if="currentTeam.activitiesResults.length !== 0">
            <li v-for="activityResult of currentTeam.activitiesResults">
              <b>{{ activityResult.title }} ({{ activityResult.points }} point{{ activityResult.points > 1 ? 's' : '' }})</b>
              le {{ activityResult.date | date }}<br>
              <i>{{ activityResult.description }}</i>
            </li>
          </ul>
          <span v-else>Rien à afficher.</span>
        </p>

        <h3><i class="material-icons">search</i> Énigmes</h3>
        <p>
          <ul v-if="currentTeam.enigmas.length !== 0">
            <li v-for="enigma of currentTeam.enigmas">
              <b>{{ enigma.code }} ({{ enigma.points }} point{{ enigma.points > 1 ? 's' : '' }})</b>
              le {{ enigma.redeemDate | date }}<br>
              <i>
                Trouvé par {{ enigma.player.name.first }} {{ enigma.player.name.last }} (S{{ enigma.player.semester }}). {{ enigma.description }}<br>
                La réponse était "{{ enigma.answer }}".
              </i>
            </li>
          </ul>
          <span v-else>Rien à afficher.</span>
        </p>

        <h3><i class="material-icons">card_giftcard</i> Cadeaux</h3>
        <p>
          <ul v-if="currentTeam.gifts.length !== 0">
            <li v-for="gift of currentTeam.gifts">
              <b>{{ gift.code }} ({{ gift.points }} point{{ gift.points > 1 ? 's' : '' }})</b>
              le {{ gift.redeemDate | date }}<br>
              <i>Trouvé par {{ gift.player.name.first }} {{ gift.player.name.last }} (S{{ gift.player.semester }}). {{ gift.description }}</i>
            </li>
          </ul>
          <span v-else>Rien à afficher.</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'eva.js'

export default {
  data () {
    return {
      team: ''
    }
  },
  computed: {
    currentTeam: function () {
      const index = this.team.charAt(0).toUpperCase() + this.team.slice(1)
      return this.teams[index] || { players: [], activitiesResults: [], enigmas: [], gifts: [] }
    },
    ...mapState(['teams'])
  },
  created () {
    this.team = this.$route.params.team
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    date: function (value) {
      const pad = (str, n = 2) => {
        let padding
        for (let i = 0; i <= n; i++) padding += '0'
        return (padding + str).slice(-n)
      }
      const date = new Date(value)
      return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${pad(date.getFullYear(), 4)} à ${pad(date.getHours())}:${pad(date.getMinutes())}`
    }
  }
}
</script>

<style scoped>
.page {
  background-color: #2c3e50;
}

h2, h3 {
  color: #fff;
}

h3 {
  margin-left: 10px;
}

h1 > span {
  padding-left: 10px;
  padding-right: 20px;

  font-style: italic;
}

h1 > span.red { background-color: #e74c3c; }
h1 > span.yellow { background-color: #f39c12; }
h1 > span.blue { background-color: #2980b9; }
h1 > span.green { background-color: #27ae60; }

.team, .points {
  width: 50%;
}

.team {
  float: left;
}

.points {
  float: right;
}
</style>
