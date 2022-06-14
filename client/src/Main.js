import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';

import './App.css';

import ProductInfo from './components/ProductInfo';
import NavBar from './components/NavBar';
import MainImage from './components/MainImage';
import Info from './components/Info';
import axios from 'axios';
import {setInfo, getInfo} from './pages/List';

const Main = () => {
    const [isUpdate, setIsUpdate] = useState(false);

    //var information = Array(15);

    useEffect(() => {
        axios.get('/api')
        .then(function(res){
            const length = res.data.rows.length;
            console.log('length: ', length);

            for (var step = 0; step < length; step++){
                console.log(res.data.rows[step]);

                setInfo(step, res.data.rows[step]);
            }
            setIsUpdate(true);
            console.log(getInfo(2));
            console.log("is update?", isUpdate);
        });
    }, []);

    return (
        <div>
            <div className="App">
                <NavBar imageLink="./images/glass.png"/>
                <MainImage imageSrc="./images/background1.png" />

                <h2 className="listName">- BEST</h2>
                <div className="productList">
                    <ProductInfo id={ isUpdate ? getInfo(0).product_id : 0 }imageLink="./images/logo192.png" productId="1" productName={isUpdate ? getInfo(0).product_title : "default"} name={isUpdate ? getInfo(0).product_saler : ""} productInterest={isUpdate ? getInfo(0).product_interest : 0} price={isUpdate ? getInfo(0).product_price : 0}/>
                    <ProductInfo id={ isUpdate ? getInfo(1).product_id : 0 }imageLink="./images/logo192.png" productId="2" productName={isUpdate ? getInfo(1).product_title : "default"} name={isUpdate ? getInfo(1).product_saler : ""} productInterest={isUpdate ? getInfo(1).product_interest : 0} price={isUpdate ? getInfo(1).product_price : 0}/> 
                    <ProductInfo id={ isUpdate ? getInfo(2).product_id : 0 }imageLink="./images/logo192.png" productId="3" productName={isUpdate ? getInfo(2).product_title : "default"} name={isUpdate ? getInfo(2).product_saler : ""} productInterest={isUpdate ? getInfo(2).product_interest : 0} price={isUpdate ? getInfo(2).product_price : 0}/>
                    <ProductInfo id={ isUpdate ? getInfo(3).product_id : 0 }imageLink="./images/logo192.png" productId="4" productName={isUpdate ? getInfo(3).product_title : "default"} name={isUpdate ? getInfo(3).product_saler : ""} productInterest={isUpdate ? getInfo(3).product_interest : 0} price={isUpdate ? getInfo(3).product_price : 0}/> 
                    <ProductInfo id={ isUpdate ? getInfo(0).product_id : 0 }imageLink="./images/logo192.png" productId="4" productName={isUpdate ? getInfo(2).product_title : "default"} name={isUpdate ? getInfo(2).product_saler : ""} productInterest={isUpdate ? getInfo(2).product_interest : 0} price={isUpdate ? getInfo(2).product_price : 0}/>        
                </div>
                <h2 className="listName">- CLOTHES</h2>
                <div className="productList">
                    <ProductInfo imageLink="./images/logo192.png" productId="1" productName={isUpdate ? getInfo(0).product_title : "default"} name={isUpdate ? getInfo(0).product_saler : ""} productInterest={isUpdate ? getInfo(0).product_interest : 0} price={isUpdate ? getInfo(0).product_price : 0}/>
                    <ProductInfo imageLink="./images/logo192.png" productId="2" productName={isUpdate ? getInfo(1).product_title : "default"} name={isUpdate ? getInfo(1).product_saler : ""} productInterest={isUpdate ? getInfo(1).product_interest : 0} price={isUpdate ? getInfo(1).product_price : 0}/> 
                    <ProductInfo imageLink="./images/logo192.png" productId="3" productName={isUpdate ? getInfo(2).product_title : "default"} name={isUpdate ? getInfo(2).product_saler : ""} productInterest={isUpdate ? getInfo(2).product_interest : 0} price={isUpdate ? getInfo(2).product_price : 0}/>
                    <ProductInfo imageLink="./images/logo192.png" productId="4" productName={isUpdate ? getInfo(3).product_title : "default"} name={isUpdate ? getInfo(3).product_saler : ""} productInterest={isUpdate ? getInfo(3).product_interest : 0} price={isUpdate ? getInfo(3).product_price : 0}/> 
                    <ProductInfo imageLink="./images/logo192.png" productId="4" productName={isUpdate ? getInfo(2).product_title : "default"} name={isUpdate ? getInfo(2).product_saler : ""} productInterest={isUpdate ? getInfo(2).product_interest : 0} price={isUpdate ? getInfo(2).product_price : 0}/>  
                </div>
                <h2 className="listName">- ELECTRIC DEVICE</h2>
                <div className="productList">
                    <ProductInfo imageLink="./images/logo192.png" productId="1" productName={isUpdate ? getInfo(0).product_title : "default"} name={isUpdate ? getInfo(0).product_saler : ""} productInterest={isUpdate ? getInfo(0).product_interest : 0} price={isUpdate ? getInfo(0).product_price : 0}/>
                    <ProductInfo imageLink="./images/logo192.png" productId="2" productName={isUpdate ? getInfo(1).product_title : "default"} name={isUpdate ? getInfo(1).product_saler : ""} productInterest={isUpdate ? getInfo(1).product_interest : 0} price={isUpdate ? getInfo(1).product_price : 0}/> 
                    <ProductInfo imageLink="./images/logo192.png" productId="3" productName={isUpdate ? getInfo(2).product_title : "default"} name={isUpdate ? getInfo(2).product_saler : ""} productInterest={isUpdate ? getInfo(2).product_interest : 0} price={isUpdate ? getInfo(2).product_price : 0}/>
                    <ProductInfo imageLink="./images/logo192.png" productId="4" productName={isUpdate ? getInfo(3).product_title : "default"} name={isUpdate ? getInfo(3).product_saler : ""} productInterest={isUpdate ? getInfo(3).product_interest : 0} price={isUpdate ? getInfo(3).product_price : 0}/> 
                    <ProductInfo imageLink="./images/logo192.png" productId="4" productName={isUpdate ? getInfo(2).product_title : "default"} name={isUpdate ? getInfo(2).product_saler : ""} productInterest={isUpdate ? getInfo(2).product_interest : 0} price={isUpdate ? getInfo(2).product_price : 0}/>  
                </div>
            </div>
            <Info />
        </div>
    );
}

// 다른 곳에서 import 해서 사용하기 위해서 export 해줘야 한다.
export default Main;
