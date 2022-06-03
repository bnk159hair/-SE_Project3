import { click } from '@testing-library/user-event/dist/click';
import React, {useState, useEffect} from 'react';
import './App.css';

import Login from './components/LoginPage';
import ProductInfo from './components/ProductInfo';
import NavBar from './components/NavBar';
import MainImage from './components/MainImage';
import BuyPage from './pages/BuyPage';
import SellPage from './pages/SellPage';
import QnAPage from './pages/QnAPage';
function App() {
  const [count, setCount] = useState(0);

  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');

  const [movies, setMovies] = useState(
    [
      {title: "별헤는밤", year: 2020},
      {title: "귀곡성", year: 2019},
      {title: "7번방의 기적", year: 2030},
      {title: "범죄도시", year: 2034}
    ]
  );

  // 아래와 같이 useEffect 함수를 이용하면, 원하는 변수의 state에 따라서만
  // useEffect의 인자로 받은 함수를 실행한다.
  useEffect(() => {
    console.log(count);
  }, [count]);
  console.log('rendering');

  return (
    <div className="App">
      <NavBar imageLink="./images/glass.png"/>
      {/*<form onSubmit={addMovie}>
        <input
          type="text"
          value={movieTitle}
          placeholder="영화 제목"
          onChange={e => setMovieTitle(e.target.value)}
        /> <br />
        <input
          type="text"
          value={movieYear}
          placeholder="개봉 년도"
          onChange={e => setMovieYear(e.target.value)}
        /> <br />
        <button>영화 추가</button>
      </form>
      */}
      <MainImage />

      <div className="productList">
        {/* <BuyPage></BuyPage> */}
        <QnAPage></QnAPage>
      </div>
    </div>
  );
}

// 다른 곳에서 import 해서 사용하기 위해서 export 해줘야 한다.
export default App;
