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

const cellHeight = 380;
const cellWidth = 272;
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
                    {this.props.cards.map((row, i) =>
                        this.renderCard(row, i)
                    )}
                </GridList>
            </MuiThemeProvider>
        );
    }

    renderCard(data, key) {
        let t = "green";

        switch (data.Type) {
            case "resource" :
                t = "blue";
                break;
            case "trait" :
                t = "yellow";
                break;

        }

        return <GridListTile key={key} cols={1}>
            <Card style={{
                maxWidth: cellWidth, minHeight: cellHeight, backgroundColor: "white",
                "WebkitPrintColorAdjust": "exact"
            }}>
                <CardMedia
                    component="img"
                    height="160"
                    image={data.Pic ? data.Pic : fallback}
                />
                <CardContent style={{paddingTop: "2px"}}>
                    <Typography component="p" style={{fontSize: 15, color: "black", marginBottom: 40}}>
                        {data.O}
                    </Typography>
                    <Typography component="p" style={{fontSize: 15, color: "black", marginBottom: 40}}>
                        {data.L1}
                    </Typography>
                    <Typography component="p" style={{fontSize: 15, color: "black", marginBottom: 20}}>
                        {data.L2}
                    </Typography>
                    <Typography component="p" style={{fontSize: 25, color: t, backgroundColor: t}}>
                        asdsd
                    </Typography>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </GridListTile>
    }
}

export default Main;
