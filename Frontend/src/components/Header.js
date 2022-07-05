import React from 'react'
import { Link } from 'react-router-dom'
import {
    Button
} from 'reactstrap'

const Header = () => {

    // const navigate = useNavigate()

    // const navigateButton = (e) => {
    //     e.preventDefault()
    //     navigate('/register')
    // }

  return (
    <nav className='position-sticky navbar navbar-expand bg-dark'>
        <div className='container-fluid'>
            <a className='navbar-brand ' href='/#'>South China Sea Conflict Chatbot</a>
            <div>
                <Link to="/">
                    <Button className='mx-2' size='sm' name='login'>Chatbot</Button>
                </Link>
                <Link to="/register">
                <Button className='mx-2' size='sm' name='register'>Logout</Button>
                </Link>
                {/* <Button className='mx-2' size='sm' name='login' onClick={navigateButton}>Login</Button>
                <Button className='mx-2' size='sm' name='register' onClick={navigateButton}>Register</Button> */}
            </div>
        </div>
    </nav>
  )
}

export default Header