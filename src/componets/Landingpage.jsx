import { Button, Card, Grid, Header, Icon, Image, List, Segment } from "semantic-ui-react";
// import Navbar from "./Commons/Navbar";
import logo from '../componets/Assessts/banklogo.png';
import banner1 from '../componets/Assessts/banner3.jpg';
import aboutus from '../componets/Assessts/banner2.jpg';
import services from '../componets/Assessts/banner1.jpg';
import i1 from '../componets/Assessts/bankingicon.jpg';
import i2 from '../componets/Assessts/mobileicon.jpg';
import i3 from '../componets/Assessts/whatsapp.png'
import i4 from '../componets/Assessts/easyloan.png'
import i5 from '../componets/Assessts/debitpinicon.png'
import { useNavigate } from "react-router-dom";

const Landingpage = () => {

    const history = useNavigate();

    return (
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

                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </section>

            {/* Banner */}
            <section >
                <Segment vertical style={{ paddingTop: "0em", paddingBottom: "3em" }}>
                    <Grid stackable verticalAlign="top">
                        <Grid.Row verticalAlign="top">
                            <Grid.Column verticalAlign="top">
                                <Image src={banner1} alt="Banner1" fluid></Image>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </section>

            <section id="aboutus">
                <Segment vertical style={{ marginTop: "5em", paddingBottom: "3em" }}>
                    <Grid stackable verticalAlign="top">
                        <Grid.Row>
                            <Grid.Column width={8} verticalAlign="bottom">
                                <Image src={aboutus} alt="About Us Image" fluid></Image>
                            </Grid.Column>
                            <Grid.Column width={8} style={{ marginTop: "4em" }}>
                                <Header as='h1' textAlign="center" style={{ fontSize: '3em', color: '#81b199' }}> About Us </Header>
                                <span style={{ textAlign: "center" }}>To be the preferred financial solutions provider excelling in customer delivery through insight, empowered employees and smart use of technology</span>
                                <br />
                                {/* <Header size="large" textAlign="center"> Core Values </Header> */}
                                <List bulleted>
                                    <List.Item>Ethics</List.Item>
                                    <List.Item>Transparency</List.Item>
                                    <List.Item>Customer Centricity</List.Item>
                                    <List.Item>Teamwork</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </section>

            <section id="services">
                <Segment vertical style={{ marginTop: "5em", paddingBottom: "3em" }}>
                    <Grid stackable verticalAlign="middle">
                        <Grid.Row>
                            <Grid.Column verticalAlign="middle">
                                <Header as='h1' textAlign="center" style={{ marginLeft: '4em', fontSize: '3em', color: '#81b199' }}>
                                    Our Services
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={1} verticalAlign="middle">

                            </Grid.Column>
                            <Grid.Column width={7} verticalAlign="middle">
                                <Card.Group itemsPerRow={3}>
                                    <Card raised as='a'>
                                        <Card.Content>
                                            <Image src={i1} alt="Internet Banking Icon"></Image>
                                        </Card.Content>
                                    </Card>
                                    <Card raised as='a'>
                                        <Card.Content>
                                            <Image src={i2} alt="Mobile Banking Icon"></Image>
                                        </Card.Content>
                                    </Card>
                                    <Card raised as='a'>
                                        <Card.Content>
                                            <Image src={i3} alt="WhatsApp Banking Icon"></Image>
                                        </Card.Content>
                                    </Card>
                                    <Card raised as='a'>
                                        <Card.Content>
                                            <Image src={i4} alt="Easy Loan Icon"></Image>
                                        </Card.Content>
                                    </Card>
                                    <Card raised as='a'>
                                        <Card.Content>
                                            <Image src={i5} alt="Generate Debit Card Pin Icon"></Image>
                                        </Card.Content>
                                    </Card>
                                </Card.Group>
                            </Grid.Column>

                            <Grid.Column width={1} verticalAlign="middle">

                            </Grid.Column>

                            <Grid.Column width={7} verticalAlign="middle">
                                <Image src={services} alt="Service Image" fluid></Image>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </section>

            <section id="footer">
                <Segment vertical style={{ marginTop: "5em"}}>
                    <Grid stackable>
                        <Grid.Row style={{ backgroundColor: '#e4e4e4', marginTop: "4em" }}>

                            {/* Blank Space */}
                            <Grid.Column width={1}>
                            </Grid.Column>

                            <Grid.Column width={3} verticalAlign="middle">
                                <Image src={logo} alt="Company's Logo" size="medium"></Image>
                            </Grid.Column>

                            {/* Blank Space */}
                            <Grid.Column width={1}>
                            </Grid.Column>

                            {/* Contact Us */}
                            <Grid.Column width={3} style={{ marginTop: '4em', marginBottom: '4em' }}>
                                <List>
                                    <Header as='h4'> <b><u>Contact Us</u></b></Header>
                                    <List.Item icon='phone' content="xxxxxxxxxx" />
                                    <List.Item icon='mail' content="abc@gmail.com" />
                                    <List.Item icon='home' content="Mumbai, India" />
                                </List>
                            </Grid.Column>

                            {/* Usefull Links */}
                            <Grid.Column width={3} style={{ marginTop: '4em', marginBottom: '4em' }}>
                                <List>
                                    <Header as='h4'> <b><u>Usefull Links</u></b> </Header>
                                    <List.Item content="Latest Article"></List.Item>
                                    <List.Item content="Download Forms"></List.Item>
                                    <List.Item content="Careers"></List.Item>
                                    <List.Item content="RBI"></List.Item>
                                    <List.Item content="Fees and Charges"></List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={3} style={{ marginTop: '4em', marginBottom: '4em' }}>
                                <Header as='h4'> <b><u>Connect Us with Social Media</u></b></Header>
                                <Icon link name="linkedin" size="big" ></Icon>
                                <Icon link name="youtube" size="big" ></Icon>
                                <Icon link name="facebook" size="big" ></Icon>
                                <Icon link name="twitter" size="big" ></Icon>
                                <Icon link name="instagram" size="big" ></Icon>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ backgroundColor: "#444444" }}>
                            <Grid.Column style={{ marginTop: "1em", marginBottom: "1em" }} verticalAlign="middle">
                                <Header as="h5" textAlign="center" style={{ color: "white" }}>Copyright © 2022 IDP Bank</Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </section>

        </div>
    )
}

export default Landingpage;