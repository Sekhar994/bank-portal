import { Button, Form, Grid, Icon, Menu, Table } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const CreditCard = () => {

    const dispatch = useDispatch();


    const [inner, setInner] = useState("credit card");
    const [username, setUsername] = useState();
    const [nameoncard, setNameoncard] = useState();
    const [limit, setLimit] = useState("50000");
    const [creditList, setCreditList] = useState([]);


    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem("user"));
        setUsername(temp.username);

        getCreditList(temp.username);


    }, [])


    const getCreditList = (username) => {
        axios.get("http://localhost:8000/user/getCreditCard?username=" + username, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }).then((res) => {
            // console.log(res.data);
            setCreditList(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleInner = (e, { name }) => {
        setInner(name);
    }

    const Apply = () => {
        dispatch(Credit());
    }

    const Credit = () => {
        const data = {
            username: username,
            nameOnCard: nameoncard,
            status: "pending",
            limits: limit
        }
        console.log(data);
        return async function (dispatch, getState) {
            await axios.post("http://localhost:8000/user/applyCreditCard", data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
            }).then((res) => {
                MyAlert("Apply Sucessfully");

                const temp = JSON.parse(localStorage.getItem("user"));
                getCreditList(temp.username);
            }).catch((error) => {
                console.log(error);
            })
        }
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
                {/* <h3 style={{ paddingLeft: "2em", paddingTop: "1em" }}><u>Credit Card</u></h3> */}
                <Menu fluid horizontal tabular>
                    <Menu.Item
                        name="credit card"
                        active={inner === "credit card"}
                        onClick={handleInner} />
                    <Menu.Item
                        name="Application Status"
                        active={inner === "Application Status"}
                        onClick={handleInner} />
                </Menu>



                {inner === "credit card" && <Form className="attached fluid segment" style={{ border: "none" }}>
                    <Form.Input
                        fluid
                        label="Username"
                        type="text"
                        value={username}
                        readOnly
                        onChange={e => { setUsername(e.target.value) }} />

                    <Form.Input
                        fluid
                        label="Name On Card"
                        type="text"
                        value={nameoncard}
                        onChange={e => { setNameoncard(e.target.value) }} />

                    <Form.Input
                        fluid
                        label="Limit"
                        type="text"
                        value={limit}
                        readOnly
                        onChange={e => { setLimit(e.target.value) }} />

                    <Button primary onClick={Apply}> Apply </Button>

                </Form>}

                {inner === "Application Status" && <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>S.No</Table.HeaderCell>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Name On Card</Table.HeaderCell>
                            <Table.HeaderCell>Limit</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {
                            creditList.map((res, num) => (
                                <Table.Row>

                                    <Table.Cell> {num + 1}  </Table.Cell>
                                    <Table.Cell> {res.username}  </Table.Cell>
                                    <Table.Cell> {res.nameOnCard}  </Table.Cell>
                                    <Table.Cell> {res.limits}  </Table.Cell>
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

export default CreditCard;