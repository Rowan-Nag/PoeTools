import React, { useState, useRef } from 'react';
import "./Challenge.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import challengeList from "../../challengeList.js";
import Cookies from "js-cookie";
import ToggleBar from '../ToggleBar/ToggleBar';

function Challenge(props) {
    const colors = ["#d95f5f", "#51d63a"];
    const [complete, setComplete] = useState(props.complete);
    const [color, setColor] = useState(colors[complete]);
    const [maxHeight, setMaxHeight] = useState(props.maxHeight);
    const [objectivesDone, setObjectives] = useState(props.objectives);
    const num = props.num;
    const challenge = challengeList[num];
    const objectives = challenge.objectives;

    var bars = [];

    function inc_obj(){
        Cookies.set("C"+num+"O", objectivesDone+1)
        setObjectives(objectivesDone+1);
        
        if(objectivesDone+1 == objectives.length){
            setColor(colors[1]);
            setComplete(1);
            
        }
    }
    function dec_obj(){
        Cookies.set("C"+num+"O", objectivesDone-1)
        setObjectives(objectivesDone-1);
        
        if(objectivesDone-1 < objectives.length /*Total Objectives*/){
            setColor(colors[0]);
            setComplete(0);
        }
    }

    function toggleComplete(){
        setComplete(complete+1);
        setColor(colors[(complete+1)%2]);
    }
    
    for(let i = 0; i < objectives.length; i++){
        if(challenge.counts[i]==1){
            bars.push(<ToggleBar
                key = {i}
                count = {Cookies.get(num+"-"+i) || 0/*get from cookies */}
                title={objectives[i]}
                i = {inc_obj}
                d = {dec_obj}
                challengeNum = {num}
                barNum = {i}/>)
        }
        else{
            bars.push(<ProgressBar
                key = {i}
                count = {Cookies.get(num+"-"+i) || 0/*get from cookies */}
                total = {challenge.counts[i]}
                title={objectives[i]}
                i = {inc_obj}
                d = {dec_obj}
                challengeNum = {num}
                barNum = {i}/>)
        }
    }
    return (
        <div className="Challenge" style={{backgroundColor:color, maxHeight:maxHeight+"px"}}>
            <button className="Title" onClick={()=>{
                if(maxHeight === 60){
                    Cookies.set("C"+num+"H", 1000)
                    setMaxHeight(1000);
                }else{
                    setMaxHeight(60);
                    Cookies.set("C"+num+"H", 60)
                }
            }}><b>{num}</b> -{objectivesDone} - {challenge.name}</button>
            {bars}
            {/* <button onClick={toggleComplete}>Toggle Complete
            </button> */}
        </div>
    );
}


export default Challenge;