import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./ProgressBar.css";
import Cookies from "js-cookie";
import objectiveList from "../../objectiveList";
import { setObj } from "../../actionCreators.js";
import store from "../../store";
import ReactSlider from 'react-slider'
import { debounce, throttle } from 'lodash';



function ProgressBar(props){
    
    const dispatch = useDispatch();
    
    //const count = useSelector(state => state.objectives[props.num].done);
    const [count, setCount] = useState(store.getState().objectives[props.num].done);
    const total = props.total || objectiveList.objectives[props.num].total;
    const title = props.title || objectiveList.objectives[props.num].name;
    const num = props.num;



    const updateReduxCount = (val)=>{
        //console.log("update")
        
        dispatch(setObj(num, val))
       
    }
    
   

    const handleChange = (event) => {
        setCount(event.target.value);
        updateReduxCount(event.target.value);
        
    }

    const incrementCount = () => {
        if(count+1 === total){
            props.i();
        }
        if(count < total){
            //Cookies.set(challengeNum + "-" + barNum, count+1);
            //setCount(count+1);
            dispatch(setObj(num, count+1));
        }
    }
    const decrementCount = () => {
        if(count === total){
            props.d();
        }
        if(count > 0){
            //Cookies.set(challengeNum + "-" + barNum, count-1);
            //setCount(count-1);   
            dispatch(setObj(num, count-1));
        }
    }
    return (
    <div className="BarWhole">
        <div className="title">{title}</div>
        <div className="BarContainer">

            {/* <div className="ProgressBar">
                <div className="BarGreen" style={{width:Math.ceil(100*count/total)+"%"}}></div>
                <div className="BarText">{count}/{total}, {Math.ceil(100*count/total)}%</div>
            </div>
            <button onClick={()=>{incrementCount()}}><b>+</b></button>
            <button onClick={()=>{decrementCount()}}><b>-</b></button> */}

            <input type="range" min="0" step={(total < 10) ? 1 : total/10} max={total} value={count} className="sliderBar"
            onChange={handleChange}/>
            <div className="data">
                {count}/{total}
            </div>
        </div>
    </div>
    )
}

export default ProgressBar;