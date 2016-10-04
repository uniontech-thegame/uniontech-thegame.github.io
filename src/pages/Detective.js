import React, {Component} from 'react'

import CircularProgress from 'material-ui/CircularProgress'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

class Detective extends Component {
  constructor (props) {
    super(props)

    this.state = {
      statusSending: null,
      statusDialogOpened: false,
      dialogOpened: false,
      dialogHistory: [],
      enigmaSelected: false,
      teamText: null,
      teamId: null,
      code: null,
      answer: null,
      from: null
    }

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.onRadioChange = this.onRadioChange.bind(this)
    this.handleTeamChange = this.handleTeamChange.bind(this)
    this.handleStatusDialogClose = this.handleStatusDialogClose.bind(this)
  }

  handleDialogOpen () {
    this.setState({ dialogOpened: true })
  }

  handleDialogClose () {
    this.setState({ dialogOpened: false })
  }

  handleStatusDialogClose () {
    this.setState({ statusDialogOpened: false })
  }

  handleSend () {
    if (!this.state.code) return window.alert('Le code ne doit pas être vide.')
    if (!this.state.teamId) return window.alert('Aucune équipe sélectionnée.')
    if (!this.state.from) return window.alert('Le nom de la personne offrant les points ne doit pas être vide.')

    if (this.state.enigmaSelected && !this.state.answer) return window.alert('La réponse ne doit pas être vide.')

    this.setState({ statusDialogOpened: true, statusSending: 'doing', dialogOpened: false })

    const toSend = {
      name: this.state.from,
      code: this.state.code,
      recipientTeam: this.state.teamId,
      type: this.state.enigmaSelected ? 'enigma' : 'gift'
    }

    if (this.state.enigmaSelected) toSend.answer = this.state.answer

    window.fetch('http://uniontechthegameapi-nivramdu94.rhcloud.com/redeem', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(toSend) }).then(function (res) {
      return res.json()
    }).then((data) => {
      this.setState({ statusSending: data.status })
    })
  }

  onRadioChange (event, value) {
    if (value === 'enigma') {
      this.setState({ enigmaSelected: true })
    } else {
      this.setState({ enigmaSelected: false })
    }
  }

  handleTeamChange (event, key, value) {
    this.setState({ teamText: value, teamId: key })
  }

  render () {
    return (
      <span>
        <Dialog
          title='Statut'
          actions={[]}
          modal
          open={this.state.statusDialogOpened}
          onRequestClose={this.handleStatusDialogClose}
          autoScrollBodyContent
        >
          <br />
          {(() => {
            switch (this.state.statusSending) {
              case 'doing':
                return (<p style={{ textAlign: 'center' }}><CircularProgress size={1.5} /></p>)
              case 'not_found':
                return (<p style={{ textAlign: 'center' }}>Le code n'existe pas.</p>)
              case 'bad_answer':
                return (<p style={{ textAlign: 'center' }}>La réponse à l'énigme n'est pas correcte.</p>)
              case 'used':
                return (<p style={{ textAlign: 'center' }}>Le code a déjà été utilisé. Désolé !</p>)
              case 'ok':
                return (<p style={{ textAlign: 'center' }}>Bravo. Les points ont été attribués ! Rechargez la page pour mettre à jour le classement.</p>)
              default:
                return (<p style={{ textAlign: 'center' }}>Une erreur est survenue.</p>)
            }
          })()}

          {(() => {
            if (this.state.statusSending !== 'doing') {
              return <span><br/><br/><RaisedButton label='Fermer' primary onTouchTap={this.handleStatusDialogClose} /></span>
            }
          })()}
        </Dialog>
        <Dialog
          title='Récupérez des points'
          actions={[<RaisedButton label='Fermer' onTouchTap={this.handleDialogClose} />, <RaisedButton label='Envoyer' primary onTouchTap={this.handleSend} />]}
          open={this.state.dialogOpened}
          onRequestClose={this.handleDialogClose}
          autoScrollBodyContent
        >
          <br />
          <RadioButtonGroup name='result' defaultSelected='gift' onChange={this.onRadioChange}>
            <RadioButton
              value='gift'
              label='Cadeau'
            />
            <RadioButton
              value='enigma'
              label='Énigme'
            />
          </RadioButtonGroup>

          <TextField
            hintText='Code'
            floatingLabelText='Code'
            value={this.state.code}
            onChange={(event) => this.setState({ code: event.target.value })}
            fullWidth
          />
          {(() => {
            if (this.state.enigmaSelected) {
              return <TextField
                hintText='Réponse'
                floatingLabelText='Réponse'
                value={this.state.answer}
                onChange={(event) => this.setState({ answer: event.target.value })}
                fullWidth
              />
            }
          })()}
          <br />
          <SelectField onChange={this.handleTeamChange} value={this.state.teamText} floatingLabelText='Équipe à laquelle donner les points' fullWidth>
            {this.props.data.teams.map((team) => {
              return <MenuItem value={team._id} primaryText={team.name} key={team._id} />
            })}
          </SelectField>
          <TextField
            hintText='Votre nom'
            floatingLabelText='Cadeau de la part de...'
            value={this.state.from}
            onChange={(event) => this.setState({ from: event.target.value })}
            fullWidth
          />
        </Dialog>

        <Card>
          <CardMedia
            overlay={<CardTitle title='Récupérez des points'
            subtitle='Pour votre équipe, ou celle que vous supportez' />}
          >
          <img src='img/gift.jpg' role='presentation' />
          </CardMedia>
          <CardText>
            Hey
          </CardText>
          <CardActions>
            <RaisedButton label="J'ai trouvé un code !" primary onTouchTap={this.handleDialogOpen} />
          </CardActions>
        </Card>
      </span>
    )
  }
}

export default Detective

Detective.propTypes = {
  data: React.PropTypes.shape({
    teams: React.PropTypes.array.isRequired
  }).isRequired
}
