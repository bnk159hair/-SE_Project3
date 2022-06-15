import React from 'react';
import { useNavigate } from 'react-router';
import {getCookie, setCookie} from '../cookie/Cookie.js'

const LogoutPage = () => {

    const navigate = useNavigate();

    const onClick = (e) => {
        e.preventDefault();
        setCookie('login', false);
        setCookie('id', '');
        setCookie('password', '');
        navigate('/', {replace: true});
    }

    return (
        <div className="form-signin">
            <form>
            <button onClick={() => {
                navigate('/', { replace: true });
            }}
            className="moveToHome"
            style={{
                "border": "none",
                "border-radius": "5px",
                "background-color": "silver",
                "color": "white",
                "padding": "5px"
            }}>
                {"<< Home"}
            </button>
            <br /><br /><br />
            <div>
                정말 로그아웃 하실건가요?? <br/> <br />{getCookie('id')}님??<br /><br />
            </div>

                <input
                    type='submit'
                    className="submit_btn"
                    value="Logout!"
                    onClick={onClick}
                />
            </form>
        </div>
    )
}

export default LogoutPage;