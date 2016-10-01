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
      dialogOpened: false,
      dialogHistory: []
    }

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
  }

  handleDialogOpen (history) {
    this.setState({ dialogOpened: true, dialogHistory: history })
  }

  handleDialogClose () {
    this.setState({ dialogOpened: false })
  }

  render () {
    const sortedTeams = this.props.data.teams.slice(0)
    sortedTeams.sort(function (a, b) {
      return b.points - a.points
    })

    return (
      <span>
        <Dialog
          title='Historique des points'
          actions={<RaisedButton label='Fermer' primary onTouchTap={this.handleDialogClose} />}
          open={this.state.dialogOpened}
          onRequestClose={this.handleDialogClose}
          autoScrollBodyContent
        >
          <ul>
            {this.state.dialogHistory.map((event, i) => {
              let icon
              let titleColor
              let date = new Date(event.date)
              switch (event.type) {
                case 'activity':
                  icon = <FontIcon className='material-icons'>directions_run</FontIcon>
                  titleColor = '#8BC34A'
                  break
                case 'bonus':
                  icon = <FontIcon className='material-icons'>card_giftcard</FontIcon>
                  titleColor = '#F44336'
                  break
                default:
                  icon = <FontIcon className='material-icons'>label</FontIcon>
              }

              let strPad = function (n) {
                return String('00' + n).slice(-2)
              }

              return <li key={i}>
                {icon} <span style={{color: titleColor, fontWeight: 'bold'}}>{event.title}{event.type === 'bonus' ? ` offert par ${event.from}` : ''} ({event.points} point{event.points > 1 ? 's' : ''})</span><br/>
                <span style={{fontWeight: 'bold'}}>{strPad(date.getDate())}/{strPad(date.getMonth() + 1)}/{date.getFullYear()} à {strPad(date.getHours())}:{strPad(date.getMinutes())}: </span>{event.description}<br/><br/>
              </li>
            })}
          </ul>
        </Dialog>
        <Table>
          <TableHeader displaySelectAll={false} style={{ backgroundColor: '#795548' }}>
            <TableRow>
              <TableHeaderColumn style={{color: '#fff'}}>Position</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#fff'}}>Nom</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#fff'}}>Score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {sortedTeams.map((team, i) => {
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
                <TableRowColumn>{team.name}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label={`${team.points} pts`} backgroundColor='#795548' labelColor='#fff' onTouchTap={() => this.handleDialogOpen(team.history)} />
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
    teams: React.PropTypes.array.isRequired
  }).isRequired
}
