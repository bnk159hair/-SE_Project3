import React, { useState } from 'react';
import styled from 'styled-components';

//props : 사진(prof_image), 판매자이름(prof_name), 별점(prof_stars), 판매횟수(prof_sc)
const BP_SellerInfo = (props) => {

  return (
    <Container>

      <ImgBox>
        <img src="./images/logo192.png" alt='상품이미지' />
      </ImgBox>
      <ProfBox>
        <div className="profile_name">
          {props.prof_name}
        </div>
        <div className="profile_stars">
          별점 : {props.prof_stars}
        </div>
      </ProfBox>


    </Container>
  );
}

const ImgBox = styled.div`
  cursor: default;
  & img {
    width: 100px;
    height: 100px;
    border: none;
    vertical-align: middle;
    max-width: 100%;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;


const ProfBox = styled.div`
  display: flex;
  flex-direction: column;
`;



export default BP_SellerInfo;