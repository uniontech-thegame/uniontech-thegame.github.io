import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

class BottomNavigationCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };

    this.select = this.select.bind(this);
  }

  select(id) {
    this.setState({ active: id });

    this.props.onMenuChange(id);
  }

  render() {
    let menuBackgroundColor;
    switch (this.state.active) {
      case 0:
        menuBackgroundColor = '#00bcd4';
        break;
      case 1:
        menuBackgroundColor = '#F44336';
        break;
      case 2:
        menuBackgroundColor = '#795548';
        break;
      default:
        menuBackgroundColor = '#fff';
    }

    return (
        <BottomNavigation selectedIndex={this.state.active} style={{ backgroundColor: menuBackgroundColor }}>
          <BottomNavigationItem
              label={<span style={{ color: 'white' }}>Accueil</span>}
              icon={<FontIcon className="material-icons" color='white'>home</FontIcon>}
              style={{ color: 'white' }}
              onTouchTap={() => this.select(0)}
            />
          <BottomNavigationItem
            label={<span style={{ color: 'white' }}>Détective</span>}
            icon={<FontIcon className="material-icons" color='white'>fingerprint</FontIcon>}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label={<span style={{ color: 'white' }}>Classement</span>}
            icon={<FontIcon className="material-icons" color='white'>star</FontIcon>}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
    );
  }
}

export default BottomNavigationCustom;
