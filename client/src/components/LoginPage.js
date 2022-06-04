import React, {useEffect, useState} from 'react';
import './LoginPage.css';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onClickLogin = () => {
        alert(email);
        // 여기서 아이디와 비밀번호를 확인하는 로직 구현해야.
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
                <a href="">비밀번호를 혹시 잊으셨나요??</a>
            </div>
            
        </div>
    );
}

export default Login;