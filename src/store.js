import { createStore } from 'redux'
import rootReducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import initState from './initState'
import { debounce } from 'lodash'

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return initState;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return initState;
    }
}; 
const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
    }
};



const store = createStore(rootReducer, loadState(), composeWithDevTools());
let saveStoreState = ()=>{saveState(store.getState())}
store.subscribe(debounce(
  saveStoreState,2000
    ));

export default store