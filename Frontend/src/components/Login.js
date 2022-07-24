import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
// import axios from 'axios'
import {
    Card,
    Form,
    Row,
    Col,
    Input,
    Button
} from 'reactstrap'
import {
    browserSessionPersistence,
    // sendPasswordResetEmail,
    setPersistence,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    // const sendRequest = async() => {
    //     const { email, password } = values

    //     const res = axios.post('http://localhost:5000/api/login',{
    //         email,
    //         password
    //     }).catch(err => console.log(err))

    //     const data = await res.data

    //     return data
    // }

    const handleChange = e => {
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(values.email === '' || values.password === '')
            return alert("Please fill in all the form")

        function loginHandler() {
            return new Promise((resolve) => {
              setPersistence(auth, browserSessionPersistence)
                .then(() => {
                  signInWithEmailAndPassword(auth, values.email, values.password)
                    .then((userCrendential) => {
                      const user = userCrendential.user;
                      resolve(user);
                    })
                    .catch((err) => {
                      console.log(err);
                      return alert("Wrong Email or Password")
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        }

        loginHandler().then((user) => {
            console.log(user);
            navigate("/chatbot");
        });

        // sendRequest().then(() => navigate("/chatbot"))
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
                    <Link to="/register">
                    <Button className='mx-2' size='sm' name='register'>Register</Button>
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
                <Row className='d-flex align-items-center align-self-center '>
                    <Col>
                        
                        <Form className='m-4' onSubmit={handleSubmit}>
                            <h3 className='text-muted py-3'>LOGIN</h3>
                            <Input className='mb-2' 
                                type='email' 
                                placeholder='Email' 
                                name='email'
                                onChange={handleChange}
                            />
                            <Input className='mb-2' 
                                type='password' 
                                placeholder='Password' 
                                name='password'
                                onChange={handleChange}
                            />
                            <Button type='submit' block={true}>Login</Button>
                        </Form>
                        
                    </Col>

                    <Col style={{color: "white"}}>
                        <h1>Welcome to South China Sea Conflict Chatbot</h1>
                    </Col>
                </Row>
            </Card>
        </div>
        </main>
        </html>
    )
}

export default Login