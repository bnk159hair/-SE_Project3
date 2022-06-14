import React, { useEffect } from 'react';

import NavBar, {returnList} from '../components/NavBar';
import MainImage from '../components/MainImage';

const Search = () => {

    return (
        <div className="App">
            <NavBar imageLink="./images/glass.png"/>
            <MainImage imageSrc="./images/background1.png" />

            <div>
                {returnList()}
            </div>
        </div>
    );
}

export default Search;