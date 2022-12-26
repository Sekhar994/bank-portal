import { Button, Form, Grid, List, Image, Message, Segment } from "semantic-ui-react";
import Footer from "./Footer";
import { connect } from "react-redux";
import logo from "../Assessts/banklogo.png";
// import Navbar from "./Navbar";
import loginbanner from "../Assessts/loginbanner.jpg"
import { Component } from "react";
import { AuthUser, GetUser } from "../../Action/AuthenticationAction";
import { useNavigate } from 'react-router-dom';
import { faL } from "@fortawesome/free-solid-svg-icons";



 class Login extends Component  { 
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
                
                // localStorage.setItem("user",this.props.user)
                window.location.href="/user/profile";
            }
            else if(user.role=='MANAGER'){
                
                window.location.href="/manager" 
            }
        }
        if(this.props.token.length>0 && this.state.flag){
         
         console.log("inside if",this.props.token)
         this.props.dispatch(GetUser(this.props.token))
         this.setState({flag:false})
         
      }
    }
    authuser = { username: "", password: "" }
    onSignIn = () => {
        this.props.dispatch(AuthUser(this.authuser));
        this.setState({flag:true});
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
                            <Button primary size="mini" style={{ marginRight: "4em", marginTop: "1em" }} >Register</Button>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{ backgroundColor: '#a5cc5d' }} verticalAlign="top">
                        <Grid.Column textAlign="center">
                            <List link horizontal>
                                <List.Item as='a'  >Home</List.Item>
                                {/* <List.Item as='a' href="#aboutus">About Us</List.Item>
                                    <List.Item as='a' href="#services">Services</List.Item>
                                    <List.Item as='a' href="#footer">Contact Us</List.Item> */}

                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Grid
                stackable
                verticalAlign="middle"
                style={{ marginTop: "5em" }}>

                <Grid.Row>
                    <Grid.Column width={1} />

                    <Grid.Column
                        width={6}
                        textAlign="center"
                        verticalAlign="top" >

                        <Message attached="top"
                            header="Customer Login" />
                        <Form className='attached fluid segment'>
                            <Form.Input
                                icon="user"
                                iconPosition="left"
                                placeholder="User name"
                                type="username" onChange={e => this.authuser.username = e.target.value} />
                            <Form.Input
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="Password" onChange={e => this.authuser.password = e.target.value} />
                            <Button
                                style={{ backgroundColor: "#a5cc5d" }}
                                fluid
                                size="large"
                                onClick={this.onSignIn} >Login</Button>
                        </Form>
                        <Message attached="bottom">
                            New to us? <a href='/register'>Sign Up</a>
                        </Message>
                    </Grid.Column>

                    <Grid.Column width={1} />

                    <Grid.Column width={7}>
                        <Image
                            src={loginbanner}
                            alt="Login Page Banner"
                            fluid />
                    </Grid.Column>

                    <Grid.Column width={1} />
                </Grid.Row>
            </Grid>

            <Footer />
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

export default connect(mapStatetoProps)(Login);