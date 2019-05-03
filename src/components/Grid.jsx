import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Appbar from "./Appbar";
import Pagination from "./Pagination";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import axios from "axios";
import { Divider } from "@material-ui/core";
import { categoryAction } from "../actions/index";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class CenteredGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      events: [],
      pressCategory: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://api.my-events.site/api/v1/categories/`
        // baseUrl : `http://api.my-events.site/api/v1/categories/`,
        // responseType: "application/json",
        // headers : `9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
      )
      .then(res => {
        //console.log(res.data.results);
        this.setState({ categories: res.data.results });
      });

    //api call for events

    axios
      .get(
        `http://api.my-events.site/api/v1/events/`
        // baseUrl : `http://api.my-events.site/api/v1/categories/`,
        // responseType: "application/json",
        // headers : `9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
      )
      .then(res => {
        //console.log(res.data.results);
        this.setState({ events: res.data.results });
      });
  }
  categoryClicked = x => {
    console.log(this.props.event);
    this.props.categoryAction(x);
    this.setState({ pressCategory: x });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Appbar />

        <Grid container spacing={24}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <h1>Categories</h1>
              {this.state.categories &&
                this.state.categories.map(item => {
                  let x = item.name;
                  return (
                    <div
                      key={"div-" + item.name}
                      onClick={this.categoryClicked.bind(this, x)}
                    >
                      <Button
                        key={"span-" + item.name}
                        type="button"
                        className="btn btn-light btn-block"
                      >
                        {" "}
                        {item.name}
                      </Button>
                      <Divider />

                      {/* <select>
                                <option value={item.name}></option>
                            </select> */}
                    </div>
                  );
                })}
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Pagination pressCategory={this.state.pressCategory} />
              {/* {this.state.events &&this.state.events.map(item=>{
                    return(
                        <div>
                            
                            <h2>Event Name : {item.name}</h2>
                            <a href={item.uri}>{item.uri}</a>
                            <br/>
                            <h6>Event Category: {item.category &&item.category.name}</h6>
                            <h6>Organizer Name: {item.organizer &&item.organizer.name}</h6>
                            <h6>Start-Time: {item.start_time}</h6>
                            <h6>Finish Time: {item.finish_time}</h6>

                            <Divider/>

                        </div>
                    )
                })

                } */}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state.event);
  return {
    event: state.event
  };
};
const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      categoryAction: categoryAction
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withStyles(styles)(CenteredGrid));
