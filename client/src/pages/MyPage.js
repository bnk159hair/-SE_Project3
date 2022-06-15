
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import BP_ProdInfo from '../components/BP_ProdInfo';
import BP_ProdImage from '../components/BP_ProdImage';
import BP_Prod from '../components/BP_Prod';
import BP_SellerInfo from '../components/BP_SellerInfo';
import axios from 'axios';

const List = [];
//props : 
const sellList = (props) => {
  return (
    <>
      <tr>
        <td>{props.title}</td>
        <td>1</td>
        <td>{props.price}</td>
        <td>fuck</td>
        <td>you</td>
      </tr>
    </>
  );
}

const MyPage = (props) => {

  useEffect(() => {
    console.log('11233')
    axios.get('/api/member_selling')
      .then((res) => {
        console.log('asdf');
        console.log(res.data[0]);

        const length = res.data.length;
        console.log(length);
        console.log(res.data[0].product_title)
        for (var i = 0; i < length; i++) {
          List.push(
            <sellList title={res.data[i].product_title} price={res.data[i].product_price} />
          );
          console.log(res.data[i].product_title + ' ' + res.data[i].product_price);
        }
      })
  })

  return (
    <>
      <Container>
        <Title>
          주문목록/배송조회
          <CurrentPage>
            <RightArrow></RightArrow>
            <Strong>01 주문목록/배송조회</Strong>
          </CurrentPage>
        </Title>
        <Subtitle>주문상품 정보</Subtitle>
        <CartContainer>
          <Thead>
            <tr>
              <th>상품정보</th>
              <th>수량</th>
              <th>총 상품금액</th>
              <th>배송비</th>
              <th>주문처리상태</th>
            </tr>
          </Thead>
          <Tbody>
            {List}
          </Tbody>
        </CartContainer>
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 1140px;
  margin: auto;
  cursor: default;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 70px 0px;
`;
const CurrentPage = styled.div`
  float: right;
  font-size: 14px;
  letter-spacing: -0.3px;
  line-height: 160%;
`;
const Strong = styled.div`
  font-weight: bold;
  color: #ff6f61;
  display: inline-block;
`;

const RightArrow = styled.div`
  width: 7px;
  height: 7px;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  transform: rotate(45deg);
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  margin: 20px 0px;
`;
const CartContainer = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin-bottom: 120px;
`;

const Thead = styled.thead`
  border-top: 2px solid rgb(51, 51, 51);
  font-weight: normal;
  font-size: 14px;
  width: 1140px;
  max-width: 100%;
  text-align: center;
  font-weight: bold;
  & th {
    height: 51px;
    margin: 0;
    padding: 0;
  }
  & th:first-child {
    width: 500px;
  }
`;

const Tbody = styled.tbody`
  font-weight: normal;
  line-height: 160%;
  font-size: 14px;
  color: #000;
  letter-spacing: -0.3;
  cursor: default;
  border-bottom: 1px solid rgb(51, 51, 51);
  text-align: center;
`;


export default MyPage;