import React, { useState } from 'react';

//props : 상품설명(prod)
const BP_Prod = (props) => {

    return (
        <div>
            <h2>상품설명</h2>
            <div>
                {props.prod}
            </div>
            
        </div>
    );
}

export default BP_Prod;