import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Card,
    CardTitle,
    CardBody,
    Form,
    Row,
    Col,
    Input,
    Button
} from 'reactstrap'

let firstRender = true

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Time Usage per Day',
      },
    },
  };

  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  export const data1 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 16, 6, 3, 4, 5, 8],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

export const data = {
    labels: ['History', 'Conflicts', 'Countries', 'Greet', 'About', 'Farewell'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

const Dashboard = () => {

    const [user, setuser] = useState()

    const refreshToken = async() => {
        const res = await axios.get("http://localhost:5000/api/refresh", {
            withCredentials: true
        }).catch(err => console.log(err))

        const data = await res.data
        return data
    }

    const sendRequest = async() => {
        const res = await axios.get('http://localhost:5000/api/user', {
            withCredentials: true
        }).catch(err => console.log(err))

        const data = await res.data
        return data
    }

    useEffect(() => {
        if(firstRender) {
            firstRender = false
            sendRequest().then((data) => {
                console.log(data.user)
                setuser(data.user)
            })
        }
        
    },[])

    return (
        <html>
        <header>
        <nav className='position-sticky navbar navbar-expand bg-dark'>
            <div className='container-fluid'>
                <a className='navbar-brand ' href='/#'>South China Sea Conflict Chatbot</a>
                <div>
                    <Link to="/chatbot">
                        <Button className='mx-2' size='sm' name='login'>Chatbot</Button>
                    </Link>
                    <Link to="/login">
                    <Button className='mx-2' size='sm' name='register'>Logout</Button>
                    </Link>
                    {/* <Button className='mx-2' size='sm' name='login' onClick={navigateButton}>Login</Button>
                    <Button className='mx-2' size='sm' name='register' onClick={navigateButton}>Register</Button> */}
                </div>
            </div>
        </nav>
        </header>
        <body>
        <div className='d-flex justify-content-center align-items-center align-self-center' style={{width: "auto", height: "90vh"}}>
            <Card className='text-center text-white bg-dark'>
                <h1 className='mt-4'>Dashboard</h1>
            <Row className='m-5'>
                {/* <Col>
                    <Card className='text-center' 
                    style={{height: "30rem"}}
                    >
                        <CardTitle style={{color: "black"}}>Intent occurences</CardTitle>
                        <CardBody>
                        <Doughnut data={data} />
                        </CardBody>
                    </Card>
                </Col> */}
                <Col>
                    <Card className='text-center' 
                    style={{height: "480px", width: "600px"}}
                    >
                        <CardTitle style={{color: "black"}}>Activity Time Usage</CardTitle>
                        <CardBody>
                        <Bar options={options} data={data1} /></CardBody>
                    </Card>
                </Col>
            </Row>
            </Card>
        </div>
        </body>
        </html>
    )
}

export default Dashboard