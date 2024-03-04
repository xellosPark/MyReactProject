const redux = require('redux');
const createStore = redux.createStore;
// action-types
const ADD_SUBSCRIBER = 'ADD_SUBSCRIBER'
// actions
const addSubscriber = () => {
    return {
        type: ADD_SUBSCRIBER
    }
}

// reducers
const initialState = {
    subscribers : 365
}
// 만일 state 값을없는 경우에 initialState 초기화
const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_SUBSCRIBER:
            return {
                ...state,
                subscribers : state.subscribers + 1
        }
        default: return state;
    }
}

// store

// subsccribe - view - dispatch