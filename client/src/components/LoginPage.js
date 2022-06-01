import React, {useEffect, useState} from 'react';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    

    return(
        <div>
            <form className="form-signin">
                <h2>Please Sign In!!</h2>
                <input 
                type="email"
                placeholder='email' 
                value={email} 
                onChange={(event)=>{setEmail(event.target.value);}} 
                />
                <br />
                <input 
                email='password'
                placeholder ='password' 
                value={password} 
                onChange={(event)=>{setPassword(event.target.value);}} 
                />
                <br />
                <button type='submit'>Login!!</button>
            </form>
            
        </div>
    );
}

export default Login;