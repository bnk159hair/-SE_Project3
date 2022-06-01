import React from 'react';

const NavBar = () => {

    const clickSearchButton = () => {
        console.log("클리크!");
        alert("클리크!");
    }
    return (
        <div className="nav-bar">
            <div className="nav-head">
                <div
                style={{
                    "font-size": "25px",
                    "font-weight": "700"
                }}>
                    JUNGGO NARA
                </div>

                <input type="text"
                placeholder="검색어를 입력하게나"
                style={{
                    "margin-left": "50px",
                    "width": "250px",
                    "height": "32px"
                }}
                />
                <span className="search-button">
                    <img 
                    src="./images/돋보기.png"
                    onClick={clickSearchButton}
                    height="38px"
                    width="38px"
                    />
                </span>
                
            </div>
            <div className="container">
                <div className="item">Contact</div>
                <div className="item">Shop</div>
                <div className="item">Cart</div>
                <div className="item">Login</div>
            </div>
        </div>
    );
}

export default NavBar;