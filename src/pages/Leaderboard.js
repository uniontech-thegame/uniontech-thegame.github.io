import React, {Component} from 'react'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import Dialog from 'material-ui/Dialog'

class Leaderboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      historyOpened: false,
      membersOpened: false,
      dialogHistory: {
        activities_results: [],
        gifts: [],
        enigmas: [],
        players: []
      }
    }

    this.handleHistoryOpen = this.handleHistoryOpen.bind(this)
    this.handleHistoryClose = this.handleHistoryClose.bind(this)
    this.handleMembersOpen = this.handleMembersOpen.bind(this)
    this.handleMembersClose = this.handleMembersClose.bind(this)
  }

  handleHistoryOpen (history) {
    this.setState({ historyOpened: true, dialogHistory: history })
  }

  handleHistoryClose () {
    this.setState({ historyOpened: false })
  }

  handleMembersOpen (history) {
    this.setState({ membersOpened: true, dialogHistory: history })
  }

  handleMembersClose () {
    this.setState({ membersOpened: false })
  }

  render () {
    return (
      <span>
        <Dialog
          title='Historique des points'
          actions={<RaisedButton label='Fermer' primary onTouchTap={this.handleHistoryClose} />}
          open={this.state.historyOpened}
          onRequestClose={this.handleHistoryClose}
          autoScrollBodyContent
        >
          <h3>Activités</h3>
          {(() => { if (Object.keys(this.state.dialogHistory.activities_results).length === 0) return (<p>Aucune activité terminée.</p>) })()}
          <ul>
            {this.state.dialogHistory.activities_results.map((activity, i) => {
              let date = new Date(activity.date)

              let strPad = function (n) {
                return String('00' + n).slice(-2)
              }

              return <li key={i}>
                <FontIcon className='material-icons'>directions_run</FontIcon> <span style={{color: '#8BC34A', fontWeight: 'bold'}}>{activity.title} ({activity.points} point{activity.points > 1 ? 's' : ''})</span><br/>
                <span style={{fontWeight: 'bold'}}>{strPad(date.getDate())}/{strPad(date.getMonth() + 1)}/{date.getFullYear()} à {strPad(date.getHours())}:{strPad(date.getMinutes())}: </span>{activity.description}<br/><br/>
              </li>
            })}
          </ul>

          <h3>Cadeaux</h3>
          {(() => { if (Object.keys(this.state.dialogHistory.gifts).length === 0) return (<p>Aucun cadeau trouvé.</p>) })()}
          <ul>
            {this.state.dialogHistory.gifts.map((gift, i) => {
              let date = new Date(gift.redeem_date)

              let strPad = function (n) {
                return String('00' + n).slice(-2)
              }

              return <li key={i}>
                <FontIcon className='material-icons'>card_giftcard</FontIcon> <span style={{color: '#F44336', fontWeight: 'bold'}}>Code '{gift.code}' ({gift.points} point{gift.points > 1 ? 's' : ''})</span><br/>
                <span style={{fontWeight: 'bold'}}>Ouvert par {`${gift.player.name.first} ${gift.player.name.last} (S${gift.player.semester})`} le {strPad(date.getDate())}/{strPad(date.getMonth() + 1)}/{date.getFullYear()} à {strPad(date.getHours())}:{strPad(date.getMinutes())}: </span>{gift.description}<br/><br/>
              </li>
            })}
          </ul>

          <h3>Énigmes</h3>
          {(() => { if (Object.keys(this.state.dialogHistory.enigmas).length === 0) return (<p>Aucune énigme résolue.</p>) })()}
          <ul>
            {this.state.dialogHistory.enigmas.map((enigma, i) => {
              let date = new Date(enigma.redeem_date)

              let strPad = function (n) {
                return String('00' + n).slice(-2)
              }

              return <li key={i}>
                <FontIcon className='material-icons'>find_in_page</FontIcon> <span style={{color: '#795548', fontWeight: 'bold'}}>Énigme '{enigma.code}' ({enigma.points} point{enigma.points > 1 ? 's' : ''})</span><br/>
                <span style={{fontWeight: 'bold'}}>Résolue par {`${enigma.player.name.first} ${enigma.player.name.last} (S${enigma.player.semester})`} le {strPad(date.getDate())}/{strPad(date.getMonth() + 1)}/{date.getFullYear()} à {strPad(date.getHours())}:{strPad(date.getMinutes())}: </span>La réponse était {enigma.answer}. {enigma.description}<br/><br/>
              </li>
            })}
          </ul>
        </Dialog>
        <Dialog
          title='Membres'
          actions={<RaisedButton label='Fermer' primary onTouchTap={this.handleMembersClose} />}
          open={this.state.membersOpened}
          onRequestClose={this.handleMembersClose}
          autoScrollBodyContent
        >
          <ul>
            {/*this.state.dialogHistory.players.map((player, i) => {
              return <li key={i}>{player.name.first} {player.name.last} (S{player.semester})</li>
            })*/}
            <li>Bientôt</li>
          </ul>
        </Dialog>
        <Table>
          <TableHeader displaySelectAll={false} style={{ backgroundColor: '#795548' }}>
            <TableRow>
              <TableHeaderColumn style={{color: '#fff'}}>Position</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#fff'}}>Nom</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#fff'}}>Score</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#fff'}}>Membres</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {Object.keys(this.props.data.teams).map((team, i) => {
              let chipColor
              let avatarColor
              let positionText = ['Premier', 'Deuxième', 'Troisième', 'Quatrième', 'Cinquième', 'Sixième', 'Septième', 'Huitième', 'Neufième', 'Dixième'][i]

              switch (i + 1) {
                case 1:
                  chipColor = '#FFE082'
                  avatarColor = '#FFC107'
                  break
                case 2:
                  chipColor = '#EEEEEE'
                  avatarColor = '#9E9E9E'
                  break
                case 3:
                  chipColor = '#BCAAA4'
                  avatarColor = '#795548'
                  break
                default:
                  chipColor = '#81D4FA'
                  avatarColor = '#03A9F4'
              }

              return <TableRow key={i}>
                <TableRowColumn>
                  <Chip backgroundColor={chipColor}>
                    <Avatar backgroundColor={avatarColor}>{i + 1}</Avatar> {positionText}
                  </Chip>
                </TableRowColumn>
                <TableRowColumn>{team}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label={`${this.props.data.teams[team].points} pts`} backgroundColor='#795548' labelColor='#fff' onTouchTap={() => this.handleHistoryOpen(this.props.data.teams[team])} />
                </TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label='Voir les membres' backgroundColor='#795548' labelColor='#fff' onTouchTap={() => this.handleMembersOpen(this.props.data.teams[team])} />
                </TableRowColumn>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </span>
    )
  }
}

export default Leaderboard

Leaderboard.propTypes = {
  data: React.PropTypes.shape({
    teams: React.PropTypes.object.isRequired
  }).isRequired
}
