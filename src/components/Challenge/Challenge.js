import React, { useState, useRef } from 'react';
import "./Challenge.css";
import ProgressBar from "../ProgressBar/ProgressBar";

function Challenge(props) {
    // Declare a new state variable, which we'll call "count"
    const [name, changeName] = useState(props.name);
    const [complete, setComplete] = useState(0);
    const [color, setColor] = useState("#d95f5f");
    const [maxHeight, setMaxHeight] = useState(1000);
    const [objectivesDone, setObjectives] = useState(0);
    const colors = ["#d95f5f", "#51d63a"]


    var numObjectives = 2;
    var bars = [];

    function inc_obj(){
        setObjectives(objectivesDone+1);
        if(objectivesDone+1 == numObjectives /*Total Objectives*/){
            setColor(colors[1]);
            setComplete(1);
        }
    }
    function dec_obj(){
        setObjectives(objectivesDone-1);
        if(objectivesDone-1 < numObjectives /*Total Objectives*/){
            setColor(colors[0]);
            setComplete(0);
        }
    }

    function toggleComplete(){
        setComplete(complete+1);
        setColor(colors[(complete+1)%2]);
    }
    
    for(let i = 0; i < numObjectives; i++){
        bars.push(<ProgressBar
        key = {i}
        count = {0 /*data.count*/}
        total = {4 /*data.total*/}
        title={"title here"}
        i = {inc_obj}
        d = {dec_obj}/>)
    }
    return (
        <div className="Challenge" style={{backgroundColor:color, maxHeight:maxHeight+"px"}}>
            <button className="Title" onClick={()=>{
                if(maxHeight === 60){
                    setMaxHeight(1000);
                }else{
                    setMaxHeight(60);
                }
            }}>{name}</button>
            {bars}
            {/* <ProgressBar count={15} total={20} title= {"kill 20 albino roas"}  /> */}
            <button onClick={toggleComplete}>Toggle Complete
            </button>
        </div>
    );
}


export default Challenge;