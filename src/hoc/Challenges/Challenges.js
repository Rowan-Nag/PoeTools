import React, { useState } from 'react';
import "./Challenges.css";
import Challenge from '../../components/Challenge/Challenge';
import Objective from '../../components/Objective/Objective';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import challengeList from "../../challengeList.js";
import objectiveList from "../../objectiveList.js";
import { useSelector } from "react-redux";
import { range } from 'lodash';
import store from '../../store';

function Challengesc() {

    var challenges = [];
    var objectives = [];

    const favorites = useSelector(state=>state.challenges.favorited)
    const challengesDone = useSelector(state=>state.challengesDone);
    const [view, setView] = useState(0);
    const objectiveCompletion = useSelector(state=>state.objectives);
    const checkObjCompleted = (num)=>{
        
        return objectiveCompletion[num].done == objectiveList.objectives[num].total;
    }

    const orderGoals = (count = 162, offset = 0, goals = [])=>{
        if(count < 0){
            return goals;
        }
        //console.log(goals);
        //completed -> beginning  
        // favorited -> end 
        // else -> middle 
        // then flip!
        if(checkObjCompleted(count)){
            
            // let o = [...orderGoals(count+1, offset), count]
            // console.log("completed " + count)
            // console.log(o);
            return orderGoals(count-1, offset, [...goals, count,])
        }
        else if(favorites.includes(objectiveList.objectives[count].challenge)){
            
            // let o = [count, ...orderGoals(count+1, offset+1)]
            // console.log("favorite " + count)
            // console.log(o);
            return orderGoals(count -1, offset+1, [count, ...goals,])
        }else{
            // let a = orderGoals(count+1, offset);
            // a.splice(offset, 0, count)
            // console.log("normal " + count + " offset: " + offset)
            // console.log(a)
            goals.splice(offset, 0, count)
            return orderGoals(count-1, offset, goals);
        }
        


    }

    if(view === 0){
        for(let i = 0; i < challengeList.count; i++){
            challenges.push(
                <div className={"ChallengeBox"} key = {i}>
                    <Challenge num = {i}/>
                </div>)
        }
        
    }else{
        let goalOrder = orderGoals();
        //console.log(goalOrder);
        goalOrder.map((item)=>{
            objectives.push(
                <div className={"ObjectiveBox"} key = {item}>
                    <Objective num = {item}/>
                </div>
            )
        })
        
    }

    function clearCookies(){
        localStorage.setItem('state', {});
        
    }

    return (
        <div>
           
            <div className={"Challenges"}>
                <div className="UtilityBox">
                    <button onClick={clearCookies}>Wipe Save</button>
                    <div>{challengesDone}/40 challenges completed!</div>
                    <button onClick={()=>{setView((view+1)%2)}}>
                        {["objectives", "challenges"][view]}
                    </button>
                </div>
                {view === 0 ? challenges : objectives}
            </div>
        </div>
    )
}
export default Challengesc;