import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom' 
class ShowTopic extends Component {
  state = {
    topic: null,
    collect:false,
    comment:'',
    action:'down'
  }
  componentDidMount() {
    const { id } = this.props.match.params
    const { accesstoken } = sessionStorage
    const params = accesstoken ? `?accesstoken=${accesstoken}` : ''
    const uri = `https://cnodejs.org/api/v1/topic/${id}${params}`
    axios.get(uri).then(res => {
      this.setState({ 
        topic: res.data.data,
        collect:res.data.data.is_collect
      })
    })
  }
  shoucang = () => {
    const { accesstoken } = sessionStorage
    const { collect } = this.state
    const quxiao = {
      accesstoken,
      topic_id:this.state.topic.id
    }
    const uri1 = collect ? 'de_collect' :'collect'
    const uri = `https://cnodejs.org/api/v1/topic_collect/${uri1}`
      axios.post(uri , quxiao).then(res => {
        this.setState({
          collect:!collect
        })
      })
    }
    cmt = e => {
      this.setState({
        comment:e.target.value
      })
    }
    huifu = () => {
      const {topic,comment} = this.state
      const uri =  `https://cnodejs.org/api/v1/topic/${topic.id}/replies`
      const cmt = {
        accesstoken:sessionStorage.accesstoken,
        content:comment
      }
      axios.post( uri,cmt).then(res => {
        this.setState({
          comment:''
        })
        const { id } = this.props.match.params
        const { accesstoken } = sessionStorage
        const params = accesstoken ? `?accesstoken=${accesstoken}` : ''
        const uri = `https://cnodejs.org/api/v1/topic/${id}${params}`
        axios.get(uri).then(res => {
          this.setState({ 
            topic: res.data.data,
            collect:res.data.data.is_collect
          })
        })
      })
      
    }
    zan = id => {
      const uri = `https://cnodejs.org/api/v1/reply/${id}/ups`
      axios.post(uri , {accesstoken:sessionStorage.accesstoken}).then(res => {
        const { id } = this.props.match.params
        const { accesstoken } = sessionStorage
        const params = accesstoken ? `?accesstoken=${accesstoken}` : ''
        const uri = `https://cnodejs.org/api/v1/topic/${id}${params}`
        axios.get(uri).then(res => {
          this.setState({ 
            topic: res.data.data,
            collect:res.data.data.is_collect
          })
        })
        this.setState({
          action:res.data.action
        })
      })
    }
  render() {
    const { topic,collect,comment } = this.state
    const content = !topic ? (
      '请稍等'
    ) : (
      <div>
        {topic.top ? (
          <button>置顶</button>
        ) : topic.good ? (
          <button>精华</button>
        ) : (
          ''
        )}
        <h2>{topic.title}</h2>
        <p>
          ·作者{topic.author.loginname} ·浏览量{topic.visit_count}
        </p>
        <button onClick={this.shoucang}>{ !collect ? '收藏':'取消收藏'}</button>
        <hr />
        <Content dangerouslySetInnerHTML={{ __html: topic.content }} />
      </div>
    )
    const replayList = !topic ? '请稍等' : <div>{topic.replies.length === 0 ? '没哟':topic.replies.map(reply => <div style={{display:'flex'}} key={reply.id}>
    <Link to={`/user/${reply.author.loginname}`}><img style={{width:'40px',height:'40px'}} src={reply.author.avatar_url} alt=""/></Link>
    <span>{reply.author.loginname}</span>
    <Content dangerouslySetInnerHTML={{ __html: reply.content }} />
    <button onClick={() => this.zan(reply.id)} style={{width:'40px',height:'40px',backgroundColor:this.state.action === 'up' ? 'red':'' }}>{reply.ups.length}赞</button>
    </div>)}
    </div>
    return <div>
      {content} 
      <div>
        {replayList}
      </div>
      {sessionStorage.accesstoken ? <div>
        <h4>添加回复</h4>
        <textarea value={comment} onChange={this.cmt}>
        </textarea>
        <button onClick={this.huifu}>回复</button>
      </div> : ''}
    </div>
  }
}

export default ShowTopic

const Content = styled.div`
  img {
    width: 80%;
  }
  p {
    line-height: 30px;
  }
`
