import React from 'react';

const infoList = Array(15);

const isMain = true;

const setInfo = (idx, info) => {
    infoList[idx] = info;
}

const getInfo = (idx) => {
    return infoList[idx];
}

const setIsMain = (value) => {
    isMain = value;
}

const getIsMain = () => {
    return isMain;
}

export {setInfo, getInfo, setIsMain, getIsMain};