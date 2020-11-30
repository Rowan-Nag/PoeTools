import React, { useState } from 'react';
import "./ToggleBar.css";
import Cookies from "js-cookie";

function ToggleBar(props){
    const [count, setCount] = useState(props.count);
    const [title, setTitle] = useState(props.title);
    const [color, setColor] = useState(["red", "green"][count])
    const challengeNum = props.challengeNum;
    const barNum = props.barNum;
    
    // const incrementCount = () => {
        
    //     if(count < 1){
    //         props.i();
    //         Cookies.set(challengeNum + "-" + barNum, 1);
    //         setCount(1);
    //     }
    // }
    // const decrementCount = () => {
    //     if(count > 0){
    //         props.d();
    //         Cookies.set(challengeNum + "-" + barNum, 0);
    //         setCount(0);   
    //     }
    // }

    function toggle(){
        setColor("red");
        if(count == 1){
            props.d();
            Cookies.set(challengeNum + "-" + barNum, 0);
            setCount(0);
            setColor("red");
        }
        else{ /*if(count === 0)*/
            props.i();
            Cookies.set(challengeNum + "-" + barNum, 1);
            setCount(1);
            setColor("green");
        }
    }

    return (
    <div className="BarWhole">
        <div className="title">{title}</div>
        <button className="Toggle" style={{backgroundColor:color}} onClick={toggle}>
        </button>
        
    </div>
    )
}

export default ToggleBar;