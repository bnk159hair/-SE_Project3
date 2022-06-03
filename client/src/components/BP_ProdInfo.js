import React, { useState } from 'react';

//props : 상품명(prod_name), 가격(prod_price), 거래유형(prod_sell_type)
const BP_ProdInfo = (props) => {
    return (
        <div>
            <div>
                <h3>상품명</h3>
                { props.prod_name }
            </div>
            <div>
                <h3>상품 가격</h3>
                { props.prod_price }
            </div>
            <div>
                <h3>거래 유형</h3>
                { props.prod_sell_type }
            </div>
        </div>
    );
}

export default BP_ProdInfo;