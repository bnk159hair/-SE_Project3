import axios from 'axios';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    // 검색어 저장
    const [search, setSearch] = useState('');


    const onSearch = (e) => {
        e.preventDefault();

        // 검색어가 없는 경우 전체 리스트를 반환
        if(search === null || search === ''){
            axios.get("/api/users/search").then((res) => {
                
            });
        }
        else {
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
                        value=" "
                        style={{
                            "width": "38px",
                            "height": "38px",
                            "backgroundImage": "url('./images/glass.png')"
                        }}
                    />
                    </form>
            </div>
            
            <div className="container">
                <div className="category">Contact</div>
                <div className="category">Shop</div>
                <div className="category">Cart</div>
                <Link to='/login' className="category">Login</Link>
            </div>
        </div>
    );
}

export default NavBar;