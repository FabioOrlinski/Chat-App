import React, { useState } from 'react';
import MdEject from 'react-icons/lib/md/eject'
import SideBarOption from './SideBarOption'
import { last, get, differenceBy } from 'lodash' 
import { createChatNameFromUsers } from '../../Factories'

const SideBar = ({onSendPrivateMessage, chats, activeChat, user, setActiveChat, logout, users}) => {
	const [ activeSideBar, setActiveSideBar] = useState("chats");

	const addChatForUser = (reciever) => {
		onSendPrivateMessage(reciever);
		setActiveSideBar("chats");
	}

	return (
		<div id="side-bar">
				<div className="heading">
					<div className="app-name">Sistemas Opeativos</div>
				</div>
				<div className="side-bar-select">
					<div 
						onClick = { ()=>{ setActiveSideBar("chats") } }
						className={`side-bar-select__option ${ activeSideBar === "chats" ? 'active':''}`}>
						<span>Chats</span>
					</div>
					<div 
						onClick = { ()=>{ setActiveSideBar("users") } }
						className={`side-bar-select__option ${ activeSideBar === "users" ? 'active':''}`}>
						<span>Usuarios</span>
					</div>
				</div>
				<div 
					className="users">
					{
					activeSideBar === "chats"
					? chats.map((chat)=>{
							return(
							<SideBarOption 
								key = {chat.id}
								lastMessage = { get(last(chat.messages), 'message', '') }
								name = { chat.isCommunity ? "Grupal" : createChatNameFromUsers(chat.users, user.name) }
								active = { activeChat && activeChat.id === chat.id }
								onClick = { ()=>{ setActiveChat(chat) } }
							/>
						)
					})	
					: differenceBy(users, [user], 'name').map((user)=>{
							return <SideBarOption 
								key = { user.id }
								name = { user.name }
								onClick = { ()=>{ addChatForUser(user.name) }  }
							/>
						})
					}
				</div>
				<div className="current-user">
					<span>{user.name}</span>
					<div onClick={()=>{logout()}} title="Logout" className="logout">
						<MdEject/>	
					</div>
				</div>
		</div>
	);


}

export default SideBar;