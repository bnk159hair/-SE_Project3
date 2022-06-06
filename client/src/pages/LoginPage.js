import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import './LoginPage.css';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onClickLogin = () => {
        console.log("Login button clicked!");
        alert('hello');
        console.log(email, password);
        alert(email);
        axios.post('/api/users/login', {
               member_email: email,
               member_password: password
            }
        )
        .then(function(res) {
                if(res.loginSuccess) {
                    // 로그인에 성공한 경우 id를 출력
                    console.log(res.userId);
                    return <Redirect to='/' />
                }
                else{
                    // 로그인에 실패한 경우 메시지를 출력
                    alert(res.message);
                }
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