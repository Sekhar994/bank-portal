import { Button, Form, Grid, Table, Menu, Icon } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const ChequeBook = () => {

    const dispatch = useDispatch();

    const [inner, setInner] = useState("Cheque");
    const [name, setName] = useState();
    const [noofpage, setNoofpage] = useState("30");
    const [chequelist, setChequelist] = useState([])

    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem("user"));
        setName(temp.username);

        getChequeList(temp.username);
    }, [])

    const handleInner = (e, { name }) => {
        setInner(name);
    }

    const Apply = () => {
        dispatch(Cheque());
    }

    const Cheque = () => {
        const data = {
            username: name,
            noOfPages: noofpage,
            status: "pending"
        }
        return async function (dispatch, getState) {
            await axios.post("http://localhost:8000/user/applyCheque", data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
            }).then((res) => {
                MyAlert("Apply Sucessfully");
                const temp = JSON.parse(localStorage.getItem("user"));
                getChequeList(temp.username);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const getChequeList = (username) => {
        axios.get("http://localhost:8000/user/getCheque?username=" + username, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        })
            .then((res) => {
                // console.log(res.data);
                setChequelist(res.data);
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
        })};

        return (
            <React.Fragment>

                <Grid.Row style={{ padding: "1em" }}>
                    <Menu fluid horizontal tabular>
                        <Menu.Item
                            name="Cheque"
                            active={inner === "Cheque"}
                            onClick={handleInner} />
                        <Menu.Item
                            name="Application Status"
                            active={inner === "Application Status"}
                            onClick={handleInner} />
                    </Menu>

                    {inner === "Cheque" && <Form
                        className="attached fluid segment"
                        style={{ border: "none" }}>

                        <Form.Input
                            fluid
                            label="Name"
                            type="text"
                            value={name}
                            onChange={e => { setName(e.target.value) }} />

                        <Form.Input
                            fluid
                            label="No of Pages"
                            type="text"
                            value={noofpage}
                            onChange={e => { setNoofpage(e.target.value) }} />

                        <Button primary onClick={Apply}> Apply </Button>

                    </Form>}

                    {inner === "Application Status" && <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>S.No</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>No of Pages</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>

                            {
                                chequelist.map((res, num) => (
                                    <Table.Row>

                                        <Table.Cell> {num + 1}  </Table.Cell>
                                        <Table.Cell> {res.username}  </Table.Cell>
                                        <Table.Cell> {res.noOfPages}  </Table.Cell>
                                        {/* <Table.Cell> {res.status}  </Table.Cell> */}
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

    export default ChequeBook;