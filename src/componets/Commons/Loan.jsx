import { Button, Form, Grid, Icon, Menu, Table } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const LoanApply = () => {

    const dispatch = useDispatch();
    const [inner, setInner] = useState("Loan");
    const [username, setUsername] = useState();
    const [loantype, setLoantype] = useState();
    const [amount, setAmount] = useState();
    const [loanlist, setLoanlist] = useState();

    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem("user"));
        setUsername(temp.username);

        getLoanlist(temp.username);
    }, [])

    // Menu Controller
    const handleInner = (e, { name }) => {
        setInner(name)
    }

    // Apply For Loan
    const Apply = () => {
        dispatch(Loan());
    }

    const Loan = () => {
        const data = {
            username: username,
            loanType: loantype,
            amount: amount,
            status: "pending"
        }
        console.log(data);
        return async function (dispatch, getState){
            await axios.post("http://localhost:8000/user/applyLoan", data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
            }).then((res) => {
                MyAlert("Applied Sucessfully");
                const temp = JSON.parse(localStorage.getItem("user"));
                getLoanlist(temp.username);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    // Get Loans Detail
    const getLoanlist = (username) => {
        axios.get("http://localhost:8000/user/getLoan?username=" + username, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }).then((res) => {
            // console.log(res.data);
            setLoanlist(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const MyAlert = (msg) => {
        toast.success(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    return (
        <React.Fragment>
            <Grid.Row style={{ padding: "1em" }}>
                <Menu fluid horizontal tabular>
                    <Menu.Item
                        name="Loan"
                        active={inner === "Loan"}
                        onClick={handleInner} />
                    <Menu.Item
                        name="Application Status"
                        active={inner === "Application Status"}
                        onClick={handleInner} />
                </Menu>

                {inner === "Loan" && <Form
                    className="attached fluid segment"
                    style={{ border: "none" }}>

                    <Form.Input
                        fluid
                        label="Username"
                        type="text"
                        readOnly
                        value={username}
                        onChange={e => setUsername(e.target.value)} />

                    <Form.Input
                        fluid
                        label="Loan Type"
                        type="text"
                        value={loantype}
                        onChange={e => setLoantype(e.target.value)} />

                    <Form.Input
                        fluid
                        label="Amount"
                        type="text"
                        value={amount}
                        onChange={e => setAmount(e.target.value)} />

                    <Button
                        primary
                        onClick={Apply}> Apply </Button>

                </Form>}

                {inner === "Application Status" && <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>S.No</Table.HeaderCell>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Loan Type</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
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
                                    {/* {
                                        res.status === 'Approved' && <Table.Cell positive> <Icon name='checkmark' /> {res.status} </Table.Cell>
                                    }
                                    {
                                        res.status === 'pending' && <Table.Cell warning> <Icon name='attention' /> {res.status}  </Table.Cell>
                                    }
                                    {
                                        res.status === 'Reject' && <Table.Cell negative> <Icon name='close' /> {res.status}  </Table.Cell>
                                    } */}
                                </Table.Row>
                            ))
                        }

                    </Table.Body>
                </Table>}
            </Grid.Row>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </React.Fragment>
    )
}

export default LoanApply;