import questions from '../data/q';
import answers from '../data/a';
import {Actions} from "../actions";
import _ from "lodash";

let initialState = {counter: 0, questions: questions, answers: answers};

let prechosen = [{questions: [493], answers: [2001, 12, 349]}, {questions: [872], answers: [116]}];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.RANDOM:
            state.questions = getRandomSubarray(questions, 1);
            state.answers = getRandomSubarray(answers, 10);

            return _.cloneDeep(state);
        case Actions.PRECHOSEN:
            state.questions = getForIds(questions, prechosen[state.counter].questions);
            state.answers = getForIds(answers, prechosen[state.counter].answers);
            state.counter = state.counter + 1;

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
