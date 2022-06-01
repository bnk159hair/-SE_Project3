import React, {useState, useEffect} from 'react';

const Condition = () => {
    const [condition, setCondition] = useState(false);
    const toggle = () => {setCondition(!condition);};

    useEffect(() => {
        console.log(condition);
    });

    const renderCondition = condition
        ? "Hel"
        : "lo!"
    
    return (
        <div>
            <div>{renderCondition}</div>
            <button onClick={toggle}>Toggle</button>
        </div>
    );
}

export default Condition;