import React, { useState, useEffect } from "react";
import { Card, Button, Tabs, Tab } from 'react-bootstrap';
import cookie from 'react-cookies';
import { useHistory } from "react-router-dom";

function AdminHome() {
    const [requests, setRequests] = useState([]);
    const API_SERVER = 'https://info-graph-server.herokuapp.com';
    const token = cookie.load('auth-token');
    const history = useHistory();

    useEffect(() => {
        fetch(`${API_SERVER}/api/all-requests`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': API_SERVER,
                Authorization: `Bearer ${token}`
            },
        }).then(async (req) => {
            let data = await req.json();
            console.log('all requests', data);
            setRequests(data);
        })

    }, [])
    function edit(id, reqStatus) {

        fetch(`${API_SERVER}/api/update-status`, {
            method: 'put',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': API_SERVER,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ id, status: reqStatus })
        }).then(async (req) => {
            let data = await req.json();
            console.log('update', data);
            history.push('/chart')
        })
    }
    function Pending() {

        return (<>
            {requests.pending ? requests.pending.map(req => {
                return (

                    <Card className="text-center">
                        <Card.Header>Owner: {req.ownerName}</Card.Header>
                        <Card.Body>
                            <Card.Title>Location: {req.houseLocation}</Card.Title>
                            <Card.Text>
                                {req.description}
                            </Card.Text>
                            <Button variant="primary" onClick={() => edit(req._id, 'approved')}>Accept</Button>
                            <Button variant="danger" onClick={() => edit(req._id, 'rejected')}>Reject</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Price: {req.price}</Card.Footer>
                    </Card>
                )
            }) : null}
        </>
        )
    }
    function Approved() {

        return (<>
            {requests.approved ? requests.approved.map(req => {
                return (

                    <Card className="text-center">
                        <Card.Header>Owner: {req.ownerName}</Card.Header>
                        <Card.Body>
                            <Card.Title>Location: {req.houseLocation}</Card.Title>
                            <Card.Text>
                                {req.description}
                            </Card.Text>
                            <Button variant="warning" onClick={() => edit(req._id, 'pending')}>Pending</Button>
                            <Button variant="danger" onClick={() => edit(req._id, 'rejected')}>Reject</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Price: {req.price}</Card.Footer>
                    </Card>
                )
            }) : null}
        </>
        )
    }
    function Rejected() {

        return (<>
            {requests.rejected ? requests.rejected.map(req => {
                return (

                    <Card className="text-center">
                        <Card.Header>Owner: {req.ownerName}</Card.Header>
                        <Card.Body>
                            <Card.Title>Location: {req.houseLocation}</Card.Title>
                            <Card.Text>
                                {req.description}
                            </Card.Text>
                            <Button variant="primary" onClick={() => edit(req._id, 'approved')}>Accept</Button>
                            <Button variant="warning" onClick={() => edit(req._id, 'pending')}>Pending</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Price: {req.price}</Card.Footer>
                    </Card>
                )
            }) : null}
        </>
        )
    }
    return (
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="Pending" title="Pending">
                <Pending/>
            </Tab>
            <Tab eventKey="Approved" title="Approved">
            <Approved/>
            </Tab>
            <Tab eventKey="Rejected" title="Rejected" >
            <Rejected/>
            </Tab>
        </Tabs>
    )
}
export default AdminHome;