import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./Objective.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import challengeList from "../../challengeList.js";
import objectiveList from "../../objectiveList";
import ToggleBar from '../ToggleBar/ToggleBar';
import store from '../../store';
import ObjToChallenge from "../../ObjectiveToChallengeMap.js";
import { 
    setChallengeCompletion,
    setChallengesDone,
 }
 from "../../actionCreators";

function Objective(props){
    const dispatch = useDispatch();
    
    const num = props.num;
    const challengeNum = ObjToChallenge[num];
    const objective = objectiveList.objectives[num];

    const done = useSelector(state=> state.objectives[num].done)
    const favorited = useSelector(state=> state.challenges.favorited);
    const favorite = favorited.includes(challengeNum)

    var complete = favorite ? 2 : 0;
    if(done === objective.total){
        complete = 1;
    }
    const color = ["#d95f5f", "#51d63a", "#d4b020"][complete];
    function inc_obj(){
        let objectivesDone = store.getState().challenges[challengeNum].objectivesDone;
        setChallengeCompletion(challengeNum, objectivesDone+1);
    }
    function dec_obj(){
        let objectivesDone = store.getState().challenges[challengeNum].objectivesDone;
        setChallengeCompletion(challengeNum, objectivesDone-1, true);
    }

    const bar = ()=>{
        if(objective.total === 1){
            return <ToggleBar 
            i = {inc_obj}
            d = {dec_obj}
            num = {num}/>
        }
        else{
            return <ProgressBar 
            i = {inc_obj}
            d = {dec_obj}
            num = {num}/>
        }
    }
    return(
        <div className={"Objective"} style={{backgroundColor:color}}>
            {challengeNum+1} - {challengeList.challenges[challengeNum].name}
            {bar()}
        </div>
        
    )

}
export default Objective