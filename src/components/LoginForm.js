import React, { useState } from 'react';
import { VERIFY_USER } from '../Events'

const LoginForm = ({ setUser, socket }) => {
	const [ nickname, setNickname ] = useState(""); 
	const [ error, setError ] = useState(""); 

	const setActualUser = ({user, isUser}) => {
		if(isUser) {
			setError("El nombre ya está en uso, por favor elige otro");
			return;
		}
		setError("")
		setUser(user);
	}

	const handleSubmit = (e)=>{
		e.preventDefault()
		socket.emit(VERIFY_USER, nickname, setActualUser)
	}

	const handleChange = (e)=>{
		setNickname(e.target.value);
	}

	return (
		<div className="login">
			<form onSubmit={handleSubmit} className="login-form" >

				<label htmlFor="nickname">
					<h2>Elige un nombre de usuario para ingresar!</h2>
				</label>
				<input
					type="text"
					id="nickname"
					value={nickname}
					onChange={handleChange}
					placeholder={'Escribe tu nombre aquí'}
					/>
					<div className="error">{error ? error:null}</div>
			</form>
		</div>
	);
}

export default LoginForm;
