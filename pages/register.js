/* /pages/register.js */

import React, { useState, useContext } from 'react';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { registerUser } from '../src/components/Auth';
import AppContext from '../src/Providers/Context';

const Register = () => {
    const [data, setData] = useState({ email: '', username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const appContext = useContext(AppContext);
    return (
        <Container>
            <Row>
                <Col sm="12" md={{ size: 5, offset: 3 }}>
                    <div className="paper">
                        <div className="header">
                            <img src="http://localhost:1337/uploads/5a60a9d26a764e7cba1099d8b157b5e9.png" />
                        </div>
                        <section className="wrapper">
                            {Object.entries(error).length !== 0 &&
                                error.constructor === Object &&
                                error.message.map((error) => {
                                    return (
                                        <div
                                            key={error.messages[0].id}
                                            style={{ marginBottom: 10 }}
                                        >
                                            <small style={{ color: 'red' }}>
                                                {error.messages[0].message}
                                            </small>
                                        </div>
                                    );
                                })}
                            <Form>
                                <fieldset disabled={loading}>
                                    <FormGroup>
                                        <Label>Username:</Label>
                                        <Input
                                            disabled={loading}
                                            onChange={(e) =>
                                                setData({ ...data, username: e.target.value })
                                            }
                                            value={data.username}
                                            type="text"
                                            name="username"
                                            style={{ height: 50, fontSize: '1.2em' }}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Email:</Label>
                                        <Input
                                            onChange={(e) =>
                                                setData({ ...data, email: e.target.value })
                                            }
                                            value={data.email}
                                            type="email"
                                            name="email"
                                            style={{ height: 50, fontSize: '1.2em' }}
                                        />
                                    </FormGroup>
                                    <FormGroup style={{ marginBottom: 30 }}>
                                        <Label>Password:</Label>
                                        <Input
                                            onChange={(e) =>
                                                setData({ ...data, password: e.target.value })
                                            }
                                            value={data.password}
                                            type="password"
                                            name="password"
                                            style={{ height: 50, fontSize: '1.2em' }}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <span>
                                            <a href="">
                                                <small>Forgot Password?</small>
                                            </a>
                                        </span>
                                        <Button
                                            style={{
                                                float: 'right',
                                                width: 120,
                                                backgroundColor: '#7A9D54',
                                            }}
                                            disabled={loading}
                                            onClick={() => {
                                                setLoading(true);
                                                registerUser(
                                                    data.username,
                                                    data.email,
                                                    data.password
                                                )
                                                    .then((res) => {
                                                        // set authed user in global context object
                                                        appContext.setUser(res.data.user);
                                                        setLoading(false);
                                                        console.log(
                                                            `registered user: ${JSON.stringify(
                                                                res.data
                                                            )}`
                                                        );
                                                    })
                                                    .catch((error) => {
                                                        console.log(`error in register: ${error}`);
                                                        //setError(error.response.data);
                                                        setLoading(false);
                                                    });
                                            }}
                                        >
                                            {loading ? 'Loading...' : 'Submit'}
                                        </Button>
                                    </FormGroup>
                                </fieldset>
                            </Form>
                        </section>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
export default Register;
