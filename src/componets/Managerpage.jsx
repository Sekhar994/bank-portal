import { Button, Grid, Image, Menu, Item, List, Segment, Table, Header } from "semantic-ui-react";
import logo from "../componets/Assessts/banklogo.png"
import profileavatar from "./Assessts/ProfileAvatar.jpg"
import Footer from "../componets/Commons/Footer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Managerpage = () => {

    const history = useNavigate();

    const url = "http://localhost:8000/"

    const [ai, setAi] = useState("")
    const [transactionlist, setTransactionlist] = useState([]);
    const [creditlist, setCreditlist] = useState([]);
    const [chequelist, setChequelist] = useState([]);
    const [debitlist, setDebitlist] = useState([]);
    const [loanlist, setLoanlist] = useState([]);

    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem("manager"));
        getTransactionList();
        getCreditList();
        getChequeList();
        getDebitlist();
        getLoanList();
    }, [])

    const handleClick = (e, { name }) => {
        setAi(name);
    }

    const getTransactionList = () => {
        axios.get("http://localhost:8000/user/alltransaction", {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }).then((res) => {
            // console.log(res.data);
            setTransactionlist(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const CreditStatus = (credit, status) => {
        const data = {
            id: credit.id,
            username: credit.username,
            nameOnCard: credit.nameOnCard,
            status:"pending",
            limits: credit.limits
        }
        if (status === "Approved"){
            data.status = "Approved";
        }else{
            data.status = "Reject";
        }

        // console.log(data);
       axios.post("http://localhost:8000/admin/updateCreditStatus", data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        } ).then((res) => {
             alert("Status Updated");
            getCreditList();
        }).catch((error) => {
            console.log(error);
        })
    }

    const getCreditList = () => {
        axios.get("http://localhost:8000/admin/getAllCredit", {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }).then((res) => {
            // console.log(res.data);
            setCreditlist(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const ChequeStatus = (cheque, status) => {
        const data = {
            id: cheque.id,
            noOfPages: cheque.noOfPages,
            status: "pending"
        }
        if (status === "Approved"){
            data.status = "Approved";
        }else{
            data.status = "Reject";
        }
        axios.post("http://localhost:8000/admin/updateChequeStatus", data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }).then((res) => {
            alert("Status Updated");
            getChequeList();
        }).catch((error) => {
            console.log(error);
        })

    }

    const getChequeList = () => {
        axios.get("http://localhost:8000/admin/getAllCheque", {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }).then((res) => {
            // console.log(res.data);
            setChequelist(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const DebitStatus = (debit, status) => {
        const data = {
            id: debit.id,
            username: debit.username,
            nameOnCard: debit.nameOnCard,
            cardType: debit.cardType,
            status: "pending"
        }
        if (status === "Approved"){
            data.status = "Approved";
        }else {
            data.status = "Reject";
        }
        axios.post("http://localhost:8000/admin/updateDebitStatus", data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }).then((res) => {
            alert("Status Updated");
            getDebitlist();
        }).catch((error) => {
            console.log(error);
        })
    }

    const getDebitlist = () => {
        axios.get("http://localhost:8000/admin/getAllDebit", {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }).then((res) => {
            // console.log(res.data);
            setDebitlist(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const LoanStatus = (loan, status) => {
        const data = {
            id: loan.id,
            username: loan.username,
            loanType: loan.loanType,
            amount: loan.amount,
            status: "pending"
        }
        if (status === "Approved"){
            data.status = "Approved"
        }else {
            data.status = "Reject"
        }
        axios.post("http://localhost:8000/admin/updateLoanStatus", data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }).then((res) => {
            alert("Status Updated");
            getLoanList();
        }).catch((error) => {
            console.log(error);
        })
    }

    const getLoanList = () => {
        axios.get("http://localhost:8000/admin/getAllLoan", {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }).then((res) => {
            // console.log(res.data);
            setLoanlist(res.data);
        }).catch((error) => {
            console.log(error);
        })
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

                            <Header>Welcome to Admin Dashboard</Header>

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
                                <Item.Content as="h3" >Admin</Item.Content>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Menu fluid vertical tabular>
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

                {/* Credit */}
                {ai === 'credit' && <Grid.Column width={12} style={{ paddingLeft: 0 }}>
                    <Grid.Row style={{ padding: "1em" }}>
                        <Grid.Row style={{ padding: "1em" }}>

                        </Grid.Row>
                        <Grid.Row style={{ padding: "1em" }}>

                            {/* Credit Table */}
                            <Table celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>S.No</Table.HeaderCell>
                                        <Table.HeaderCell>Username</Table.HeaderCell>
                                        <Table.HeaderCell>Name On Card</Table.HeaderCell>
                                        <Table.HeaderCell>Limit</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                        <Table.HeaderCell>Action</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        creditlist.map((res, num) => (
                                            <Table.Row>
                                                <Table.Cell> {num + 1} </Table.Cell>
                                                <Table.Cell> {res.username} </Table.Cell>
                                                <Table.Cell> {res.nameOnCard}  </Table.Cell>
                                                <Table.Cell> {res.limits} </Table.Cell>
                                                <Table.Cell> {res.status} </Table.Cell>
                                                <Table.Cell>
                                                    <Button primary size="mini" onClick={() => {
                                                        CreditStatus(res, "Approved")}
                                                    }>Accept</Button>
                                                    <Button secondary size="mini" onClick={()=>CreditStatus(res, "Reject")}>Decline</Button> 
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    }

                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid.Row>

                </Grid.Column>}


                {/* Cheque */}
                {ai === 'cheque' && <Grid.Column width={12} style={{ paddingLeft: 0 }}>
                    <Grid.Row style={{ padding: "1em" }}>
                        <Grid.Row style={{ padding: "1em" }}>

                        </Grid.Row>
                        <Grid.Row style={{ padding: "1em" }}>

                            {/* Transaction Table */}
                            <Table celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>S.No</Table.HeaderCell>
                                        <Table.HeaderCell>Username</Table.HeaderCell>
                                        <Table.HeaderCell>No Of Pages</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                        <Table.HeaderCell>Action</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        chequelist.map((res, num) => (
                                            <Table.Row>
                                                <Table.Cell> {num + 1}  </Table.Cell>
                                                <Table.Cell> {res.username}  </Table.Cell>
                                                <Table.Cell> {res.noOfPages} </Table.Cell>
                                                <Table.Cell> {res.status}  </Table.Cell>
                                                <Table.Cell>
                                                    <Button primary size="mini" onClick={() => ChequeStatus(res, "Approved")}>Accept</Button>
                                                    <Button secondary size="mini" onClick={() => ChequeStatus(res, "Reject")}>Decline</Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    }
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid.Row>

                </Grid.Column>}

                {/* Debit */}
                {ai === 'debit' && <Grid.Column width={12} style={{ paddingLeft: 0 }}>
                    <Grid.Row style={{ padding: "1em" }}>
                        <Grid.Row style={{ padding: "1em" }}>

                        </Grid.Row>
                        <Grid.Row style={{ padding: "1em" }}>

                            {/* Transaction Table */}
                            <Table celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>S.No</Table.HeaderCell>
                                        <Table.HeaderCell>Username</Table.HeaderCell>
                                        <Table.HeaderCell>Name On Card</Table.HeaderCell>
                                        <Table.HeaderCell>Type Of Card</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                        <Table.HeaderCell>Action</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        debitlist.map((res, num) => (
                                            <Table.Row>
                                                <Table.Cell> {num + 1}  </Table.Cell>
                                                <Table.Cell> {res.username}  </Table.Cell>
                                                <Table.Cell> {res.nameOnCard}  </Table.Cell>
                                                <Table.Cell> {res.cardType}  </Table.Cell>
                                                <Table.Cell> {res.status}  </Table.Cell>
                                                <Table.Cell>
                                                    <Button primary size="mini" onClick={() => DebitStatus(res, "Approved")}>Accept</Button>
                                                    <Button secondary size="mini" onClick={() => DebitStatus(res, "Reject")}>Decline</Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    }

                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid.Row>

                </Grid.Column>}

                {/* transaction */}
                {ai === 'transaction' && <Grid.Column width={12} style={{ paddingLeft: 0 }}>
                    <Grid.Row style={{ padding: "1em" }}>
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
                                    {
                                        transactionlist.map((res, num) => (
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
                    </Grid.Row>
                </Grid.Column>}

                {/* loan */}
                {ai === "loan" && <Grid.Column width={12} style={{ paddingLeft: 0 }}>
                    <Grid.Row style={{ padding: "1em" }}>
                        <Grid.Row style={{ padding: "1em" }}>

                        </Grid.Row>
                        <Grid.Row style={{ padding: "1em" }}>

                            {/* Transaction Table */}
                            <Table celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>S.No</Table.HeaderCell>
                                        <Table.HeaderCell>Username</Table.HeaderCell>
                                        <Table.HeaderCell>Loan Type</Table.HeaderCell>
                                        <Table.HeaderCell>amount</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                        <Table.HeaderCell>Action</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        loanlist.map((res, num) => (
                                            <Table.Row>
                                                <Table.Cell> {num + 1}  </Table.Cell>
                                                <Table.Cell> {res.username}  </Table.Cell>
                                                <Table.Cell> {res.loanType}  </Table.Cell>
                                                <Table.Cell> {res.amount}  </Table.Cell>
                                                <Table.Cell> {res.status}  </Table.Cell>
                                                <Table.Cell>
                                                    <Button primary size="mini" onClick={() => LoanStatus(res, "Approved")}>Accept</Button>
                                                    <Button secondary size="mini" onClick={() => LoanStatus(res, "Reject")}>Decline</Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    }

                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid.Row>
                </Grid.Column>}
            </Grid>
            <Footer />
        </div>
    )
}

export default Managerpage;