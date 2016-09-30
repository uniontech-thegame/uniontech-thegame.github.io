import React, { Component } from 'react';

import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class Home extends Component {
  render() {
    return (
      <Card>
          <CardMedia
            overlay={<CardTitle title="Bienvenue sur UNION'TECH !"
            subtitle="Devenez le meilleur de l'école" />}
          >
            <img src="img/splash.jpg" role="presentation" />
          </CardMedia>
          <CardText>
            Vous avez formé vos équipes. Maintenant, vous avez deux façons de marquer des points !
          </CardText>
        </Card>
    );
  }
}

export default Home;
