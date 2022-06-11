import React, { useState } from 'react';

const ProductInfo = (props) => {
    const [view, setView] = useState(true);

    function countHit(){
        setView(!view);
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
                    <button onClick={countHit}>
                        {view ?  '🤍' : '🖤'}
                    </button>찜 수: {props.productInterest}
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;