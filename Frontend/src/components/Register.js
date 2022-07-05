import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase'
import {
    Card,
    Form,
    Row,
    Col,
    Input,
    Button
} from 'reactstrap'

const Register = () => {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const sendRequest = async() => {
        const { name, email, password } = values

        const res = axios.post('http://localhost:5000/api/signup',{
            name,
            email,
            password
        }).catch((err) => console.log(err))

        const data = await res.data

        return data
    }

    const handleChange = e => {
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(values.email === '' || values.name === '' || values.password === '')
            return alert("Please fill in all the form")

        function createNewUser() {
            return new Promise((resolve) => {
              createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                  const user = userCredential.user;
                  console.log(user);
                  resolve(user);
                })
                .catch((err) => {
                  console.log("Error on create user ", err);
                });
            });
        }
      
        function updateDisplayname(user) {
            return new Promise((resolve) => {
              updateProfile(user, {
                displayName: values.name,
              })
                .then(() => {
                  console.log("Updated username");
                  resolve(user);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        }
      
        createNewUser()
            .then((user) => {
                return updateDisplayname(user);
            })
            .then((user) => {
                navigate(`/`);
                // setUsername("");
                // setEmail("");
                // setPassword("");
                // setUsernameTouched(false);
                // setEmailTouched(false);
                // setPasswordTouched(false);
            });

        // sendRequest().then(() => navigate("/")).catch(err => console.log(err))
    }

    return (
        <html>
        <header>
        <nav className='position-sticky navbar navbar-expand bg-dark'>
            <div className='container-fluid'>
                <a className='navbar-brand ' href='/#'>South China Sea Conflict Chatbot</a>
                <div>
                    {/* <Link to="/">
                        <Button className='mx-2' size='sm' name='login'>Chatbot</Button>
                    </Link> */}
                    <Link to="/">
                    <Button className='mx-2' size='sm' name='register'>Login</Button>
                    </Link>
                    {/* <Button className='mx-2' size='sm' name='login' onClick={navigateButton}>Login</Button>
                    <Button className='mx-2' size='sm' name='register' onClick={navigateButton}>Register</Button> */}
                </div>
            </div>
        </nav>
        </header>
        <main>
        <div className='d-flex justify-content-center align-items-center align-self-center' style={{width: "auto", height: "90vh"}}>
            
            <Card className='bg-dark py-5'>
                <Row className='d-flex align-items-center align-self-center'>
                    <Col>
                        
                        <Form className='m-4' onSubmit={handleSubmit}>
                            
                            <h3 className='text-muted'>REGISTER</h3>

                            <Row>
                                <Col>
                                    <Input className='mb-2' 
                                        type='text' 
                                        placeholder='Name' 
                                        name='name'
                                        onChange={handleChange}
                                    />
                                </Col>

                                <Col>
                                    <Input className='mb-2' 
                                        type='text' 
                                        placeholder='Lastname' 
                                        name='name'
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Input className='mb-2' 
                                        type='email' 
                                        placeholder='Email' 
                                        name='email'
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Input className='mb-2' 
                                        type='password' 
                                        placeholder='Password' 
                                        name='password'
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <Button type='submit' block={true}>Register</Button>

                        </Form>
                        
                    </Col>

                    <Col className='text-white'>
                        <h1>Welcome to South China Sea Conflict Chatbot</h1>
                    </Col>

                </Row>
            </Card>
        </div>
        </main>
        </html>
    )
}

export default Register