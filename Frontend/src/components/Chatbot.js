import "./chatBot.css";
import {useEffect, useState} from "react";
import {IoMdSend} from "react-icons/io";
import {useNavigate, Link} from "react-router-dom";
import {BiBot, BiUser} from "react-icons/bi";
import axios from "axios";
// import { useIdleTimer } from 'react-idle-timer'
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {db, auth} from "../firebase";
import {signOut} from "firebase/auth";
// import TimeTracker from 'react-time-tracker';

const offset = +8;
let firstRender = true;
// var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const date = new Date();
var dayName = new Date().toDateString();
const startTime = new Date().getTime();
// var endTime = ""
// var activeTime = ""

function Chatbot() {
	const navigate = useNavigate();
	const [chat, setChat] = useState([]);
	const [inputMessage, setInputMessage] = useState();
	const [botTyping, setbotTyping] = useState(false);

	const [user, setuser] = useState("");

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

		console.log(firstRender);
		getUID().then((user) => {
			if (firstRender) {
				firstRender = false;
				// console.log(user.email)
				setuser({user: user});
				setChat((chat) => [
					...chat,
					{sender: "bot", recipient_id: "dzil", msg: [`Hello ${user.displayName}`]},
					{sender: "bot", recipient_id: "dzil", msg: `Welcome to South China Sea Conflict Chatbot!`},
					// {sender: "bot", recipient_id: "dzil", msg: `Here I already provided some top asked questions/topic on the conflict:`,
					//     buttons: [
					//         {
					//             title: "History",
					//             payload: "/conflict"
					//         },
					//         {
					//             title: "Involved Country",
					//             payload: "/country"
					//         },
					//         {
					//             title: "South China Sea Area",
					//             payload: "/size"
					//         },
					//     ]
					// }
				]);
				// console.log(date.getTime())
				// sendRequest().then((data) => {
				//     // console.log(data.user)
				//     setuser(data.user)
				// })
			}
		});

		// console.log("called");
		// if(firstRender) {
		//     firstRender = false
		//     setChat(chat => [...chat, {sender: "bot", recipient_id: "shreyas", msg: "hello"}])
		//     // sendRequest().then((data) => {
		//     //     // console.log(data.user)
		//     //     setuser(data.user)
		//     // })
		// }

		const objDiv = document.getElementById("messageArea");
		objDiv.scrollTop = objDiv.scrollHeight;

		return () => {};
	}, [chat]);

	const resetFirstRender = async () => {
		const endTime = new Date().getTime();
		const activeTime = Math.ceil((endTime - startTime) / 100000);
		// console.log(endTime - startTime)

		// new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )

		console.log(`
        Day:   ${dayName}, dataType: ${typeof dayName}\n
        Start: ${startTime}, dataType: ${typeof startTime}\n
        End:   ${endTime}, dataType: ${typeof endTime}\n
        Total: ${(endTime - startTime) / 100000}, ${activeTime}, dataType: ${typeof activeTime}\n
        Email: ${user.user.email}
        `);

		await axios
			.post("http://localhost:5000/uploadAct", {
				email: user.user.email,
				date: dayName,
				timeSpent: activeTime,
			})
			.then((result) => {
				console.log(result);
				firstRender = true;
			});
	};

	const logout = async () => {
		firstRender = true;
		await signOut(auth);
	};

	const handleButton = (e, payload) => {
		e.preventDefault();
		// console.log(payload)
		setInputMessage(payload);
		const name = "dzil";
		const request_temp = {sender: "user", sender_id: name, msg: payload};

		if (payload !== "") {
			setChat((chat) => [...chat, request_temp]);
			setbotTyping(true);
			setInputMessage("");
			rasaAPI(name, payload);
		} else {
			window.alert("Please enter valid message");
		}
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		const name = "dzil";
		const request_temp = {sender: "user", sender_id: name, msg: inputMessage};

		if (inputMessage !== "") {
			setChat((chat) => [...chat, request_temp]);
			setbotTyping(true);
			setInputMessage("");
			rasaAPI(name, inputMessage);
		} else {
			window.alert("Please enter valid message");
		}
	};

	const [buttonState, setButtonState] = useState(false);

	const handleButtonState = () => {
		setButtonState({buttonState: !buttonState});
	};

	const rasaAPI = async function handleClick(name, msg) {
		//chatData.push({sender : "user", sender_id : name, msg : msg});

		// console.log(msg)

		await fetch("http://localhost:5005/webhooks/rest/webhook", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				charset: "UTF-8",
			},
			credentials: "same-origin",
			body: JSON.stringify({sender: name, message: msg}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response) {
					console.log(response);
					const temp = response[0];
					const image = response.map((element) => {
						if (Object.keys(element)[1] === "image") {
							var img = element.image;
							return img;
						}
					});
					const button = temp["buttons"];
					const recipient_id = temp["recipient_id"];
					const recipient_msg = temp["text"];

					const response_temp = {sender: "bot", recipient_id: recipient_id, msg: recipient_msg, btn: button, img: image[1]};
					setbotTyping(false);

					setChat((chat) => [...chat, response_temp]);
					// scrollBottom();
				}
			});
	};

	// console.log(dayName);

	const stylecard = {
		maxWidth: "35rem",
		border: "1px solid black",
		paddingLeft: "0px",
		paddingRight: "0px",
		borderRadius: "10px",
		boxShadow: "0 16px 20px 0 rgba(0,0,0,0.4)",
	};
	const styleHeader = {
		height: "5.5rem",
		borderBottom: "1px solid black",
		borderRadius: "10px 10px 0px 0px",
		// backgroundColor: '#8012c4',
	};
	const styleFooter = {
		//maxWidth : '32rem',
		borderTop: "1px solid black",
		borderRadius: "0px 0px 10px 10px",
		// backgroundColor: '#8012c4',
	};
	const styleBody = {
		paddingTop: "10px",
		height: "28rem",
		overflowY: "a",
		overflowX: "hidden",
	};

	return (
		<html>
			<header>
				<nav className="position-sticky navbar navbar-expand bg-dark">
					<div className="container-fluid">
						<a className="navbar-brand ">South China Sea Conflict Chatbot</a>
						{/* <div>
                    <Link to="/dashboard">
                        <Button className='mx-2' size='sm' name='login' onClick={resetFirstRender}>Dashboard</Button>
                    </Link>
                    <Link to="/update">
                        <Button className='mx-2' size='sm' name='register' onClick={resetFirstRender}>Update</Button>
                    </Link>
                    <Link to="/">
                        <Button className='mx-2' size='sm' name='register' onClick={logout}>Logout</Button>
                    </Link> */}
						{/* <Button className='mx-2' size='sm' name='login' onClick={navigateButton}>Login</Button>
                    <Button className='mx-2' size='sm' name='register' onClick={navigateButton}>Register</Button> */}
						{/* </div> */}

						<Dropdown isOpen={buttonState} onClick={handleButtonState}>
							<DropdownToggle size="sm">Menu</DropdownToggle>

							<DropdownMenu dark end>
								<Link to="/dashboard" onClick={resetFirstRender}>
									<DropdownItem>Dashboard</DropdownItem>
								</Link>
								<Link to="/update" onClick={resetFirstRender}>
									<DropdownItem>Profile</DropdownItem>
								</Link>
								<Link to="/" onClick={logout}>
									<DropdownItem>Logout</DropdownItem>
								</Link>
							</DropdownMenu>
						</Dropdown>
					</div>
				</nav>
			</header>
			<main>
				<div className="d-flex justify-content-center align-items-center align-self-center" style={{width: "auto", height: "90vh"}}>
					{/* <TimeTracker onSave={this.onSave} /> */}
					{/* <button onClick={()=>rasaAPI("shreyas","hi")}>Try this</button> */}

					<div className="container">
						<div className="row justify-content-center">
							<div className="card" style={stylecard}>
								<div className="cardHeader text-white text-center pt-2 bg-dark" style={styleHeader}>
									<h1 style={{marginBottom: "0px"}}>SCSC Chatbot</h1>
									{botTyping ? <h6>Bot Typing....</h6> : null}
								</div>
								<div className="cardBody" id="messageArea" style={styleBody}>
									<div className="row msgarea">
										{chat.map((user, key) => (
											<div key={key}>
												{user.sender === "bot" ? (
													<div>
														<div>
															{typeof user.img === "undefined" ? (
																""
															) : (
																<img style={{marginLeft: "60px", marginBottom: "10px"}} width={"350px"} src={user.img} alt="img" />
															)}
														</div>
														<div className="msgalignstart">
															<BiBot className="botIcon" />
															<h5 className="botmsg">{user.msg}</h5>
														</div>
														<div style={{paddingLeft: "55px", marginBottom: "2rem", marginTop: "1px", maxWidth: "20rem"}}>
															{typeof user.btn === "undefined"
																? ""
																: user.btn.map((element, index) => {
																		return (
																			<Button
																				key={index}
																				style={{marginRight: "1rem", marginTop: "1rem"}}
																				onClick={(e) => handleButton(e, element.payload)}
																			>
																				{element.title}
																			</Button>
																		);
																  })}
														</div>
													</div>
												) : (
													<div className="msgalignend">
														<h5 className="usermsg">{user.msg}</h5>
														<BiUser className="userIcon" />
													</div>
												)}
											</div>
										))}
									</div>
								</div>
								<div className="cardFooter text-white bg-dark" style={styleFooter}>
									<div className="row">
										<form style={{display: "flex"}} onSubmit={handleSubmit}>
											<div className="col-10" style={{paddingRight: "0px"}}>
												<input onChange={(e) => setInputMessage(e.target.value)} value={inputMessage} type="text" className="msginp"></input>
											</div>
											<div className="col-2 cola pl-3" style={{paddingLeft: "10px"}}>
												<button type="submit" className="circleBtn pl-5" style={{color: "white"}}>
													<IoMdSend className="sendBtn" />
												</button>
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
