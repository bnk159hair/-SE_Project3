import React, {useState, useEffect} from 'react';
import './App.css';

import ProductInfo from './components/ProductInfo';
import NavBar from './components/NavBar';
import MainImage from './components/MainImage';

function Main() {
    /*
    // 아래와 같이 useEffect 함수를 이용하면, 원하는 변수의 state에 따라서만
    // useEffect의 인자로 받은 함수를 실행한다.
    useEffect(() => {
        console.log(count);
    }, [count]);
    console.log('rendering');
    */
    return (
        <div className="App">
            <NavBar imageLink="./images/glass.png"/>
            <MainImage />

            <div className="productList">
                <ProductInfo imageLink="./images/logo192.png" productName="samsung" date="2022/04/05" />
                <ProductInfo imageLink="./images/logo192.png" productName="apple" date="2001/03/01" /> 
                <ProductInfo imageLink="./images/logo192.png" productName="korea" date="2021/03/01" />
                <ProductInfo imageLink="./images/logo192.png" productName="korea" date="2021/03/01" />       
            </div>
            
        </div>
    );
}

// 다른 곳에서 import 해서 사용하기 위해서 export 해줘야 한다.
export default Main;
