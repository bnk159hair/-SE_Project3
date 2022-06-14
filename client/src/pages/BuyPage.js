
import styled from 'styled-components';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import BP_ProdInfo from '../components/BP_ProdInfo';
import BP_ProdImage from '../components/BP_ProdImage';
import BP_Prod from '../components/BP_Prod';
import BP_SellerInfo from '../components/BP_SellerInfo';

import NavBar from '../components/NavBar';
import Info from '../components/Info';

import axios from 'axios';
//props : 
const BuyPage = (props) => {
  const [ProductId, SetProductId] = useState('');
  const [Seller, SetSeller] = useState('');
  const [Score, SetScore] = useState(0);
  const [ProductTitle, SetProductTitle] = useState('');
  const [ProductCategory, SetProductCategory] = useState('');
  const [ProductState, SetProductState] = useState('초기화전');
  const [ProductPrice, SetProductPrice] = useState(0);
  const [ProductInterest, SetProductInterest] = useState(0);
  const [ProductLocation, SetProductLocation] = useState(0);
  const [ProductContent, SetProductContent] = useState('');
  const [Z, SetZ] = useState('찜');

  let Location = useLocation();
  const navigate = useNavigate();
  console.log('location', Location);
  useEffect(() => {
    console.log('location', Location);
  }, [Location]);
  const ProdId = Location.pathname.split('/').slice(-1)[0];

  useEffect(() => {
    axios.get('/info/' + ProdId).then((res) => {
      console.log("res" + JSON.stringify(res.data[0]));
      console.log("!!" + res.data[0][0].product_id);
      SetProductId(res.data[0][0].product_id);
      SetSeller(res.data[0][0].seller);
      SetProductTitle(res.data[0][0].product_title);
      SetProductState();
      if (res.data[0][0].product_state == 0)
        SetProductState('판매중');
      else if (res.data[0][0].product_state == 1)
        SetProductState('예약중');
      else
        SetProductState('판매완료');
      SetProductCategory(res.d
        import styled from 'styled-components';
      import { useLocation, useNavigate, Link } from 'react-router-dom';
      import React, { useEffect, useState } from 'react';
      import BP_ProdInfo from '../components/BP_ProdInfo';
      import BP_ProdImage from '../components/BP_ProdImage';
      import BP_Prod from '../components/BP_Prod';
      import BP_SellerInfo from '../components/BP_SellerInfo';

      import NavBar from '../components/NavBar';
      import Info from '../components/Info';

      import axios from 'axios';
      //props : 
      const BuyPage = (props) => {
        const [ProductId, SetProductId] = useState('');
        const [Seller, SetSeller] = useState('');
        const [Score, SetScore] = useState(0);
        const [ProductTitle, SetProductTitle] = useState('');
        const [ProductCategory, SetProductCategory] = useState('');
        const [ProductState, SetProductState] = useState('초기화전');
        const [ProductPrice, SetProductPrice] = useState(0);
        const [ProductInterest, SetProductInterest] = useState(0);
        const [ProductLocation, SetProductLocation] = useState(0);
        const [ProductContent, SetProductContent] = useState('');
        const [Z, SetZ] = useState('찜');

        let Location = useLocation();
        const navigate = useNavigate();
        console.log('location', Location);
        useEffect(() => {
          console.log('location', Location);
        }, [Location]);
        const ProdId = Location.pathname.split('/').slice(-1)[0];

        useEffect(() => {
          axios.get('/info/' + ProdId).then((res) => {
            console.log("res" + JSON.stringify(res.data[0]));
            console.log("!!" + res.data[0][0].product_id);
            SetProductId(res.data[0][0].product_id);
            SetSeller(res.data[0][0].seller);
            SetProductTitle(res.data[0][0].product_title);
            SetProductState();
            if (res.data[0][0].product_state == 0)
              SetProductState('판매중');
            else if (res.data[0][0].product_state == 1)
              SetProductState('예약중');
            else
              SetProductState('판매완료');
            SetProductCategory(res.data[0][0].product_category);
            SetProductPrice(res.data[0][0].product_price);
            SetProductInterest(res.data[0][0].product_interest);
            SetProductLocation(res.data[0][0].product_location);
            SetProductContent(res.data[0][0].product_content);
            SetSeller(res.data[1][0].member_email)
            SetScore(res.data[1][0].member_score)
            //console.log("!!!!" + res.data[1][0].member_email)
          })
        }, [])

        const onClickBuy = () => {
          console.log("Buy button clicked!");
          navigate('/', { replace: true });
        }
        const onClickInterest = () => {
          console.log("Interest button clicked!");
          axios.post('/info/' + ProdId).then((res) => {
            console.log("response" + res)
          })
          //navigate('/', { replace: true });
        }


        return (
          <>
            <>
              {/* <Header /> */}
              <NavBar></NavBar>
              <Container>
                <ItemBox>
                  <ImgBox>
                    <img src="./images/logo192.png" alt='상품이미지' />
                  </ImgBox>
                  <ItemInfoBox>
                    <InfoBox>
                      <BP_SellerInfo prof_image="./images/logo192.png" prof_name={Seller} prof_stars={Score} prof_sc="100">

                      </BP_SellerInfo>
                      <p>{ProductTitle}</p>
                      <PriceBox>
                        <span>
                          {ProductPrice}
                          <small>원</small>
                        </span>
                      </PriceBox>

                      <TotalPrice>
                        <span>
                          거래상태 <strong>{ProductState}</strong>
                        </span>
                      </TotalPrice>
                      <ButtonBox>
                        <CartBtn onClick={onClickInterest} >{Z}</CartBtn>
                        <BuyBtn onClick={onClickBuy} >전화번호 보기</BuyBtn>
                      </ButtonBox>
                    </InfoBox>
                  </ItemInfoBox>
                </ItemBox>
                <ProdMain>
                  {ProductContent}

                </ProdMain>
              </Container>


            </>
            <Info />
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

      export default BuyPage; ata[0][0].product_category);
    SetProductPrice(res.data[0][0].product_price);
    SetProductInterest(res.data[0][0].product_interest);
    SetProductLocation(res.data[0][0].product_location);
    SetProductContent(res.data[0][0].product_content);
    SetSeller(res.data[1][0].member_email)
    SetScore(res.data[1][0].member_score)
    //console.log("!!!!" + res.data[1][0].member_email)
  })
}, [])

const onClickBuy = () => {
  console.log("Buy button clicked!");
  navigate('/', { replace: true });
}
const onClickInterest = () => {
  console.log("Interest button clicked!");
  axios.post('/info/' + ProdId).then((res) => {
    console.log("response" + res)
  })
  //navigate('/', { replace: true });
}


return (
  <>
    <>
      {/* <Header /> */}
      <NavBar></NavBar>
      <Container>
        <ItemBox>
          <ImgBox>
            <img src="./images/logo192.png" alt='상품이미지' />
          </ImgBox>
          <ItemInfoBox>
            <InfoBox>
              <BP_SellerInfo prof_image="./images/logo192.png" prof_name={Seller} prof_stars={Score} prof_sc="100">

              </BP_SellerInfo>
              <p>{ProductTitle}</p>
              <PriceBox>
                <span>
                  {ProductPrice}
                  <small>원</small>
                </span>
              </PriceBox>

              <TotalPrice>
                <span>
                  거래상태 <strong>{ProductState}</strong>
                </span>
              </TotalPrice>
              <ButtonBox>
                <CartBtn onClick={onClickInterest} >{Z}</CartBtn>
                <BuyBtn onClick={onClickBuy} >전화번호 보기</BuyBtn>
              </ButtonBox>
            </InfoBox>
          </ItemInfoBox>
        </ItemBox>
        <ProdMain>
          {ProductContent}

        </ProdMain>
      </Container>


    </>
    <Info />
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