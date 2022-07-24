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
        fname: '',
        lname: '',
        email: '',
        password: ''
    })

    const sendRequest = async() => {
        const { name, email, password } = values

        const res = axios.post('http://localhost:5000/api/signup',{
            name,
            email,
            password
        })

        const data = await res.data

        return data
    }

    const handleChange = e => {
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(values)
        
        if(values.email === '' || values.fname === '' || values.lname === '' || values.password === '')
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
                displayName: values.fname
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

        // await axios.post('http://localhost:5000/register', {
        //     firstName: values.fname,
        //     lastName: values.lname,
        //     email: values.email
        // }).then(() => {
            createNewUser()
        // })
        .then((user) => {
            return updateDisplayname(user);
        })
        .then( async() => {
            await axios.post('http://localhost:5000/register', {
                firstName: values.fname,
                lastName: values.lname,
                email: values.email
            })
        })
        .then((user) => {
            navigate(`/`);
        });

        // sendRequest().then(() => navigate("/")).catch(err => console.log(err))
    }

    return (
        <html>
        <header>
        <nav className='position-sticky navbar navbar-expand bg-dark'>
            <div className='container-fluid'>
                <a className='navbar-brand '>South China Sea Conflict Chatbot</a>
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
                                        placeholder='Firstname' 
                                        name='fname'
                                        onChange={handleChange}
                                    />
                                </Col>

                                <Col>
                                    <Input className='mb-2' 
                                        type='text' 
                                        placeholder='Lastname' 
                                        name='lname'
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