import Main from "../components/main";
import React from 'react';
import {connect} from 'react-redux'
import {start,tick} from "../actions";

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Main)
