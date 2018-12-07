import cards from '../data/cards';
import {Actions} from "../actions";
import _ from "lodash";

console.log(cards.length);

let initialState = {counter: 0, cards : cards};

let prechosen = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.RANDOM:
            state.cards = getRandomSubarray(cards, 1);

            return _.cloneDeep(state);
        case Actions.PRECHOSEN:
            state.cards = getForIds(cards, prechosen[state.counter].cards);

            console.log(state);

            return _.cloneDeep(state);
        default:
            return state
    }
};

function getForIds(arr, ids) {
    let res = [];
    ids.map((id, i) => {
            res[i] = getForId(arr, id);
        }
    );

    return res;
}

function getForId(arr, id) {
    return arr.filter((row) => {
        return row.I === id
    })[0]
}

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

export default reducer
