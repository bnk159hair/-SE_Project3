import React, {useState, useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';

import Main from './Main';
import Router from './Router';

function App() {

  return (
    <Router />
  );
}

// 다른 곳에서 import 해서 사용하기 위해서 export 해줘야 한다.
export default App;
