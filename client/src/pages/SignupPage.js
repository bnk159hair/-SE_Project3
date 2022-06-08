import React, {useState} from 'react';
import axios from 'axios';

import './LoginPage.css';

const SignupPage = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [checkBoxActive, setCheckBoxActive] = useState(false);

    const isInputValid = userName.length >= 1 && phoneNumber.length >= 1;

    // email 주소 유효성 판단
    const isEmailValid = email.includes('@') && email.includes('.');

    // 비밀번호 유효성 판단
    const isPasswordValid = password.length >= 8;

    // 개인정보 약관 동의 여부 판단
    const isCheckBoxClicked = () =>{
        setCheckBoxActive(!checkBoxActive);
    }

    // 회원 가입 가능 여부 판단.
    const isSignUpButtonValid = isEmailValid && isPasswordValid && checkBoxActive;

    const onClickSignUp = () => {
        if(isSignUpButtonValid && (password === password2)){
            /*
            axios.post('/api/users/register', data={
                member_email: email,
                member_password: password,
                member_address: '',
                member_interest: '',
            })
            */
        }
        else{
            alert("개인정보가 올바르지 않습니다.");
        }
    }



    return (
        <div className='form-signup'>
            <form>
                <h2>회원가입</h2>
                <div className='InputMessage'>Name *</div>
                <input 
                className='text_field'
                type="text"
                placeholder='name'
                value={userName}
                onChange={(event) => {setUserName(event.target.value);}}
                required
                />

                <div className='InputMessage'>Email(ID) *</div>
                <input 
                className="text_field"
                type="email"
                placeholder='email' 
                value={email} 
                onChange={(event) => {setEmail(event.target.value);}} 
                required
                maxLength={20}
                />

                <div className='InputMessage'>Password *</div>
                <input 
                className="text_field"
                type='password'
                placeholder ='password' 
                value={password} 
                onChange={(event) => {setPassword(event.target.value);}}
                required 
                />

                <div className='InputMessage'>Password 중복 확인 *</div>
                <input 
                className="text_field"
                type='password'
                placeholder ='password를 다시 입력하세요' 
                value={password2} 
                onChange={(event) => {setPassword2(event.target.value);}}
                required 
                />

                <div className='InputMessage'>Phone Number *</div>
                <input 
                className="text_field"
                type="text"
                value={phoneNumber}
                onChange={(event) => {setPhoneNumber(event.target.value);}}
                required
                />

                <div className="agreeCheckBox">
                    <input type="checkbox" />
                    <span className="checkBoxContent">
                        광고성 메시지 수신에 동의합니다.
                    </span>
                    <input type="checkbox" 
                    onClick={isCheckBoxClicked}
                    />
                    <span className="checkBoxContent">
                        개인정보 수집에 동의합니다. *
                    </span>
                </div>
                <input 
                type='submit' 
                className= {isSignUpButtonValid ? 
                "signUpButtonValid" : "signUpButtonInValid"
                }
                value="회원 가입" 
                onClick={onClickSignUp}
                />
            </form>
        </div>
    );
}

export default SignupPage;