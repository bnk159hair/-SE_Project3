import React, {useState} from 'react';

// 함수의 인자로 받는 props 객체를 이용해서 부모에서 받아오는
// props를 받아올 수 있는 개념이다.
const Counter = (props) => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };
    // props.click이 있다면 그대로 사용, 없으면 "Click"을 사용
    const clickString = props.click || "Click";
    return (
        <button onClick={increment}>
            {clickString} {count}
        </button>
    )
};

export default Counter;