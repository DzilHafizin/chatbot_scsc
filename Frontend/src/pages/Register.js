import React, { useEffect, useState } from 'react'
import {
    Form,
    Input,
    Button,
    Row
} from 'reactstrap'
import { useAppContext } from '../redux/appContext'
import { useNavigate } from 'react-router-dom'

const initialState = {
    name: '',
    email: '',
    pass: '',
    isReg: true
}

const Register = () => {

    const [value, setValue] = useState(initialState)

    const { registerUser, user } = useAppContext()

    const navigate = useNavigate()

    const toggleIsReg = () => {
        setValue({...value, isReg: !value.isReg})
    }

    const handleInputChange = (e) => {
        setValue({...value, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const { name, email, pass, isReg } = value

        if(!email || !pass || (!isReg && !name)) {
            return
        }

        const currUser = { name, email, pass }

        if(isReg) {
            console.log("Already Registered")
        }
        else {
            registerUser(currUser)
        }
    }

    useEffect(() => {

        if(user) {
            setTimeout(() => {

                navigate('/')

            }, 3000)
        }

    },{user, navigate})

    return (
        <div>

            <Form onSubmit={handleSubmit}>
                    {!value.isReg ? <h1>Register</h1> : <h1>Login</h1>}

                    {!value.isReg ?
                        <Input 
                            type='text' 
                            value={value.name} 
                            placeholder="Name"
                            name='name' 
                            onChange={handleInputChange}
                        /> : ""
                    }

                    <Input 
                        type='email' 
                        value={value.email} 
                        placeholder="Email"
                        name='email' 
                        onChange={handleInputChange}
                    />

                    <Input 
                        type='password' 
                        value={value.pass} 
                        placeholder="Password"
                        name='pass' 
                        onChange={handleInputChange}
                    />

                    <Button block={true} type='submit'>{!value.isReg ? 'Register' : 'Login' }</Button>

                    <p>
                        {!value.isReg ? 'Already registered ?' : 'Not registered yet ?'}

                        <Button className='m-3' size='sm' type='button' onClick={toggleIsReg}>
                            {!value.isReg ? 'Login here' : 'Register here'}
                        </Button>
                    </p>
            </Form>

        </div>
    )
}

export default Register