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
      loading: true,
      activePage: PAGES.HOME,
      data: {
        'teams': []
      }
    }

    window.fetch('https://uniontech-thegame-api.herokuapp.com/teams').then(function (res) {
      return res.json()
    }).then((data) => {
      this.setState({ loading: false, data })
    })

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
            <div style={{ textAlign: 'center' }}><CircularProgress size={1.5} /></div>
          </Dialog>
          <AppBar />
          <BottomNavigation onMenuChange={this.onMenuChange} />
          <Flex align='center'>
            <Box>
              {(() => {
                switch (this.state.activePage) {
                  case PAGES.HOME: return <HomePage />
                  case PAGES.DETECTIVE: return <DetectivePage data={this.state.data}/>
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
