import React, { useState } from 'react';
import "./ProgressBar.css";
import Cookies from "js-cookie";

function ProgressBar(props){
    const [count, setCount] = useState(props.count);
    const [total, setTotal] = useState(props.total);
    const [title, setTitle] = useState(props.title);
    const challengeNum = props.challengeNum;
    const barNum = props.barNum;

    const incrementCount = () => {
        if(count+1 === total){
            props.i();
        }
        if(count < total){
            Cookies.set(challengeNum + "-" + barNum, count+1);
            setCount(count+1);
        }
    }
    const decrementCount = () => {
        if(count === total){
            props.d();
        }
        if(count > 0){
            Cookies.set(challengeNum + "-" + barNum, count-1);
            setCount(count-1);   
        }
    }
    return (
    <div className="BarWhole">
        <div className="title">{title}</div>
        <div className="BarContainer">

            <div className="ProgressBar">
                <div className="BarGreen" style={{width:Math.ceil(100*count/total)+"%"}}></div>
                <div className="BarText">{count}/{total}, {Math.ceil(100*count/total)}%</div>
            </div>
            <button onClick={()=>{incrementCount()}}><b>+</b></button>
            <button onClick={()=>{decrementCount()}}><b>-</b></button>
        </div>
    </div>
    )
}

export default ProgressBar;