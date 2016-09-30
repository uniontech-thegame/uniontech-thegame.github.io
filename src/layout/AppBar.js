import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class AppBarCustom extends Component {
  render() {
    return (
        <AppBar title="UNION'TECH: The Game" iconElementLeft={<span />}  />
    );
  }
}

export default AppBarCustom;
