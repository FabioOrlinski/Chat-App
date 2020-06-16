import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../Events'
import LoginForm from './LoginForm'
import ChatContainer from './chats/ChatContainer'

const socketUrl = "http://localhost:3231"

const Layout = () => {
	const [socket, setSocket ] = useState(null);
	const [user, setUser ] = useState(null);

	useEffect(() => {
		initSocket();
	},[])

	const initSocket = ()=>{
		const newSoket = io(socketUrl)
		newSoket.on('connect', ()=>{
			if(user) {
				reconnect(newSoket);
			} else {
				console.log("Connected");
			}
		})
		setSocket(newSoket);
	}

	const reconnect = (newSoket) => {
		newSoket.emit(VERIFY_USER, user.name, ({isUser, user}) => {
			if(isUser) {
				setUser(null);
			} else {
				setUser(user);
			}
			
		})
	}

	const setActualUser = (actualUser)=>{
		socket.emit(USER_CONNECTED, actualUser);
		setUser(actualUser);
	}

	const logout = ()=>{
		socket.emit(LOGOUT);
		setUser(null);
	}

	return (
		<div className="container">
			{ !user
			? <LoginForm socket={socket} setUser={setActualUser} />
			: <ChatContainer socket={socket} user={user} logout={logout}/> }
		</div>
	);

}

export default Layout;