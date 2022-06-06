import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './LoginPage.css';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onClickLogin = () => {
        console.log("Login button clicked!");
        console.log(email, password);

        axios.get('/api').then(res =>
            {
                console.log(res);
            });

        axios.post('/api/users/login', null, {
            params: {
               'member_email': email,
               'member_password': password
            }
        })
        .then(
            res=>{
                console.log(res);
                console.log('')
            }
        )
    }

    return(
        <div className="form-signin">
            <form>
                <h2>로그인</h2>
                <input 
                className="text_field"
                type="email"
                placeholder='email' 
                value={email} 
                onChange={(event)=>{setEmail(event.target.value);}} 
                />
                <input 
                className="text_field"
                type='password'
                placeholder ='password' 
                value={password} 
                onChange={(event)=>{setPassword(event.target.value);}} 
                />
                <input 
                type='submit' 
                className="submit_btn" 
                value="Login!" 
                onClick={onClickLogin}
                />
            </form>
            <div class="link">
                <a href="">회원가입을 혹시 하고싶으신가요??</a>
                <br />
                <a href="">비밀번호를 혹시 잊으셨나요??</a>
            </div>
            
        </div>
    );
}

export default Login;