import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import sortBy from 'lodash/sortBy'

// Component
// import './menu.less'
import MenuItem from '../_ui/menuItem/MenuItem.component'

// TODO TU
// Menu component
export class Menu extends Component {

  static propTypes = {
    menu: PropTypes.array
  }

  render() {
    const { menu } = this.props // eslint-disable-line no-shadow

    return (
      <nav className="menu">
        { menu.length > 0 &&
          sortBy(menu, ['index']).map((menuItem, index) => (
            <MenuItem
              active={ menuItem.active }
              disabled={ menuItem.disabled }
              index={ menuItem.index }
              key={ index }
              labelKey={ menuItem.labelKey }
              labelText={ menuItem.labelText }
              level={ menuItem.level }
              onClick={ menuItem.onClick }
              route={ menuItem.route }
              titleKey={ menuItem.titleKey }
              titleText={ menuItem.titleText }
            />
          ))
        }
      </nav>
    )
  }
}

// User container
const mapStateProps = (state) => (
  {
    menu: state.menu
  }
)

const MenuContainer = connect(
  mapStateProps,
  {}
)(Menu)

export default MenuContainer
