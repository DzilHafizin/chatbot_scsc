import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
// import axios from 'axios'
import {
    Card,
    Form,
    Row,
    Col,
    Input,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap'
import { updateProfile, signOut } from "firebase/auth";
import { auth } from "../firebase";
import axios from 'axios';

const Update = () => {

    const navigate = useNavigate()
    const [buttonState, setButtonState] = useState(false)
    const [user, setUser] = useState('')
    const [values, setValues] = useState({
        email: '',
        fname: '',
        lname: ''
    })

    const handleButtonState = () => {
        setButtonState({buttonState: !buttonState})
    }

    // const getUser = async() => {
    //     await axios.post('http://localhost:5000/getData', {email: user.email})
    //         .then((res) => {
    //             console.log(res)
    //         })
    // }

    useEffect(() => {

        function getUID() {
            return new Promise((resolve) => {
                const user = auth.currentUser;
                if (user) {
                    resolve(user);
                } else {
                    navigate("/");
                }
            });
        }

        getUID()
            .then( async(user) => {
                console.log(user.email)

                setUser(user)

                await axios.post('http://localhost:5000/getUser', {email: user.email})
                    .then((res) => {
                        console.log(res.data)

                        setValues({
                            ...values,
                            fname: res.data.firstName,
                            lname: res.data.lastName,
                            email: res.data.email
                        })
                    })
            })

    },[])

    const handleChange = e => {
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const logout = async() => {
        await signOut(auth);
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(user,values)

        if(values.email === '' || values.lname === '' || values.fname === '') {
            return alert("Please fill in all the form")
        }

        updateProfile(user,{
            displayName: values.fname,
        })
            .then( async() => {
                await axios.post('http://localhost:5000/editUser', {
                    email: values.email,
                    firstName: values.fname,
                    lastName: values.lname
                })
                    .then((res) => {
                        console.log(res)
                    })

            })
    }

    return (
        <html>
        <header>
        <nav className='position-sticky navbar navbar-expand bg-dark'>
            <div className='container-fluid'>
                <a className='navbar-brand '>South China Sea Conflict Chatbot</a>
                {/* <div> */}
                    {/* <Link to="/chatbot">
                        <Button className='mx-2' size='sm' name='login'>Chatbot</Button>
                    </Link>
                    <Link to="/dashboard">
                        <Button className='mx-2' size='sm' name='register'>Dashboard</Button>
                    </Link>
                    <Link to="/">
                        <Button className='mx-2' size='sm' name='register'>Logout</Button>
                    </Link> */}
                    {/* <Button className='mx-2' size='sm' name='login' onClick={navigateButton}>Login</Button>
                    <Button className='mx-2' size='sm' name='register' onClick={navigateButton}>Register</Button> */}
                {/* </div> */}

                <Dropdown isOpen={buttonState}>
                    <DropdownToggle size='sm' onClick={handleButtonState}>
                        Menu
                    </DropdownToggle>

                    <DropdownMenu dark end>
                        <Link to="/chatbot">
                            <DropdownItem>
                                Chatbot
                            </DropdownItem>
                        </Link>
                        <Link to="/dashboard">
                            <DropdownItem>
                                Dashboard
                            </DropdownItem>
                        </Link>
                        <Link to="/" onClick={logout}>
                            <DropdownItem>
                                Logout
                            </DropdownItem>
                        </Link>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </nav>
        </header>
        <main>
        <div className='d-flex justify-content-center align-items-center align-self-center' style={{width: "auto", height: "90vh"}}>
            
            <Card className='bg-dark py-5'>
                <Row className='d-flex align-items-center align-self-center '>
                    <Col>
                        
                        <Form className='m-4' onSubmit={handleSubmit}>
                            <h3 className='text-muted py-3'>UPDATE PROFILE</h3>
                            <Row>
                                <Col>
                                    <Input className='mb-5' 
                                        type='text' 
                                        placeholder='Firstname' 
                                        name='fname'
                                        value={values.fname}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col>
                                    <Input className='mb-5' 
                                        type='text' 
                                        placeholder='Lastname' 
                                        name='lname'
                                        value={values.lname}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            <Input className='mb-5' 
                                type='email' 
                                placeholder='Email' 
                                name='email'
                                value={values.email}
                                disabled={true}
                                onChange={handleChange}
                            />
                            {/* <Input className='mb-2' 
                                type='password' 
                                placeholder='Password' 
                                name='password'
                                onChange={handleChange}
                            /> */}
                            <Button type='submit' block={true}>Update</Button>
                        </Form>
                        
                    </Col>

                    {/* <Col style={{color: "white"}}>
                        <h1>Welcome to South China Sea Conflict Chatbot</h1>
                    </Col> */}
                </Row>
            </Card>
        </div>
        </main>
        </html>
    )
}

export default Update