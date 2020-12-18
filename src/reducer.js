import initState from "./initState";


function updateObjectInArray(array, action){
    return[...array.slice(0, action.index), action.item, ...array.slice(action.index+1)];
}

function pushObjectToArray(array, value){
    if(!array.includes(value)){
        return [...array, value];
    }
    return [...array];
}
function removeObjectInArray(array, value){
    return array.filter((obj)=> {return obj!=value});
}
console.log(removeObjectInArray([0, 1, 2], 0))
export default function appReducer(state = initState, action) {
    switch(action.type){
        case 'challenges/setFavorite':
            return {
                ...state,
                challenges:{
                    ...state.challenges,
                    favorited: pushObjectToArray(state.challenges.favorited, action.payload)
                }
            }
        case 'challenges/removeFavorite':
            return {
                ...state,
                challenges:{
                    ...state.challenges,
                    favorited: removeObjectInArray(state.challenges.favorited, action.payload)
                }
            }

        case 'challenges/setChallengesDone':
            return{
                ...state,
                challengesDone: action.payload
            }
        case 'challenges/setExpanded':
            return {
                ...state,
                challenges:{
                    ...state.challenges,
                    [action.payload.num]:{
                        ...state.challenges[action.payload.num],
                        expanded: action.payload.value
                    }
                }
            }

        case 'challenges/setChallengeObjectivesDone':
            return {
                ...state,
                challenges:{
                    ...state.challenges,
                    [action.payload.num]:{
                        ...state.challenges[action.payload.num],
                        objectivesDone: action.payload.value
                    }
                }
            }

        case 'challenges/objectiveSet':
            let num = action.payload.num;
            return {
                ...state,
                objectives:{
                    ...state.objectives,
                    [num]:{
                        ...state.objectives[num],
                        done: action.payload.value
                    }
                }
            }
        
        
        
        default:
            return state;
        
    }
}