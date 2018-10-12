import React, {Component} from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import {blue, red} from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red,
    },
});

const cellHeight = 440;
const cellWidth = 316;
const fallback = "https://upload.wikimedia.org/wikipedia/commons/4/48/Inverted_question_mark_alternate.png";

class Main extends Component {
    componentDidMount() {
        window.onkeyup = function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            console.log("Key pressed: " + key);
            if (key == 82) {
                this.props.random();
            }

            if (key == 80) {
                this.props.prechosen();
            }
        }.bind(this);
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <GridList cellHeight={cellHeight} cols={4} spacing={20}>
                    {this.props.questions.map((row, i) =>
                        this.renderQuestion(row, i)
                    )}
                    {this.props.answers.map((row, i) =>
                        this.renderAnswer(row, i)
                    )}
                </GridList>
            </MuiThemeProvider>
        );
    }

    renderQuestion(data, key) {
        return <GridListTile key={key} cols={1}>
            <Card style={{
                maxWidth: cellWidth, minHeight: cellHeight, backgroundColor: "black",
                "WebkitPrintColorAdjust": "exact"
            }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={data.Pic ? data.Pic : fallback}
                />
                <CardContent style={{paddingTop: "2px"}}>
                    <Typography style={{fontSize: 6, color: "white", marginBottom: 20, marginTop: 0}}>
                        {data.I + " " + data.O}
                    </Typography>
                    <Typography component="p" style={{color: "white", marginBottom: 20}}>
                        {data.L1}
                    </Typography>
                    <Typography component="p" style={{color: "white", marginBottom: 20}}>
                        {data.L2}
                    </Typography>
                    <Typography style={{color: "white"}}>
                        {"Toma / Nimm: " + data.NumAnswers}
                    </Typography>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </GridListTile>
    }

    renderAnswer(data, key) {
        return <GridListTile key={key} cols={1}>
            <Card style={{
                maxWidth: cellWidth, minHeight: cellHeight, backgroundColor: "white",
                "WebkitPrintColorAdjust": "exact"
            }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={data.Pic ? data.Pic : fallback}
                />
                <CardContent style={{paddingTop: "2px"}}>
                    <Typography style={{fontSize: 6, color: "black", marginBottom: 20, marginTop: 0}}>
                        {data.I + " " + data.O}
                    </Typography>
                    <Typography component="p" style={{color: "black", marginBottom: 20}}>
                        {data.L1}
                    </Typography>
                    <Typography component="p" style={{color: "black", marginBottom: 20}}>
                        {data.L2}
                    </Typography>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </GridListTile>
    }
}

export default Main;
