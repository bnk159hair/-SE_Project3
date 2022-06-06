import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Main from './Main';
import LoginPage from './components/LoginPage';

const Router = () => {
    return (
        <Routes>
            {/* exact 옵션 더 이상 사용하지 않는다.
                여러 라우팅을 매칭하고 싶은 경우 URL 뒤에 *를 붙여 사용
            */}
            <Route path="/" element={<Main />} />
            <Route path="/page1" element={<Main />} />
            <Route path="/login" element={<LoginPage />} />
            {/*Not found */}
            <Route element={()=><Navigate to="/" />} />
        </Routes>
    );
}

export default Router;