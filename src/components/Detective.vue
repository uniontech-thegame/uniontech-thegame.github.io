<template>
  <div class="page">
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Résultat</h3>
      <p slot="body" style="color: #000;">{{ result }}</p>
    </modal>
    <div class="container">
      <h1>Détective</h1>
      <p>Vous avez trouvé un code cadeau ou la réponse à une énigme ? Vous êtes au bon endroit.</p>
      <p>
        <form @submit.prevent="send">
          <fieldset>
            <legend>Type</legend>
            <label class="radio-label"><input type="radio" v-model="type" name="type" value="enigma"> Énigme</label>
            <label class="radio-label"><input type="radio" v-model="type" name="type" value="gift"> Cadeau</label>
          </fieldset>

          <label>
            {{ type === 'enigma' ? "Identifiant de l'énigme" : 'Code' }}
            <input type="text" v-model="code" required>
          </label>

          <label v-if="type === 'enigma'">
            Réponse
            <input type="text" v-model="answer" required>
          </label>

          <label>
            Votre e-mail
            <input type="email" v-model="email" required>
          </label>

          <label>
            Équipe à laquelle attribuer les points
            <select v-model="team" required>
              <option v-for="(team, name) in teams" :value="name">{{ name }}</option>
            </select>
          </label>

          <button type="submit">Envoyer !</button>
        </form>
      </p>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'eva.js'
import Modal from './Modal'

export default {
  data () {
    return {
      type: 'enigma',
      email: '',
      code: '',
      answer: '',
      team: '',
      showModal: false,
      result: ''
    }
  },
  components: { Modal },
  computed: {
    ...mapState(['teams'])
  },
  methods: {
    ...mapActions(['refreshState']),
    send: async function () {
      this.$store.commit('SET_IS_LOADING', true)

      let toSend = {
        recipientTeam: this.team,
        email: this.email,
        code: this.code
      }

      if (this.type === 'enigma') { toSend.answer = this.answer }

      let res
      try {
        res = await this.$http.post(`https://uniontech-thegame-api.herokuapp.com/redeem/${this.type}`, toSend)
        switch (res.body.status) {
          case 'NOT_FOUND':
            this.result = "Ce code n'existe pas."
            break
          case 'BAD_ANSWER':
            this.result = 'Mauvaise réponse. Dommage !'
            break
          case 'USED':
            this.result = 'Trop tard, ça a déjà été trouvé ! Courage, ça ira.'
            break
          case 'OK':
            this.result = 'Bravo ! Les nouveaux points ont bien été pris en compte.'
            this.refreshState()
            break
          case 'TEAM_NOT_EXISTING':
            this.result = "Cette équipe n'existe pas."
            break
          case 'PLAYER_NOT_EXISTING':
            this.result = "Ce joueur n'est pas inscrit."
            break
        }
      } catch (err) {
        this.result = "Une erreur est survenue. Merci de réessayer et de prévenir un membre de l'équipe UNION'TECH."
      }

      this.$store.commit('SET_IS_LOADING', false)
      this.showModal = true
    }
  }
}
</script>

<style scoped>
.page {
  background-color: #16a085;
}

label, button {
  display: block;

  margin-top: 10px;

  font-weight: bold;
  color: #fff;
}

legend { color: #fff; font-weight: bold; }
fieldset { border: 1px solid #fff; }

button {
  color: #000;
}

input, select {
  margin-left: 20px;
}

.radio-label {
  display: inline;
}
</style>
