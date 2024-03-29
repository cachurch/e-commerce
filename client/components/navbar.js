import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import './style/navbar.css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <div>
        <h1>
          <Link to="/products">WHITEWALL</Link>
        </h1>
      </div>
      {isLoggedIn ? (
        <div className="navLinks">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Account</Link>
          <Link to="/products">Artwork</Link>
          <Link to="/cart">Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="navLinks">
          {/* The navbar will show these links before you log in */}
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">Artwork</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
    {/* <hr /> */}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
