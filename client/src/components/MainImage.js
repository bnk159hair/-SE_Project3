import React from 'react';

const MainImage = (props) => {
    return (
        <div>
            <img src={props.imageSrc}
            width="100%"
            />
        </div>
    );
}

export default MainImage;