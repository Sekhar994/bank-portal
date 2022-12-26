import { Button, Grid, Image, List, Segment } from "semantic-ui-react";
import logo from "../Assessts/banklogo.png";
import {useNavigate} from "react-router-dom";


const Navbar = () => {

    const history = useNavigate();

    return(
        <div>
            <section id="home">
                <Segment vertical>
                    <Grid stackable verticalAlign="middle">
                        <Grid.Row>
                            <Grid.Column width={8}>

                                <Image src={logo}  alt='Company Logo' size="small" onClick={() => {history("/")}} style={{ marginLeft: "3em" }} />                          
                            
                            </Grid.Column>
                            <Grid.Column width={8} textAlign="right">
                                <Button primary size="mini" style={{ marginRight: "4em", marginTop: "1em"}} onClick={() => {history("/login")}}>Login</Button>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row style={{ backgroundColor: '#a5cc5d' }} verticalAlign="top">
                            <Grid.Column textAlign="center">
                                <List link horizontal>
                                    <List.Item as='a' href="#home" >Home</List.Item>
                                    <List.Item as='a' href="#aboutus">About Us</List.Item>
                                    <List.Item as='a' href="#services">Services</List.Item>
                                    <List.Item as='a' href="#footer">Contact Us</List.Item>
                                    <List.Item as='a' href="/userhome">After login</List.Item>

                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </section>
        </div>
    )
}

export default Navbar;