import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./ToggleBar.css";
import Cookies from "js-cookie";
import objectiveList from "../../objectiveList"
import { setObj } from "../../actionCreators.js";
import store from "../../store";

function ToggleBar(props){

    const dispatch = useDispatch();

    const count = useSelector(state => state.objectives[props.num].done);

    const title = props.title || objectiveList.objectives[props.num].name;
    const color = ["red", "green"][count]
    const num = props.num;

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
        //setColor("red");
        if(count == 1){
            props.d();
            //Cookies.set(challengeNum + "-" + barNum, 0);
            //setCount(0);
            dispatch(setObj(num, 0));
            //setColor("red");
        }
        else{ /*if(count === 0)*/
            props.i();
            //Cookies.set(challengeNum + "-" + barNum, 1);
            //setCount(1);
            //setColor("green");
            dispatch(setObj(num, 1));
        }
    }

    return (
    <div className="BarWhole">
        <div className="title">{title}</div>
        <button className="Toggle" style={{backgroundColor:color}} onMouseDown={toggle}>
        </button>
        
    </div>
    )
}

export default ToggleBar;