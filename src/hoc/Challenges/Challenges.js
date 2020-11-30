import React from 'react';
import "./Challenges.css";
import Challenge from '../../components/Challenge/Challenge';
import challengeList from "../../challengeList.js";
import Cookies from "js-cookie";

function Challengesc() {

    var challenges = [];

    for(let i = 0; i < challengeList.count; i++){
        let startingHeight = Cookies.get("C"+(i+1)+"H") || 60;
        let objectivesDone = parseInt(Cookies.get("C"+(i+1)+"O") || 0);
        let completed = 0;
        if(objectivesDone == challengeList[i+1].objectives.length){
            completed = 1;
        }
        challenges.push(
            <div className={"ChallengeBox"}>
                <Challenge
                key = {i}
                num = {i+1}
                maxHeight = {startingHeight}
                objectives = {objectivesDone}
                complete = {completed}/>
            </div>)
    }

    function clearCookies(){
        Object.keys(Cookies.get()).forEach(function(cookieName) {
            Cookies.remove(cookieName);
          });
    }

    return (
        <div>
            
            <div className={"Challenges"}>
                <div className="UtilityBox">
                    <button onClick={clearCookies}>Wipe Save</button>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <button style={{width:"100%"}}>Sync with profile</button>
                        <input placeholder={"Profile Name"}></input>
                    </div>
                    <button>Other button 2</button>
                </div>
                {challenges}
            </div>
        </div>
    )
}
export default Challengesc;