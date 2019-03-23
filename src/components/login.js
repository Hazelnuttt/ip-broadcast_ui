import React from 'react';
import fetch from 'node-fetch';
import {Input, Card,Button, Checkbox, Icon} from 'antd';
import { Redirect } from 'react-router';
// import {setToken} from '../utils/storage'
// import Password from 'antd/lib/input/Password';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      user:null,
      remember:false,
      token:''
      //用户信息
    }
    this.handleChange = this.handleChange.bind(this);
  }

    getHome(){
        fetch('http://localhost:3000/home',{
            method:'get',
            headers:{
                'content-type':'text/html',
                token:localStorage.getItem('user_token'),
            }
        }).then(res => res.json()).then(res =>{
            const {loginok} = res
            if (loginok) {
                // 已登录，token没过期
                return (<Redirect to="/home"/>);
            }
        })
    }

    setToken(ntoken){
        return localStorage.setItem('user_token',ntoken)
    }

    handleChange = param => {
      this.setState({ ...this.state, ...param});
    }

    handleSubmit = () => {
      const { username, password, remember }= this.state;
      fetch('http://localhost:3000/login', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          remember,
        })
      }).then(res => res.json()).then(res => {
        const { loginSuccess, message, data,ntoken} = res
        if (loginSuccess) {
          // 登录成功处理
         
          localStorage.setItem('user_token',ntoken)
        
        //   setToken(ntoken)
          this.setState({user: data})
          return (<Redirect to="/home"/>);
        } else {
          // 登录失败处理
          message.error(message);
        }
      })
      
    }

  
  
  render(){
    const {username, password,remember} = this.state;
    
        fetch('http://localhost:3000/home',{
            method:'get',
            headers:{
                'content-type':'text/html',
                token:localStorage.getItem('user_token'),
            }
        }).then(res => res.json()).then(res =>{
            const {loginok} = res
            if (loginok) {
                // 已登录，token没过期
                return (<Redirect to="/home"/>);
            }
        })
        //console.log('hello')
    
    // getHome();
    return (
      <div style={{margin:100}}>
        <h1 style={{textAlign:'center'}}>登录</h1>
        <hr/><br/>
        <Card style={{width:'300px',margin:'auto'}}>
          {/* handlechange方法，浏览器向服务器发送信息(url,method,headers,body),渲染当前状态下的数据 */}
          {/* handlesubmit方法，服务器响应，(result,message,data)，浏览器渲染数据 */}
          <label>用户名</label>
          <Input onChange={e => this.handleChange({username:e.target.value})} value={username} style={{margin:'5px 0'}}  placeholder="Enter your username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} ></Input>
          <label>密码</label>
          <Input.Password onChange={e => this.handleChange({password:e.target.value})} value={password} style={{margin:'5px 0'}}  placeholder="Enter your username" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  />
          <Checkbox  onChange={e => this.handleChange({remember:!e.target.value})} value={remember} >记住密码</Checkbox>
          <Button type='primary' style ={{float:'right'}} onClick={this.handleSubmit}>登录</Button> 
        </Card>
      </div>
    )
  }
}

export default Login