import React, { useState } from 'react';

//props : 큰이미지(prod_big_img), 작은 이미지(prod_small_img1,prod_small_img2,prod_small_img3)
const BP_ProdImage = (props) => {
    return (
        <div>
            <div className="big_image">
                <img src={ props.prod_big_img }/>
            </div>
            <div className="small_image">
                <img src={ props.prod_small_img1 }/>
                <img src={ props.prod_small_img2 }/>
                <img src={ props.prod_small_img3 }/>
                +
            </div>
            
        </div>
    );
}

export default BP_ProdImage;