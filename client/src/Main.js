import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';

import './App.css';

import ProductInfo from './components/ProductInfo';
import NavBar, {returnList} from './components/NavBar';
import MainImage from './components/MainImage';
import Info from './components/Info';
import axios from 'axios';
import {setInfo, getInfo} from './pages/List';

const Main = () => {
    const [isUpdate, setIsUpdate] = useState(false);
    //var information = Array(15);

    useEffect(() => {
        console.log('use effect');
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
        });

    }, []);

    return (
        <div>
            <div className="App">
                <NavBar imageLink="./images/glass.png"/>
                <MainImage imageSrc="./images/background.png"/>

                <h2 className="listName">- BEST ITEMS</h2>
                <div className="productList">
                    <ProductInfo id={ isUpdate ? getInfo(0).product_id : 0 }imageLink={'/'+getInfo(0).product_photo} productName={isUpdate ? getInfo(0).product_title : "default"} name={isUpdate ? getInfo(0).product_saler : ""} productInterest={isUpdate ? getInfo(0).product_interest : 0} price={isUpdate ? getInfo(0).product_price : 0}/>
                    <ProductInfo id={ isUpdate ? getInfo(1).product_id : 0 }imageLink={'/'+getInfo(1).product_photo} productName={isUpdate ? getInfo(1).product_title : "default"} name={isUpdate ? getInfo(1).product_saler : ""} productInterest={isUpdate ? getInfo(1).product_interest : 0} price={isUpdate ? getInfo(1).product_price : 0}/> 
                    <ProductInfo id={ isUpdate ? getInfo(2).product_id : 0 }imageLink={'/'+getInfo(2).product_photo} productName={isUpdate ? getInfo(2).product_title : "default"} name={isUpdate ? getInfo(2).product_saler : ""} productInterest={isUpdate ? getInfo(2).product_interest : 0} price={isUpdate ? getInfo(2).product_price : 0}/>
                    <ProductInfo id={ isUpdate ? getInfo(3).product_id : 0 }imageLink={'/'+getInfo(3).product_photo} productName={isUpdate ? getInfo(3).product_title : "default"} name={isUpdate ? getInfo(3).product_saler : ""} productInterest={isUpdate ? getInfo(3).product_interest : 0} price={isUpdate ? getInfo(3).product_price : 0}/> 
                    <ProductInfo id={ isUpdate ? getInfo(4).product_id : 0 }imageLink={'/'+getInfo(4).product_photo} productName={isUpdate ? getInfo(4).product_title : "default"} name={isUpdate ? getInfo(4).product_saler : ""} productInterest={isUpdate ? getInfo(4).product_interest : 0} price={isUpdate ? getInfo(4).product_price : 0}/>        
                </div>
                <div className="productList">
                    <ProductInfo id={ isUpdate ? getInfo(5).product_id : 0 }imageLink={'/'+getInfo(5).product_photo} productName={isUpdate ? getInfo(0).product_title : "default"} name={isUpdate ? getInfo(5).product_saler : ""} productInterest={isUpdate ? getInfo(5).product_interest : 0} price={isUpdate ? getInfo(5).product_price : 0}/>
                    <ProductInfo id={ isUpdate ? getInfo(6).product_id : 0 }imageLink={'/'+getInfo(6).product_photo} productName={isUpdate ? getInfo(1).product_title : "default"} name={isUpdate ? getInfo(6).product_saler : ""} productInterest={isUpdate ? getInfo(6).product_interest : 0} price={isUpdate ? getInfo(6).product_price : 0}/> 
                    <ProductInfo id={ isUpdate ? getInfo(7).product_id : 0 }imageLink={'/'+getInfo(7).product_photo} productName={isUpdate ? getInfo(2).product_title : "default"} name={isUpdate ? getInfo(7).product_saler : ""} productInterest={isUpdate ? getInfo(7).product_interest : 0} price={isUpdate ? getInfo(7).product_price : 0}/>
                    <ProductInfo id={ isUpdate ? getInfo(8).product_id : 0 }imageLink={'/'+getInfo(8).product_photo} productName={isUpdate ? getInfo(3).product_title : "default"} name={isUpdate ? getInfo(8).product_saler : ""} productInterest={isUpdate ? getInfo(8).product_interest : 0} price={isUpdate ? getInfo(8).product_price : 0}/> 
                    <ProductInfo id={ isUpdate ? getInfo(9).product_id : 0 }imageLink={'/'+getInfo(9).product_photo} productName={isUpdate ? getInfo(4).product_title : "default"} name={isUpdate ? getInfo(9).product_saler : ""} productInterest={isUpdate ? getInfo(9).product_interest : 0} price={isUpdate ? getInfo(9).product_price : 0}/>   
                </div>
                <div className="productList">
                    <ProductInfo id={ isUpdate ? getInfo(10).product_id : 0 }imageLink={'/'+getInfo(10).product_photo} productName={isUpdate ? getInfo(10).product_title : "default"} name={isUpdate ? getInfo(10).product_saler : ""} productInterest={isUpdate ? getInfo(10).product_interest : 0} price={isUpdate ? getInfo(10).product_price : 0}/>
                    <ProductInfo id={ isUpdate ? getInfo(11).product_id : 0 }imageLink={'/'+getInfo(11).product_photo} productName={isUpdate ? getInfo(11).product_title : "default"} name={isUpdate ? getInfo(11).product_saler : ""} productInterest={isUpdate ? getInfo(11).product_interest : 0} price={isUpdate ? getInfo(11).product_price : 0}/> 
                    <ProductInfo id={ isUpdate ? getInfo(12).product_id : 0 }imageLink={'/'+getInfo(12).product_photo} productName={isUpdate ? getInfo(12).product_title : "default"} name={isUpdate ? getInfo(12).product_saler : ""} productInterest={isUpdate ? getInfo(12).product_interest : 0} price={isUpdate ? getInfo(12).product_price : 0}/>
                    <ProductInfo id={ isUpdate ? getInfo(13).product_id : 0 }imageLink={'/'+getInfo(13).product_photo} productName={isUpdate ? getInfo(13).product_title : "default"} name={isUpdate ? getInfo(13).product_saler : ""} productInterest={isUpdate ? getInfo(13).product_interest : 0} price={isUpdate ? getInfo(13).product_price : 0}/> 
                    <ProductInfo id={ isUpdate ? getInfo(14).product_id : 0 }imageLink={'/'+getInfo(14).product_photo} productName={isUpdate ? getInfo(14).product_title : "default"} name={isUpdate ? getInfo(14).product_saler : ""} productInterest={isUpdate ? getInfo(14).product_interest : 0} price={isUpdate ? getInfo(14).product_price : 0}/>   
                </div>
            </div>
            <Info />
        </div>
    );
}

// 다른 곳에서 import 해서 사용하기 위해서 export 해줘야 한다.
export default Main;
