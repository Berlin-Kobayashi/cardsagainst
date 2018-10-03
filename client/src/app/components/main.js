import React, {Component} from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import {blue, red} from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import questions from '../data/q';
import answers from '../data/a';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red,
    },
});

class Main extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <GridList cellHeight={258.5} cols={4}>
                    {questions.map((row, i) =>
                        this.renderQuestion(row, i)
                    )}
                    {answers.map((row, i) =>
                        this.renderAnswer(row, i)
                    )}
                </GridList>
            </MuiThemeProvider>
        );
    }

    renderQuestion(data, key) {
        return <GridListTile key={key} cols={1}
                             style={{borderWidth: "1px", borderStyle: "dotted", backgroundColor: "lightgrey", "WebkitPrintColorAdjust":"exact"}}>
            <Typography component="p">
                {"ES: " + data.L1}
            </Typography>
            <Typography component="p">
                {"DE: " + data.L2}
            </Typography>
            <Typography>
                {"Toma / Nimm: " + data.NumAnswers}
            </Typography>
            <Typography style={{fontSize: 6, position: "absolute", bottom:0, left: 0}}>
                {data.I + " " + data.O}
            </Typography>
        </GridListTile>
    }

    renderAnswer(data, key) {
        return <GridListTile key={key} cols={1} style={{borderWidth: "1px", borderStyle: "dotted"}}>
            <Typography component="p">
                {"ES: " + data.L1}
            </Typography>
            <Typography component="p">
                {"DE: " + data.L2}
            </Typography>
            <Typography style={{fontSize: 6, position: "absolute", bottom:0, left: 0}} color="textSecondary">
                {data.I + " " + data.O}
            </Typography>
        </GridListTile>
    }
}

export default Main;
