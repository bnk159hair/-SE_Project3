import axios from 'axios';
import React, {useState} from 'react';
import {Cookies} from 'react-cookie';

import { Link } from 'react-router-dom';

const cookies = new Cookies();

const NavBar = () => {
    // 검색어 저장
    const [search, setSearch] = useState('');

    const loginCookie = cookies.get('login')

    const onSearch = (e) => {
        // button 클릭후 페이지 초기화면으로의 이동을 막아줍니다.
        e.preventDefault();
        // cookie 가져오기 성공
        alert(loginCookie);
        
        // 검색어가 없는 경우 전체 리스트를 반환
        if(search === null || search === ''){
            alert('검색어를 입력하세요.');
        }
        else {
            // params 이용해서 search word를 넘겨준다.
            axios.post('/api/users/search', {
                searchwd: search
            }).then((res) => {
                // 상품 정보 가져오는 부분 아직 미구현
                alert(res.data.success);
            });
        }
    }

    const onChangeSearch = (e) =>{
        e.preventDefault();
        setSearch(e.target.value);
    }

    return (
        <div className="nav-bar">
            <div className="nav-head">
                <form onSubmit={e => onSearch(e)}>
                <Link to='/'
                style={{
                    "font-size": "25px",
                    "font-weight": "700",
                    "text-decoration": "none",
                    "color": "black"
                }}>
                    JUNGGO NARA
                </Link>
                    <input type="text"
                    placeholder="검색어를 입력하세요"
                    style={{
                        "margin-left": "50px",
                        "margin-right": "2px",
                        "width": "250px",
                        "height": "32px"
                    }}
                    name="searchwd"
                    value={search}
                    onChange={onChangeSearch}
                    />
                    <input 
                        className="search-button"
                        type='submit'
                        value='❔'
                        style={{
                            "width": "38px",
                            "height": "38px",
                            "background-color": "black",
                            "color": "white"
                        }}
                    />
                    </form>
            </div>
            
            <div className="container">
                <Link to="/contact" className="category">Contact</Link>
                <div className="category">Shop</div>
                <div className="category">Cart</div>
                <Link to='/login' className="category">Login</Link>
            </div>
        </div>
    );
}

export default NavBar;