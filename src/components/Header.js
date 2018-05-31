import React, { Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import axios from 'axios'
class Header extends Component {
  state = {
    userInfo:null,
    text:''
  }
  handelChange = e =>{
    this.setState({
      text:e.target.value
    })
  }
  componentDidMount() {
    const accesstoken = sessionStorage.accesstoken
    if (accesstoken) {
      const uri = 'https://cnodejs.org/api/v1/accesstoken'
      axios.post(uri, { accesstoken: accesstoken }).then(res => {
        this.setState({ userInfo: res.data })
      })
    }
  }
  denglu = () => {
    if (this.state.text.trim()) {
    const uri = 'https://cnodejs.org/api/v1/accesstoken'
    axios.post(uri, { accesstoken : this.state.text }).then( res => {
      sessionStorage.accesstoken = 'd55eec0a-007e-41db-ab0f-cb8a00ffd030'
      sessionStorage.loginname = res.data.loginname
      this.setState({
        userInfo:res.data,
        text:''
      })
    }).catch( err => {
      alert('报错')
    })}
  }
  tuichu = () => {
    this.setState({
      userInfo:null
    })
    sessionStorage.removeItem('accesstoken')
    sessionStorage.removeItem('loginname')
  }
  render() {
    const {userInfo} = this.state
   return (
      <Head>
        <Link to='/'>
            <img
            style={{ width: '150px', marginLeft: '20px' }}
            src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg"
            alt=""
          />
        </Link>
        { !userInfo ? <div>
          <input type="text" onChange={this.handelChange}/>
          <span onClick={this.denglu}>登录</span>
        </div>: <div><img src={this.state.userInfo.avatar_url} alt=""/><span onClick={this.tuichu}>退出</span><Link to ='/topic/create'>发布话题</Link></div>}
        
      </Head>
    )
  }
}

export default Header

const Head = styled.header`
  background-color: #3e3e3e;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
`
