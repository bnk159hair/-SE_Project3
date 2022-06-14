import React from 'react';

const infoList = Array(15);

const setInfo = (idx, info) => {
    infoList[idx] = info;
}

const getInfo = (idx) => {
    return infoList[idx];
}

export {setInfo, getInfo};