import React, {Component} from 'react'

import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card'

class Detective extends Component {
  render () {
    return (
      <Card>
          <CardMedia
            overlay={<CardTitle title='Récupérez des points'
            subtitle='Pour votre équipe, ou celle que vous supportez' />}
          >
            <img src='img/gift.jpg' role='presentation' />
          </CardMedia>
          <CardText>
            Récupérez des points.
          </CardText>
        </Card>
    )
  }
}

export default Detective
