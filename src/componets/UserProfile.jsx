import { useNavigate, useParams } from "react-router-dom"
import { Button, Form, Grid, Image, Menu, Input, Item, List, Message, Segment, FormButton, Table } from "semantic-ui-react";
import logo from "../componets/Assessts/banklogo.png"
import profileavatar from "./Assessts/ProfileAvatar.jpg"
import Footer from "../componets/Commons/Footer"
import { useEffect, useState } from 'react';
// import { Transaction } from "../Action/AuthenticationAction";
import axios from "axios";
import { useDispatch } from "react-redux";
import CreditCard from "./Commons/CreditCard";
import Cheque from "./Commons/Cheque";
import Debit from "./Commons/Debit";
import ChequeBook from "./Commons/Cheque";
import DebitCard from "./Commons/Debit";
import LoanApply from "./Commons/Loan";


const UserProfile = (props) => {

    const dispatch = useDispatch();

    const history = useNavigate();


    const [ai, setAi] = useState("profile");
    const [inner, setInner] = useState("Transaction");


    let [accountNumber, setAccountNumber] = useState('');
    let [receiverNumber, setreceiverNumber] = useState('');
    let [amountTransfer, setamountTransfer] = useState('');
    let [message, setMessage] = useState('');
    let [balance, setBalance] = useState('');
    let [depositMessage, setdepositMessage] = useState('');
    let [userUpdateMessage, setUserMessage] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [fatherName, setFatherName] = useState('');
    let [motherName, setMotherName] = useState('');
    let [phoneNumber, setPhoneNumber] = useState('');
    let [dateOfBirth, setDateofBirth] = useState('');
    let [sex, setSex] = useState('');
    let [adhaarCard, setAdhaarCard] = useState('');
    let [panCard, setPanCard] = useState('');
    let [address1, setAddress1] = useState('');
    let [address2, setAddress2] = useState('');
    const [transactionlist, setTransactionlist] = useState([]);

    useEffect(() => {
        let temp = JSON.parse(localStorage.getItem("user"));
        console.log(temp);
        setBalance(JSON.parse(localStorage.getItem("balance")));
        setAccountNumber(temp.username);

        setFirstName(temp.firstName);
        setLastName(temp.lastName);
        setFatherName(temp.fatherName);
        setMotherName(temp.motherName);
        setPhoneNumber(temp.phoneNumber);
        setDateofBirth(temp.dateOfBirth);
        setSex(temp.sex);
        setAdhaarCard(temp.adhaarCard);
        setPanCard(temp.panCard);
        setAddress1(temp.addressLine1);
        setAddress2(temp.addressLine2);
        getTransactionList(temp.username);

    }, [])

    const getTransactionList = (username) => {
        axios.get("http://localhost:8000/user/alltransactionBySender/" + username, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }).then((res) => {
            console.log(res.data);
            setTransactionlist(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleClick = (e, { name }) => {
        setAi(name);
    }
    const handleInner = (e, { name }) => {
        setInner(name);
    }

    const transaction = () => {
        if (accountNumber == receiverNumber) {
            setMessage('The send and receive account cannot be same.');
            return;
        }
        if (receiverNumber == '' || amountTransfer == '') {
            setMessage('The Receiver/Amount cannot be Empty.');
            return;
        }
        dispatch(Transaction());
    }

    const Deposit = () => {
        if (amountTransfer == '') {
            setdepositMessage('The Receiver/Amount cannot be Empty.');
            return;
        }
        dispatch(deposit());
    }

    const deposit = () => {
        let data = {
            accountNumber: accountNumber,
            amount: amountTransfer
        }
        return async function (dispatch, getState) {
            await axios.post("http://localhost:8000/user/deposit", data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
            })
                .then(data => {

                    console.log(data);
                    setreceiverNumber('');
                    setamountTransfer('');
                    console.log(accountNumber);
                    setdepositMessage(data.data.responseMessage);
                    setBalance(data.data.responseBody.currentBalance)
                    localStorage.setItem("balance", data.data.responseBody.currentBalance);


                })
                .catch((e) => {
                    console.log(e.response)
                    setdepositMessage(e.response.data.responseMessage);
                });
        };
    }

    const Transaction = () => {
        let data = {
            senderId: accountNumber,
            receiverId: receiverNumber,
            amount: amountTransfer
        }

        console.log(data);
        console.log(`Bearer ${localStorage.getItem("jwt")}`);
        return async function (dispatch, getState) {
            await axios.post("http://localhost:8000/user/transaction", data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
            })
                .then(data => {

                    console.log(data);
                    setreceiverNumber('');
                    setamountTransfer('');
                    console.log(accountNumber);
                    setMessage(data.data.responseMessage);
                    setBalance(data.data.responseBody.currentBalance)
                    localStorage.setItem("balance", data.data.responseBody.currentBalance);


                })
                .catch((e) => {
                    console.log(e.response)
                    setMessage(e.response.data.responseMessage);
                });
        };
    }

    const Update = () => {
        dispatch(updateUser());
    }

    const updateUser = () => {
        let data = {
            username: accountNumber,
            firstName,
            lastName,
            fatherName,
            motherName,
            phoneNumber,
            dateOfBirth,
            sex,
            adhaarCard,
            panCard,
            addressLine1: address1,
            addressLine2: address2,
        }

        return async function (dispatch, getState) {
            await axios.post("http://localhost:8000/user/updateUser", data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
            })
                .then(data => {

                    console.log(data);
                    localStorage.setItem("user", JSON.stringify(data.data.responseBody));
                    setUserMessage(data.data.responseMessage)
                })
                .catch((e) => {
                    console.log(e.response)
                    setdepositMessage(e.response.data.responseMessage);
                });
        };
    }

    return (
        <div>
            {/* NavBar */}
            <Segment vertical>
                <Grid stackable verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column width={8}>

                            <Image src={logo} alt='Company Logo' size="small" onClick={() => { history("/") }} style={{ marginLeft: "3em" }} />

                        </Grid.Column>
                        <Grid.Column width={8} textAlign="right">
                            <Button
                                primary
                                size="mini"
                                onClick={() => { history("/") }}
                                style={{ marginRight: "5em" }}
                            >Log Out</Button>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{ backgroundColor: '#a5cc5d' }} verticalAlign="top">
                        <Grid.Column textAlign="center">
                            <List link horizontal>
                                <List.Item as='a' onClick={() => { history("/user/profile") }}>Profile</List.Item>
                                {/* <List.Item as='a' onClick={() => { history("/user/loan") }}>Apply Loan</List.Item> */}
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>


            {/* Left Menu */}
            <Grid>
                <Grid.Column width={4}>
                    <Segment
                        style={{ backgroundColor: "#AED086" }}>
                        <Grid>
                            <Grid.Column width={8}>
                                <Image src={profileavatar} alt="Profile Image" fluid circular />
                            </Grid.Column>
                            <Grid.Column verticalAlign="middle" textAlign="center">
                                <Item.Content as="h3" >{firstName} {lastName}</Item.Content>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Menu fluid vertical tabular>
                        <Menu.Item
                            name="profile"
                            active={ai === "profile"}
                            onClick={handleClick} />
                        <Menu.Item
                            name="transaction"
                            active={ai === "transaction"}
                            onClick={handleClick} />
                        <Menu.Item
                            name="credit"
                            active={ai === "credit"}
                            onClick={handleClick} />
                        <Menu.Item
                            name="cheque"
                            active={ai === "cheque"}
                            onClick={handleClick} />
                        <Menu.Item
                            name="debit"
                            active={ai === "debit"}
                            onClick={handleClick} />
                        <Menu.Item
                            name="loan"
                            active={ai === "loan"}
                            onClick={handleClick} />
                    </Menu>
                </Grid.Column>

                {ai === 'profile' && <Grid.Column width={12} style={{ paddingLeft: 0 }}>
                    <Grid.Row style={{ padding: "1em" }}>
                        <Grid.Column>
                            <Item content={firstName + " " + lastName} style={{ paddingLeft: "1em" }}></Item>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: "1em" }}>
                        <Grid.Column>
                            <Item content={userUpdateMessage} style={{ paddingLeft: "1em" }}></Item>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{ padding: "1em" }}>
                        <h3 style={{ paddingLeft: "2em", paddingTop: "1em" }}><u>User Details</u></h3>
                        <Form
                            className="attached fluid segment"
                            style={{ border: "none" }}>

                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="First Name"
                                    type="text"
                                    value={firstName}
                                    onChange={e => { setFirstName(e.target.value) }} />
                                <Form.Input
                                    fluid
                                    label="Last Name"
                                    type="text"

                                    value={lastName}
                                    onChange={e => { setLastName(e.target.value) }} />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="Father Name"
                                    type="text"

                                    value={fatherName}
                                    onChange={e => { setFatherName(e.target.value) }} />
                                <Form.Input
                                    fluid
                                    label="Mother Name"
                                    type="text"
                                    value={motherName}
                                    onChange={e => { setMotherName(e.target.value) }} />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="Phone No"
                                    type="text"
                                    value={phoneNumber}
                                    onChange={e => { setPhoneNumber(e.target.value) }} />
                                <Form.Input
                                    fluid
                                    label="Date of Birth"
                                    type="text"
                                    value={dateOfBirth}
                                    onChange={e => { setDateofBirth(e.target.value) }} />
                                <Form.Input
                                    fluid
                                    label="Sex"
                                    type="text"
                                    value={sex}
                                    onChange={e => { setSex(e.target.value) }} />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="Aadhar Card"
                                    type="text"
                                    value={adhaarCard}
                                    onChange={e => { setAdhaarCard(e.target.value) }} />
                                <Form.Input
                                    fluid
                                    label="Pan Card"
                                    type="text"
                                    value={panCard}
                                    onChange={e => { setPanCard(e.target.value) }} />
                            </Form.Group>
                            <Form.Input
                                fluid
                                label="Address Line 1"
                                type="text"
                                value={address1}
                                onChange={e => { setAddress1(e.target.value) }} />
                            <Form.Input
                                fluid
                                label="Address Line 2"
                                type="text"
                                value={address2}
                                onChange={e => { setAddress2(e.target.value) }} />
                            <Form.Group widths="equal">
                                <Button
                                    style={{ backgroundColor: "#a5cc5d" }}
                                    fluid
                                    size="large"
                                    onClick={Update}>Update User Details</Button>
                            </Form.Group>
                        </Form>
                    </Grid.Row>
                </Grid.Column>}

                {/* Credit */}
                {ai === 'credit' && <Grid.Column width={12} style={{ paddingLeft: 0 }}>
                    <Grid.Column width={2}></Grid.Column>

                    <Grid.Column width={8}>
                        <CreditCard></CreditCard>
                    </Grid.Column>

                    <Grid.Column width={2}></Grid.Column>


                </Grid.Column>}

                {/* Cheque */}
                {ai === 'cheque' && <Grid.Column width={12} style={{ paddingLeft: 0 }}>
                    <Grid.Column width={2}></Grid.Column>

                    <Grid.Column width={8}>
                        <ChequeBook></ChequeBook>
                    </Grid.Column>

                    <Grid.Column width={2}></Grid.Column>


                </Grid.Column>}

                {/* Debit */}
                {ai === 'debit' && <Grid.Column width={12} style={{ paddingLeft: 0 }}>
                    <Grid.Column width={2}></Grid.Column>

                    <Grid.Column width={8}>
                        <DebitCard></DebitCard>
                    </Grid.Column>

                    <Grid.Column width={2}></Grid.Column>


                </Grid.Column>}

                {/* Loan */}
                {ai === "loan" && <Grid.Column width={12} style={{ paddingLeft: 0 }}>
                    <Grid.Column width={2}></Grid.Column>

                    <Grid.Column width={8}>
                        <LoanApply></LoanApply>
                    </Grid.Column>

                    <Grid.Column width={2}></Grid.Column>
                </Grid.Column>}

                {/* transaction */}
                {ai === 'transaction' && <Grid.Column width={12} style={{ paddingLeft: 0 }}>


                    <Menu fluid horizontal tabular>
                        <Menu.Item
                            name="Transaction"
                            active={inner === "Transaction"}
                            onClick={handleInner} />
                        <Menu.Item
                            name="Deposit"
                            active={inner === "Deposit"}
                            onClick={handleInner} />
                        <Menu.Item
                            name="Transaction History"
                            active={inner === "Transaction History"}
                            onClick={handleInner} />

                    </Menu>

                    {inner == 'Transaction History' && <Grid.Row style={{ padding: "1em" }}>
                        <Grid.Row style={{ padding: "1em" }}>

                        </Grid.Row>
                        <Grid.Row style={{ padding: "1em" }}>

                            {/* Transaction Table */}
                            <Table celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>S.No</Table.HeaderCell>
                                        <Table.HeaderCell>SenderId</Table.HeaderCell>
                                        <Table.HeaderCell>ReceiverId</Table.HeaderCell>

                                        {/* Mode - Deposit / Money Transfer */}
                                        <Table.HeaderCell>Mode Of Transfer</Table.HeaderCell>

                                        <Table.HeaderCell>Date Of Transaction</Table.HeaderCell>
                                        <Table.HeaderCell>Amount</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {transactionlist.map((res, num) => (
                                        <Table.Row>
                                            <Table.Cell> {num + 1}  </Table.Cell>
                                            <Table.Cell> {res.senderid}  </Table.Cell>
                                            <Table.Cell> {res.recieverid}  </Table.Cell>
                                            <Table.Cell> {res.modeOfTransfer}  </Table.Cell>
                                            <Table.Cell> {res.date}  </Table.Cell>
                                            <Table.Cell> {res.amount}  </Table.Cell>
                                            
                                        </Table.Row>
                                
                                ))
                                }
                                </Table.Body>

                            </Table>

                        </Grid.Row>
                    </Grid.Row>}

                    {inner == 'Transaction' && <Grid.Row style={{ padding: "1em" }}>
                        <Grid.Row style={{ padding: "1em" }}>
                            <Grid.Column>
                                <Item content={message} style={{ paddingLeft: "1em" }}></Item>
                            </Grid.Column>
                        </Grid.Row>
                        <h3 style={{ paddingLeft: "2em", paddingTop: "1em" }}><u>Current Balance : {balance}</u></h3>
                        <Form
                            className="attached fluid segment"
                            style={{ border: "none" }}>

                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="Your Account Number"
                                    type="text"
                                    onChange={e => { setAccountNumber(e.target.value); }
                                    }
                                    disabled={true}
                                    value={accountNumber}
                                />
                                <Form.Input
                                    fluid
                                    label="Receiver Account Number"
                                    type="text"
                                    onChange={e => { setreceiverNumber(e.target.value) }}
                                    value={receiverNumber}
                                />
                                <Form.Input
                                    fluid
                                    label="Amount to be transfered"
                                    type="text"
                                    onChange={e => { setamountTransfer(e.target.value) }}
                                    value={amountTransfer}
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Button
                                    style={{ backgroundColor: "#a5cc5d" }}
                                    fluid
                                    size="large"
                                    onClick={transaction}>Send</Button>
                            </Form.Group>
                        </Form>
                    </Grid.Row>}


                    {inner == 'Deposit' && <Grid.Row style={{ padding: "1em" }}>
                        <Grid.Row style={{ padding: "1em" }}>
                            <Grid.Column>
                                <Item content={depositMessage} style={{ paddingLeft: "1em" }}></Item>
                            </Grid.Column>
                        </Grid.Row>
                        <h3 style={{ paddingLeft: "2em", paddingTop: "1em" }}><u>Current Balance : {balance}</u></h3>
                        <Form
                            className="attached fluid segment"
                            style={{ border: "none" }}>

                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="Your Account Number"
                                    type="text"
                                    onChange={e => { setAccountNumber(e.target.value); }
                                    }
                                    disabled={true}
                                    value={accountNumber}
                                />
                                <Form.Input
                                    fluid
                                    label="Amount to be deposit"
                                    type="text"
                                    onChange={e => { setamountTransfer(e.target.value) }}
                                    value={amountTransfer}
                                />

                            </Form.Group>
                            <Form.Group widths="equal">
                                <Button
                                    style={{ backgroundColor: "#a5cc5d" }}
                                    fluid
                                    size="large"
                                    onClick={Deposit}>Deposit Amount</Button>
                            </Form.Group>
                        </Form>
                    </Grid.Row>}
                </Grid.Column>}
            </Grid>
            <Footer />
        </div>
    )
}

export default UserProfile;