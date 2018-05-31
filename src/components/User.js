import React, { Component } from 'react';
import axios from 'axios'

class User extends Component {
  state = {
    UserInfo:null
  }
  componentDidMount(){
    const {username} =this.props.match.params
    const uri = `https://cnodejs.org/api/v1/user/${username}`
    axios.get(uri).then(res => {
      this.setState({
        UserInfo:res.data.data
      })
    })
  }
  render() {
    const {UserInfo} = this.state
    const userContent = !UserInfo ? '请稍等': <div>{UserInfo.loginname}</div> 
    return (
      <div>
        {userContent}
      </div>
    );
  }
}

export default User;