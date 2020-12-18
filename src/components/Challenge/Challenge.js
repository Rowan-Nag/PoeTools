import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./Challenge.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import challengeList from "../../challengeList.js";
import objectiveList from "../../objectiveList";
import Cookies from "js-cookie";
import ToggleBar from '../ToggleBar/ToggleBar';
import { setExpanded,
    setChallengeCompletion,
    setChallengesDone,
    toggleFavorited,
    setAllCompleted } from "../../actionCreators";
import store from '../../store';
import xImg from "../../res/letter-x.png";

/*
* Challenge.js selectors:
*   objectivesDone, Completed
*/
function Challenge(props) {
    
    const dispatch = useDispatch();

    const num = props.num;

    const favorited = useSelector(state=> state.challenges.favorited);
    const challenge = useSelector(state=> state.challenges[num]);
    const objectives = challengeList.challenges[num].objectives;
    const colors = ["#d95f5f", "#51d63a", "#d4b020"];
    const favorite = favorited.includes(num)
    var complete = favorite ? 2 : 0;
    if(challenge.objectivesDone == objectives.length){
        complete = 1;
    }
    const color = colors[complete];
    const maxHeight = challenge.expanded ? 1000 : 60;
    
    const objectivesDone = challenge.objectivesDone;
    

    var bars = [];

    function inc_obj(){
        
        setChallengeCompletion(num, objectivesDone+1);
        
    }
    function dec_obj(){
        
        setChallengeCompletion(num, objectivesDone-1, true);
        
    }

    function toggleExpand(){
        if(maxHeight == 60){
            //Cookies.set("C"+num+"H", 1000)
            dispatch(setExpanded(num,true));
            
            //setMaxHeight(1000);
        }else{
            dispatch(setExpanded(num,false));

            //setMaxHeight(60);
            //Cookies.set("C"+num+"H", 60)
        }
    }

    for(let i = 0; i < objectives.length; i++){
        if(objectiveList.objectives[objectives[i]].total==1){
            bars.push(<ToggleBar
                key = {i}
                i = {inc_obj}
                d = {dec_obj}
                num = {objectives[i]}/>)
        }
        else{
            bars.push(<ProgressBar
                key = {i}
                i = {inc_obj}
                d = {dec_obj}
                num = {objectives[i]}/>)
        }
    }
    return (
        <div className="Challenge" style={{backgroundColor:color, maxHeight:maxHeight+"px"}}>
            <div className="BarStatic">
                <div className="Green" style={{width:Math.ceil(100*objectivesDone/objectives.length)+"%"}}></div>
            </div>
            <div className="buttonContainer">
                <button className="Title" onClick={toggleExpand}><b>{num}</b> - {challengeList.challenges[num].name}</button>
                <div className="smallButtons">
                    <button className="favoriteButton" onClick={()=>{
                        dispatch(toggleFavorited(num));
                    }}></button>
                    <button className="completeAllButton" onClick={()=>{
                        setAllCompleted(num);
                    }}></button>
                </div>
            </div>
            {bars}
            {/* <button onClick={toggleComplete}>Toggle Complete
            </button> */}
        </div>
    );
}


export default Challenge;