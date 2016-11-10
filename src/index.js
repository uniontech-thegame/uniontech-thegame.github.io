import EVA, {Vue} from 'eva.js'
import App from 'components/App'
import Introduction from 'components/Introduction'
import Detective from 'components/Detective'
import Teams from 'components/Teams'
import TeamDetail from 'components/TeamDetail'
import Benefactors from 'components/Benefactors'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const app = new EVA()

app.model({
  state: {
    isLoading: 0,
    teams: {},
    benefactors: [],
    availableGiftsCount: 0,
    availableEnigmasCount: 0
  },
  mutations: {
    SET_IS_LOADING (state, loading) {
      state.isLoading = loading
    },
    SET_STATE (state, initial) {
      Object.assign(state, initial)
    }
  },
  actions: {
    refreshState: async function ({ commit }) {
      commit('SET_IS_LOADING', true)
      const res = await Vue.http.get('https://uniontech-thegame-api.herokuapp.com/')
      commit('SET_STATE', res.body)
      commit('SET_IS_LOADING', false)
    }
  }
})

app.router(route => [
  { meta: { title: '📝 Introduction' }, ...route('/', Introduction) },
  { meta: { title: '🕵 Détective' }, ...route('/detective', Detective) },
  { meta: { title: '🏆 Équipes et classement' }, ...route('/equipes', Teams) },
  { meta: { title: '🌟 Membres bienfaiteurs' }, ...route('/bienfaiteurs', Benefactors) },
  { meta: { title: '🔭 Équipe', isTeam: true }, ...route('/equipe/:team(jaune|rouge|bleu|vert)', TeamDetail) },
  { path: '*', redirect: '/' }
])

app.$router.afterEach((to, from) => {
  document.title = to.meta.title
  if (to.meta.isTeam) document.title += ' ' + to.params.team.charAt(0).toUpperCase() + to.params.team.slice(1)
  document.title += ' - UTTG'
})

app.start(App, '#app')
