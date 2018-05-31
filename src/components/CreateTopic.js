import React, { Component } from 'react';
import axios from 'axios'

class CreateTopic extends Component {
  state = {
    title:'',
    content:''
  }
  change = (text,e)=>{
    this.setState({
      [text]:e.target.value
    })
    console.log('t',this.state.title,'c',this.state.content)
  }
  handelSubmit = () => {
    const { title , content} = this.state
    const uri = `https://cnodejs.org/api/v1/topics`
    const contentObj = {
      accesstoken: sessionStorage.accesstoken,
      title:title,
      content:content,
      tab:'dev'
    }
    console.log(contentObj)
    if(title.trim().length && content.trim().length >= 7){
    axios.post(uri , contentObj).then( res => {
      alert(1111)
      this.setState({
        title:'',
        content:''
      })
      this.props.history.push(`/topic/${res.data.topic_id}`)
    })}else{
      alert('www')
    }
  }
  render() {
    return (
      <div>
        <input onChange={e => this.change('title',e)} type="text" value={this.state.title}/>
        <textarea onChange={e => this.change('content',e)} name="" id="" value={this.state.content}></textarea>
        <button onClick={this.handelSubmit}>提交</button>
      </div>
    );
  }
}

export default CreateTopic;