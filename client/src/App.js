import axios from "axios";
import React, {useEffect, useState} from 'react';

function App() {
  const [data, setData] = useState('hello');

  const getAPI = async() => {
    axios.get("/api").then((res) => {
      console.log(res.data);
      setData(res.data.test);
    });
  }

  useEffect(() => {
    getAPI();
  }, []);

  return (
    <div className="App">
      hello, {data}
    </div>
  );
}

export default App;
