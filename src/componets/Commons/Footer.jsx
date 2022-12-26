import { Grid, Header, Icon, Image, List, Segment } from "semantic-ui-react";
import logo from '../Assessts/banklogo.png';


const Footer = () => {
    return(
        <div>
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

export default Footer;