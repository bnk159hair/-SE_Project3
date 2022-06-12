import React from 'react';

const MainImage = (props) => {
    return (
        <div>
            <img src={props.imageSrc}
            width="100%"
            />
            <div style={{
                "height": "20px",
                "background-color": "black",
                "color": "white",
                "text-align": "center"
            }}>
                WELCOME TO THE JUNGGO NARA
            </div>
        </div>
    );
}

export default MainImage;