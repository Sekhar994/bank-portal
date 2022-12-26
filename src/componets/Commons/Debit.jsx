import { Button, Form, Grid, Icon, Menu, Table } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const DebitCard = () => {

    const dispatch = useDispatch();

    const [inner, setInner] = useState("Debit");
    const [username, setUsername] = useState();
    const [nameoncard, setNameoncard] = useState();
    const [typeofcard, setTypeofcard] = useState();
    const [debitlist, setDebitlist] = useState();

    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem("user"));
        setUsername(temp.username);

        getDebitlist(temp.username);
    }, [])

    const handleInner = (e, { name }) => {
        setInner(name)
    }


    const Apply = () => {
        dispatch(Debit());
    }

    const Debit = () => {
        const data = {
            username: username,
            nameOnCard: nameoncard,
            cardType: typeofcard,
            status: "pending"
        }
        console.log(data);
        return async function (dispatch, getState) {
            await axios.post("http://localhost:8000/user/applyDeditCard", data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
            }).then((res) => {
                MyAlert("Applied Sucessfully");
                const temp = JSON.parse(localStorage.getItem("user"));
                getDebitlist(temp.username);
            }).catch((error) => {
                console.log(error);
            })
        };
    }

    const getDebitlist = (username) => {
        axios.get("http://localhost:8000/user/getDeditCard?username=" + username, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }).then((res) => {
            // console.log(res.data);
            setDebitlist(res.data);
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
                        name="Debit"
                        active={inner === "Debit"}
                        onClick={handleInner} />
                    <Menu.Item
                        name="Application Status"
                        active={inner === "Application Status"}
                        onClick={handleInner} />
                </Menu>

                {inner === "Debit" && <Form
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
                        label="Name On Card"
                        type="text"
                        value={nameoncard}
                        onChange={e => setNameoncard(e.target.value)} />

                    <Form.Input
                        fluid
                        label="Type Of Card"
                        type="text"
                        value={typeofcard}
                        onChange={e => setTypeofcard(e.target.value)} />

                    <Button
                        primary
                        onClick={Apply}> Apply </Button>

                </Form>}

                {inner === "Application Status" && <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>S.No</Table.HeaderCell>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Name On Card</Table.HeaderCell>
                            <Table.HeaderCell>Type Of Card</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
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
                                    {
                                        res.status === 'Approved' && <Table.Cell positive> <Icon name='checkmark' /> {res.status}  </Table.Cell>
                                    }
                                    {
                                        res.status === 'pending' && <Table.Cell warning> <Icon name='attention' /> {res.status}  </Table.Cell>
                                    }
                                    {
                                        res.status === 'Reject' && <Table.Cell negative> <Icon name='close' /> {res.status}  </Table.Cell>
                                    }                                    
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

export default DebitCard;