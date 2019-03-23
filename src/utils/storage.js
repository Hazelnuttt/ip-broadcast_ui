import React from 'react'

function setToken(props){
    return localStorage.setItem('user_token',props.token)
}

function getToken(){
    if(!this.state.token){
        if(localStorage.getItem('user_token')){
            this.state.token = localStorage.getItem('user_token')
                return (<Redirect to="/home"/>)
        }else{
            Message.error('登录过期，请重新登录')
            return (<Redirect to="/login"/>)
        }
    }
}