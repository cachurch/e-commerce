import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const user = props.user || {}
  console.log('user', user)
  return (
    <div>
      {user.isAdmin ? (
        <div>
          <h2>ADMIN DASHBOARD</h2>
          <h3>Welcome {user.firstName}!</h3>
          <ul>
            <li>
              <h4>View Users</h4>
            </li>
            <li>
              <h4>Edit Products</h4>
            </li>
            <li>
              <h4>View Your Orders</h4>
            </li>
          </ul>
        </div>
      ) : (
        <h3>Welcome {user.firstName}!</h3>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
