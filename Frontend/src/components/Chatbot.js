import './chatBot.css';
import { useEffect, useState } from 'react';
import {IoMdSend}  from 'react-icons/io';
import { useNavigate, Link } from 'react-router-dom'
import {BiBot,BiUser} from 'react-icons/bi';
import axios from 'axios'
import {Button} from 'reactstrap'
import { db, auth } from "../firebase";

let firstRender = true

function Chatbot(){

    const navigate = useNavigate()
    const [chat,setChat] = useState([]);
    const [inputMessage,setInputMessage] = useState('');
    const [botTyping,setbotTyping] = useState(false);

    // const sendRequest = async() => {
    //     const res = await axios.get('http://localhost:5000/api/user', {
    //         withCredentials: true
    //     }).catch(err => console.log(err))

    //     const data = await res.data
    //     return data
    // }

    const [user, setuser] = useState()

    
    useEffect(()=>{

        function getUID() {
            return new Promise((resolve) => {
              const user = auth.currentUser;
              if (user) {
                console.log(user)
                resolve(user);
              } else {
                navigate("/");
              }
            });
        }

        getUID()
            .then((user) => {
                console.log(user.displayName)
                if(firstRender) {
                    firstRender = false
                    setChat(chat => [...chat, {sender: "bot", recipient_id: "shreyas", msg: `Hello ${user.displayName}`}])
                    // sendRequest().then((data) => {
                    //     // console.log(data.user)
                    //     setuser(data.user)
                    // })
                }
            })
   
        console.log("called");
        // if(firstRender) {
        //     firstRender = false
        //     setChat(chat => [...chat, {sender: "bot", recipient_id: "shreyas", msg: "hello"}])
        //     // sendRequest().then((data) => {
        //     //     // console.log(data.user)
        //     //     setuser(data.user)
        //     // })
        // }

        const objDiv = document.getElementById('messageArea');
        objDiv.scrollTop = objDiv.scrollHeight;
        
    
    },[chat])

    


    const handleSubmit=(evt)=>{
        evt.preventDefault();
        const name = "shreyas";
        const request_temp = {sender : "user", sender_id : name , msg : inputMessage};
        
        if(inputMessage !== ""){
            
            setChat(chat => [...chat, request_temp]);
            setbotTyping(true);
            setInputMessage('');
            rasaAPI(name,inputMessage);
        }
        else{
            window.alert("Please enter valid message");
        }
        
    }


    const rasaAPI = async function handleClick(name,msg) {
    
        //chatData.push({sender : "user", sender_id : name, msg : msg});
        
        // console.log(msg)

          await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'charset':'UTF-8',
            },
            credentials: "same-origin",
            body: JSON.stringify({ "sender": name, "message": msg }),
        })
        .then(response => response.json())
        .then((response) => {
            if(response){
                console.log(response)

                const temp = response[0];
                const recipient_id = temp["recipient_id"];
                const recipient_msg = temp["text"];        


                const response_temp = {sender: "bot",recipient_id : recipient_id,msg: recipient_msg};
                setbotTyping(false);
                
                setChat(chat => [...chat, response_temp]);
               // scrollBottom();

            }
        }) 
    }

    // console.log(chat);

    const stylecard = {
        maxWidth : '35rem',
        border: '1px solid black',
        paddingLeft: '0px',
        paddingRight: '0px',
        borderRadius: '10px',
        boxShadow: '0 16px 20px 0 rgba(0,0,0,0.4)'

    }
    const styleHeader = {
        height: '4.5rem',
        borderBottom : '1px solid black',
        borderRadius: '10px 10px 0px 0px',
        // backgroundColor: '#8012c4',

    }
    const styleFooter = {
        //maxWidth : '32rem',
        borderTop : '1px solid black',
        borderRadius: '0px 0px 10px 10px',
        // backgroundColor: '#8012c4',
        
        
    }
    const styleBody = {
        paddingTop : '10px',
        height: '28rem',
        overflowY: 'a',
        overflowX: 'hidden',
        
    }

    return (
        <html>
        <header>
        <nav className='position-sticky navbar navbar-expand bg-dark'>
            <div className='container-fluid'>
                <a className='navbar-brand ' href='/#'>South China Sea Conflict Chatbot</a>
                <div>
                    <Link to="/dashboard">
                        <Button className='mx-2' size='sm' name='login'>Dashboard</Button>
                    </Link>
                    <Link to="/">
                    <Button className='mx-2' size='sm' name='register'>Logout</Button>
                    </Link>
                    {/* <Button className='mx-2' size='sm' name='login' onClick={navigateButton}>Login</Button>
                    <Button className='mx-2' size='sm' name='register' onClick={navigateButton}>Register</Button> */}
                </div>
            </div>
        </nav>
        </header>
        <main>
        <div className='d-flex justify-content-center align-items-center align-self-center' style={{width: "auto", height: "90vh"}}>
        {/* <button onClick={()=>rasaAPI("shreyas","hi")}>Try this</button> */}
        

        <div className="container">
        <div className="row justify-content-center">
            
                <div className="card" style={stylecard}>
                    <div className="cardHeader text-white text-center pt-2 bg-dark" style={styleHeader}>
                        <h1 style={{marginBottom:'0px'}}>SCSC Chatbot</h1>
                        {botTyping ? <h6>Bot Typing....</h6> : null}
                        
                        
                        
                    </div>
                    <div className="cardBody" id="messageArea" style={styleBody}>
                        
                        <div className="row msgarea">
                            {chat.map((user,key) => (
                                <div key={key}>
                                    {user.sender==='bot' ?
                                        (
                                            
                                            <div className= 'msgalignstart'>
                                                <BiBot className="botIcon"  /><h5 className="botmsg">{user.msg}</h5>
                                            </div>
                                        
                                        )

                                        :(
                                            <div className= 'msgalignend'>
                                                <h5 className="usermsg">{user.msg}</h5><BiUser className="userIcon" />
                                            </div>
                                        )
                                    }
                                </div>
                            ))}
                            
                        </div>
                
                    </div>
                    <div className="cardFooter text-white bg-dark" style={styleFooter}>
                        <div className="row">
                            <form style={{display: 'flex'}} onSubmit={handleSubmit}>
                                <div className="col-10" style={{paddingRight:'0px'}}>
                                    <input onChange={e => setInputMessage(e.target.value)} value={inputMessage} type="text" className="msginp"></input>
                                </div>
                                <div className="col-2 cola pl-3" style={{paddingLeft: "10px"}}>
                                    <button type="submit" className="circleBtn pl-5" style={{color: "white"}} ><IoMdSend className="sendBtn" /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            
        </div>
        </div>

      </div>
      </main>
      </html>
    );
}
  
export default Chatbot;
