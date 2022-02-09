
import React, { Component } from "react";


class LeftPanel extends Component {
  render() {

    let { users, handleClick ,currentUser} = this.props;
    return (
      <div className="w3-sidebar w3-light-grey w3-bar-block"  >
        <h3 className="w3-bar-item">users</h3>
        <ul>
          {users.map(user =>user.username!=currentUser.name && <li><a onClick={() => handleClick(user)}  className="w3-bar-item w3-button foc"> {user.username}</a></li> )}

        </ul>


      </div>
    )

  }



}
//document.getElementById('myInput').focus()



export default LeftPanel;