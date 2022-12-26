import { Button, Form, Grid, Image, List, Message, Segment } from "semantic-ui-react";
import logo from "../Assessts/banklogo.png";
import { connect } from "react-redux";
import RegistrationBanner from "../Assessts/registration.jpg";

import Footer from "./Footer"
import React, { Component } from 'react'
import { RegisterUser, GetUser } from "../../Action/AuthenticationAction";




class Registration extends Component {

    constructor(){
        super();
        this.state={
            flag:false,
            jwt:""
        }
    }

    componentDidUpdate(){
        
        if(this.props.user){
           
            let user=this.props.user;
            console.log(this.props.user.role);
            if(user.role=="USER"){
                
                localStorage.setItem("user",this.props.user)
                window.location.href="/user/profile";
            }
            else if(user.role=='MANAGER'){
                
                window.location.href="/" 
            }
        }
        if(this.props.token.length>0 && this.state.flag){
         
         console.log("inside if",this.props.token)
         this.props.dispatch(GetUser(this.props.token))
         this.setState({flag:false})
         
      }
    }

    registeruser = { username: "", email: "", password: "",role:"USER"}

    onSignUp = () => {
        alert(this.registeruser.username);
        console.log(this.registeruser);
        this.props.dispatch(RegisterUser(this.registeruser))
        window.location.reload();
    }


   render(){

   
   
    return (
        <div>
            <Segment vertical>
                <Grid stackable verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column width={8}>

                            <Image src={logo} alt='Company Logo' size="small"  style={{ marginLeft: "3em" }} />

                        </Grid.Column>
                        <Grid.Column width={8} textAlign="right">
                            <Button primary size="mini" style={{ marginRight: "4em", marginTop: "1em" }} >Login</Button>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{ backgroundColor: '#a5cc5d' }} verticalAlign="top">
                        <Grid.Column textAlign="center">
                            <List link horizontal>
                                <List.Item as='a' >Home</List.Item>
                                {/* <List.Item as='a' href="#aboutus">About Us</List.Item>
                                    <List.Item as='a' href="#services">Services</List.Item>
                                    <List.Item as='a' href="#footer">Contact Us</List.Item> */}

                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Grid stackable verticalAlign="middle" style={{ marginTop: "3em" }}>
                <Grid.Row>

                    <Grid.Column width={1}>

                    </Grid.Column>

                    <Grid.Column width={6}>
                        <Message attached="top"
                            header="Welcome to IDP Bank"
                            content="Registration" />

                        <Form className="attached fluid segment">
                            <Form.Group widths="equal">
                                {/* <Form.Input
                                    fluid
                                    label="First Name"
                                    labelPosition="left"
                                    placeholder="First Name"
                                    type="text"  onChange={e => this.registeruser.firstname = e.target.value}/>

                                <Form.Input
                                    fluid
                                    label="Last Name"
                                    placeholder="Last Name"
                                    type="text" onChange={e => this.registeruser.lastname = e.target.value} /> */}
                            </Form.Group>

                            <Form.Input
                                fluid
                                label="Username"
                                placeholder="Username"
                                type="text" onChange={e => this.registeruser.username = e.target.value}/>

                            <Form.Input
                                fluid
                                label="Email"
                                placeholder="E-mail Address"
                                type="email" onChange={e => this.registeruser.email = e.target.value}/>

                            <Form.Input
                                fluid
                                label="Password"
                                placeholder="Password"
                                type="password" onChange={e => this.registeruser.password = e.target.value}/>

                            <Form.Button
                                fluid
                                size="large"
                                primary
                                onClick={this.onSignUp} >
                                Register</Form.Button>
                        </Form>
                        <Message attached="bottom">
                            Already a Member? <a href='/Login'>Login Here</a>
                        </Message>

                    </Grid.Column>

                    <Grid.Column width={1}>

                    </Grid.Column>

                    <Grid.Column width={7}>
                        <Image src={RegistrationBanner} alt="Registration Banner" fluid />
                    </Grid.Column>

                    <Grid.Column width={1}>

                    </Grid.Column>


                </Grid.Row>
            </Grid>
            <Footer></Footer>
        </div>
    )
}
}



function mapStatetoProps(state){
    console.log(state)
    const token=state.jwt
    const user=state.user
    return {
       token,user
    };
}

export default connect(mapStatetoProps)(Registration);