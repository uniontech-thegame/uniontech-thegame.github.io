import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

import React, {Component} from 'react'
import './App.css'

import { Flex, Box } from 'reflexbox'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AppBar from './layout/AppBar'
import BottomNavigation from './layout/BottomNavigation'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import HomePage from './pages/Home'
import DetectivePage from './pages/Detective'
import LeaderboardPage from './pages/Leaderboard'

const PAGES = {
  HOME: 0,
  DETECTIVE: 1,
  LEADERBOARD: 2
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      activePage: PAGES.HOME,
      data: {
        'teams': [
          { 'id': 0, 'points': 24, 'name': 'SUPERSONIC', 'history': [
            { 'type': 'activity', 'points': 20, 'title': 'Bowling', 'description': '1er au bowling', 'date': '2012-04-23T18:25:43.511Z' },
            { 'type': 'bonus', 'points': 4, 'title': 'Bonus', 'description': "Bonus situé dans le mail de l'administration", 'from': 'Marvin', 'date': '2012-04-23T18:25:43.511Z' }
          ]},
          { 'id': 1, 'points': 12, 'name': 'Les saucissons sauvages', 'history': [
            { 'type': 'activity', 'points': 10, 'title': 'Bowling', 'description': '2ème au bowling', 'date': '2012-04-23T18:25:43.511Z' },
            { 'type': 'bonus', 'points': 2, 'title': 'Bonus', 'description': 'Bonus énigme', 'from': 'Valentin', 'date': '2012-04-23T18:25:43.511Z' }
          ]},
          { 'id': 2, 'points': 6, 'name': 'Les Plaies Mobiles', 'history': [
            { 'type': 'bonus', 'points': 6, 'title': 'Bonus', 'description': 'Bonus énigme', 'from': 'Mathieu', 'date': '2012-04-23T18:25:43.511Z' }
          ]},
          { 'id': 3, 'points': 1, 'name': "L'écu bordé de nouilles", 'history': [
            { 'type': 'activity', 'points': 1, 'title': 'Bowling', 'description': 'Point de participation', 'date': '2012-04-23T18:25:43.511Z' }
          ]}
        ]
      }
    }

    this.onMenuChange = this.onMenuChange.bind(this)
  }

  onMenuChange (id) {
    this.setState({ activePage: id })
  }

  render () {
    return (
      <MuiThemeProvider>
        <span>
          <Dialog
            title='Chargement des données...'
            actions={[]}
            modal
            open={this.state.loading}
            onRequestClose={this.handleClose}
          >
            <p style={{ textAlign: 'center' }}><CircularProgress size={1.5} /></p>
          </Dialog>
          <AppBar />
          <BottomNavigation onMenuChange={this.onMenuChange} />
          <Flex align='center'>
            <Box>
              {(() => {
                switch (this.state.activePage) {
                  case PAGES.HOME: return <HomePage />
                  case PAGES.DETECTIVE: return <DetectivePage />
                  case PAGES.LEADERBOARD: return <LeaderboardPage data={this.state.data} />
                  default: return <div>Page invalide</div>
                }
              })()}
            </Box>
          </Flex>
        </span>
      </MuiThemeProvider>
    )
  }
}

export default App
