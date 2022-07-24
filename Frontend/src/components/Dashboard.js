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
import { signOut } from "firebase/auth";
import { 
  // Doughnut, 
  Bar 
} from 'react-chartjs-2';
import {
    Card,
    CardTitle,
    CardBody,
    // Form,
    Row,
    Col,
    // Input,
    // Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap'
import { db, auth } from "../firebase";

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

  const data1 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 16, 6, 3, 4, 5, 8],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

// export const data = {
//     labels: ['History', 'Conflicts', 'Countries', 'Greet', 'About', 'Farewell'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

const Dashboard = () => {

  const navigate = useNavigate()
  const [user, setuser] = useState("")
  const [label, setlabel] = useState([])
  const [datas, setdata] = useState({
    labels: [],
    datasets: [
      {
        label: "Minutes",
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  })

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

    const [buttonState, setButtonState] = useState(false)

    const handleButtonState = () => {
      setButtonState({buttonState: !buttonState})
    }

    const logout = async() => {
      await signOut(auth);
    }

    const data2 = {
      labels: label,
      datasets: [
        {
          label: 'Minutes',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

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
        if(firstRender) {
          firstRender = false
          console.log(user.email)
          setuser({user: user})
        }

        await axios.post('http://localhost:5000/getData', {email: user.email})
        .then((response) => {
          const label = response.data.map(element => {
            return element.dayName
          })
          const data = response.data.map(element => {
            return element.timeSpent
          })

          setdata(prev => ({
            ...prev,
            labels: label,
            datasets: [{
              label: 'Minutes',
              data: data
            }]
          }))
          // setdata({data: data})
          // setlabel({label: label})
        })
      })
      .catch((err) => {
        console.log(err)
      })
        
    },[])

    return (
        <html>
        <header>
        <nav className='position-sticky navbar navbar-expand bg-dark'>
            <div className='container-fluid'>
                <a className='navbar-brand '>South China Sea Conflict Chatbot</a>
                {/* <div>
                    <Link to="/chatbot">
                        <Button className='mx-2' size='sm' name='login'>Chatbot</Button>
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
                        <Link to="/update">
                            <DropdownItem>
                                Profile
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
                        <Bar options={options} data={datas} /></CardBody>
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