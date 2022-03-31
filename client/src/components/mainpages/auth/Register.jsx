import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [user, setUser] = useState({name:'', email: '', password: '', repeatPassword: '' });
    
    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user});
    
            localStorage.setItem('firstLogin', true);
    
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg);
        }
    }
    
    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <input type="text" name="name" required placeholder="Usuário" value={user.name} onChange={onChangeInput} />
                <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} />
                <input type="password" name="password" required placeholder="Senha" value={user.password} autoComplete="on" onChange={onChangeInput} />
                <input type="password" name="repeatPassword" required placeholder="Repita a senha" value={user.repeatPassword} autoComplete="on" onChange={onChangeInput} />
                <div className="row">
                    <button type="submit">Registrar</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;