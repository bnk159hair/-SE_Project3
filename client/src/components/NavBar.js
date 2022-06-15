import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';

import {Cookies} from 'react-cookie';

import { Link } from 'react-router-dom';
import { setIsMain, getIsMain } from '../pages/List';
import ProductInfo from './ProductInfo';

const cookies = new Cookies();


// 최대 100개의 검색 결과를 저장한다.
const searchList = [];
var length = 0;



const returnList = () => {
    console.log(searchList);
    return (
        <>
        <div className="productList">
            {searchList}
        </div>
        </>
    )
}

const NavBar = () => {
    // 검색어 저장
    const [search, setSearch] = useState('');
    const [loginCookie, setLoginCookie] = useState(cookies.get('login'));
    
    const navigate = useNavigate();

    const onSearch = (e) => {
        // button 클릭후 페이지 초기화면으로의 이동을 막아줍니다.
        e.preventDefault();
        
        // 검색어가 없는 경우 전체 리스트를 반환
        if(search === null || search === ''){
            alert('검색어를 입력하세요.');
            alert(loginCookie);
            setIsMain(true);
        }
        else {
            // params 이용해서 search word를 넘겨준다.
            axios.post('/api/users/search', {
                searchwd: search
            }).then((res) => {
                // 상품 정보 가져오는 부분 아직 미구현
                console.log(res.data.rows[0]);
                alert(res.data.rows[0].product_title);
                length = res.data.rows.length;
                // 이전의 검색 목록을 비워준다.
                for (var step = 0; step < searchList.length; step++){
                    searchList.pop();
                }
                // 새로운 검색 내용을 채워준다.
                for (var step = 0; step < length; step++){
                    console.log(res.data.rows[step]);
                    
                    searchList.push(
                        <ProductInfo id={res.data.rows[step].produt_id} imageLink="./images/logo192.png" productName={res.data.rows[step].product_title} name={res.data.rows[step].product_saler} productInterest={res.data.rows[step].product_interest} price={res.data.rows[step].product_price}/>
                    );
                    console.log(searchList);
                }
                console.log('move to search tap');
                navigate('/search', { replace: true });
            });
        }
    }

    const onChangeSearch = (e) =>{
        e.preventDefault();
        setSearch(e.target.value);
    }

    const clickSell = () =>{
        if(loginCookie === false){
            alert('로그인부터 하십쇼!');
        }
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
                <Link to="/" className="category">Home</Link>
                <Link to="/contact" className="category">Contact</Link>
                <div className="category">Cart</div>
                <Link to={loginCookie ? '/sellpage' : '/login'} className="category" onClick={clickSell}>Sell</Link>
                <Link to={loginCookie ? '/mypage' : '/login'} className="category">
                    {loginCookie ? "My Page" : "Login"}
                </Link>
            </div>
            
        </div>
    );
}

export default NavBar;
export {returnList};