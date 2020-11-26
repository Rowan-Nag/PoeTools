import React from 'react';
import "./Challenges.css";
import Challenge from '../../components/Challenge/Challenge';

function Challengesc() {
    
    return (
        <div className={"Challenges"}>
            Challenges
            <div name={"Complete Simple Objectives"} className={"info"}></div>
            <Challenge name={"Roa Killing!"}/>
        </div>
    )
}
export default Challengesc;