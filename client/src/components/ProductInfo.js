import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductInfo = (props) => {
    const [view, setView] = useState(true);

    function countHit(){
        setView(!view);
    }

    return (
        <div className="item">
            <Link to={'/buypage/' + props.productId}
            style={{
                "text-decoration": "none",
                "color": "black"
            }}>
                <img src={ props.imageLink }
                    className="pro_image"
                />
            </Link>
            <div className="pro_info">
                <div className="pro_name">
                    상품명: { props.productName }
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