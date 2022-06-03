
import styled from 'styled-components';
import React, { useState } from 'react';
import BP_ProdInfo from '../components/BP_ProdInfo';
import BP_ProdImage from '../components/BP_ProdImage';
import BP_Prod from '../components/BP_Prod';
import BP_SellerInfo from '../components/BP_SellerInfo';
//props : 
const BuyPage = (props) => {


  return (
    <>
      {/* <Header /> */}
      
        <Container>
          <ItemBox>
            <ImgBox>
              <img src="./images/logo192.png" alt='상품이미지' />
            </ImgBox>
            <ItemInfoBox>
              <InfoBox>
              <BP_SellerInfo prof_image="./images/logo192.png" prof_name="김개똥" prof_stars="3" prof_sc="100">

              </BP_SellerInfo>
                <p>제목제목</p>
                <PriceBox>
                  <span>
                    가격가격
                    <small>원</small>
                  </span>
                </PriceBox>

                <TotalPrice>
                  <span>
                    거래유형 <strong>택포</strong>
                  </span>
                </TotalPrice>
                <ButtonBox>
                  <CartBtn >찜</CartBtn>
                  <BuyBtn >바로 구매하기</BuyBtn>
                </ButtonBox>
              </InfoBox>
            </ItemInfoBox>
          </ItemBox>
        <ProdMain>
            상세설명설명

        </ProdMain>
        </Container>


    </>
  );
}

const ProdMain = styled.div`
  margin: 0 auto;
  margin-bottom: 200px;
  width: 1140px;
  background: rgb(255, 255, 255);
`;


const Container = styled.div`
  margin: 0 auto;
  margin-bottom: 200px;
  width: 1140px;
  background: rgb(255, 255, 255);
`;
const ItemBox = styled.div`
  box-sizing: border-box;
  display: flex;
  padding-top: 60px;
  flex-direction: row;
`;

const ImgBox = styled.div`
  min-width: 609px;
  cursor: default;
  & img {
    width: 609px;
    height: 407px;
    min-height: 230px;
    border: none;
    vertical-align: middle;
    max-width: 100%;
  }
`;
const ItemInfoBox = styled.div`
  width: 100%;
`;

const InfoBox = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 30px 24px;
  flex: 1 1 0%;
  color: rgb(59, 59, 59);
  cursor: default;
  & p {
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    margin: 0;
    padding: 0;
    margin-bottom: 6px;
  }
`;
const PriceBox = styled.div`
  margin-top: 40px;
  display: flex;
  & span {
    font-size: 24px;
    line-height: 24px;
    font-weight: bold;
    width: 100%;
    & small {
      font-size: 14px;
      margin-left: 2px;
      font-weight: bold;
    }
  }
`;
const CountBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;

  & button {
    width: 28px;
    height: 28px;
    padding: 0;
    margin: 0 10px;
    border: 1px solid rgb(236, 236, 236);
    cursor: pointer;
    overflow: visible;
    background: rgb(255, 255, 255);
    outline: none;
  }
`;
const TotalPrice = styled.div`
  padding: 16px 0;
  margin-top: 150px;
  text-align: right;
  & span {
    font-size: 14px;
    & strong {
      font-size: 22px;
      color: red;
      margin-left: 7px;
    }
  }
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const CartBtn = styled.button`
  height: 52px;
  font-size: 16px;
  border-radius: 4px;
  font-weight: bold;
  width: 49%;
  background-color: blue;
  color: rgb(255, 255, 255);
  margin: 0;
  padding: 0;
  cursor: pointer;
  border: 0;
  overflow: visible;
`;

const BuyBtn = styled.button`
  height: 52px;
  font-size: 16px;
  border-radius: 4px;
  font-weight: bold;
  width: 49%;
  background-color: blue;
  color: rgb(255, 255, 255);
  margin: 0;
  padding: 0;
  cursor: pointer;
  border: 0;
  overflow: visible;
`;

export default BuyPage;