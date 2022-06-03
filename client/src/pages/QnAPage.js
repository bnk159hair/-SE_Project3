
import styled from 'styled-components';
import React, { useState } from 'react';
import BP_ProdInfo from '../components/BP_ProdInfo';
import BP_ProdImage from '../components/BP_ProdImage';
import BP_Prod from '../components/BP_Prod';
import BP_SellerInfo from '../components/BP_SellerInfo';

//props : 
const QnAPage = (props) => {


  return (
    <Container>

      <MainContainer>
        <TitleBox>
          <Title>큐엔에이</Title>
        </TitleBox>
        <SignupTitleBox>
          <SignupTitle>
            <BP_SellerInfo></BP_SellerInfo>
          </SignupTitle>
        </SignupTitleBox>
        <SignupBox>
          <table>
            <tbody>
              <tr>
                <th>제목</th>
                <td>
                  <input
                    type='text'
                    placeholder='상품이름'
                    onChange={(e) => {
                      console.log("제목제목")
                    }}
                  />
                </td>
              </tr>
              <tr >
                <th>내용</th>
                <td height='100px'>
                  <input
                    height='100px'
                    type='text'
                    placeholder='문의 내용'
                    onChange={(e) => {
                      alert("비번 입력중")
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </SignupBox>
        <div>
          <SignupBtn >글쓰기</SignupBtn>
        </div>
      </MainContainer>
    </Container>
  );
}

const Container = styled.div`
  margin: auto;
  min-width: 1000px;
  max-width: 1000px;
  position: relative;
`;

const Header = styled.div`
  height: 42px;
  line-height: 42px;
  background: #fff;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  color: #0d0d0d;
  border-bottom: 1px solid #ebebeb;
`;

const HeaderImg = styled.img`
  font-size: 18px;
  height: 16px;
`;
const MainContainer = styled.div`
  margin: auto 40px;
`;

const TitleBox = styled.div`
  margin-top: 55px;
`;
const Title = styled.div`
  font-size: 21px;
  font-weight: bold;
  text-align: center;
  color: #0d0d0d;
  margin-bottom: 5px;
`;
const SignupTitleBox = styled.div`
  margin-top: 30px;
`;
const SignupTitle = styled.div`
  color: #000;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #000;
`;

const SignupBox = styled.div`
  padding: 15px 20px 20px;
  & table {
    border-spacing: 0;
    border: 0;
    border-collapse: collapse;
    width: 100%;
    height: 100%;
    & tbody {
      margin: 0;
      padding: 0;
      & th {
        height: 15px;
        font-size: 13px;
        text-align: left;
        color: #2c2c2c;
        width: 20%;
        vertical-align: initial;
        line-height: 44px;
      }
      & td {
        padding-bottom: 5px;
        & input {
          width: 100%;
          height: 44px;
          font-size: 13px;
          color: #2c2c2c;
          margin-bottom: 10px;
          border-radius: 2px;
          border: 0.7px solid #dadada;
          padding: 14px;
          box-sizing: border-box;
        }
      }
    }
  }
`;

const SignupBtn = styled.button`
  margin-top: 10px;
  color: #fff;
  background-color: #ff6f61;
  width: 100%;
  height: 45px;
  border-radius: 2px;
  font-size: 14px;
  border: 1px solid #e7e7e7;
  cursor: pointer;
`;

export default QnAPage;