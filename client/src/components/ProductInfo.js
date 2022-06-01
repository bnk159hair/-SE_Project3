import React, { useState } from 'react';

const ProductInfo = (props) => {
    const [view, countView] = useState(0);

    function countHit(){
        countView(view + 1);
    }

    return (
        <div className="item">
            <img src={ props.imageLink }
                className="pro_image"
            />
            <div className="pro_info">
                <div className="pro_name">
                    상품명: <a>{ props.productName }</a>
                </div>
                <div>
                    등록일: { props.date }
                </div>
                <div>
                    <button onClick={countHit}>❤</button>조회수: {view}
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;