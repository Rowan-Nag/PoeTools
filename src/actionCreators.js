//challenge specific actions
import store from "./store"
import challengeList from "./challengeList"
import objectiveList from "./objectiveList"


export function setAllCompleted(challengeNum){
    let c = challengeList.challenges[challengeNum]
    setChallengeCompletion(challengeNum, c.objectives.length);
    return c.objectives.map((item, index)=>{
        store.dispatch(setObj(item, objectiveList.objectives[item].total))
    })
    
    
}

export function setFavorited(challengeNum){
    return {
        type: "challenges/setFavorite",
        payload: challengeNum
    }
}
export function removeFavorited(challengeNum){
    return {
        type: "challenges/removeFavorite",
        payload: challengeNum
    }
}
export function toggleFavorited(challengeNum){
    if(store.getState().challenges.favorited.includes(challengeNum)){
        return removeFavorited(challengeNum);
    }
    return setFavorited(challengeNum);
}
export function setChallengesDone(diff){
    store.dispatch({
        type: "challenges/setChallengesDone",
        payload: (store.getState().challengesDone+diff)
    })
}

export function setChallengeCompletion(challengeNum, objectivesDone, decrease=false){
    let d = challengeList.challenges[challengeNum].objectives.length;
    if(objectivesDone===d){
        setChallengesDone(1);
    }
    if(decrease && objectivesDone === d-1){
        setChallengesDone(-1);
    }
    store.dispatch({
        type: "challenges/setChallengeObjectivesDone",
        payload: {
            num: challengeNum,
            value: objectivesDone
        }
    })
}

export function setExpanded(challengeNum, val){
    return {
        type: "challenges/setExpanded",
        payload: {
            num: challengeNum,
            value: val
        }
    }
}

//objective specific actions

export function setObj(objNum, val){
    return {
        type: "challenges/objectiveSet",
        payload: {
            num: objNum,
            value: val
        }
    }
}

