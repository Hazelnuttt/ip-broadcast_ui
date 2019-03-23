import React from 'react';
import { Redirect } from 'react-router';

class Loginpage extends React.Component{
    render(){
        return (<Redirect to="/login" />);
    }
}

export default Loginpage