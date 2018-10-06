import Main from "../components/main";
import React from 'react';
import {connect} from 'react-redux'
import {random, prechosen} from "../actions";

const mapStateToProps = (state, ownProps) => ({
    questions: state.questions,
    answers: state.answers,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    random: function (data) {
        dispatch(random(data));
    },
    prechosen: function (data) {
        dispatch(prechosen(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main)
