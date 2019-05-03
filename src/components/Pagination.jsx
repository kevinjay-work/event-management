import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
   
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;
function createData(eventName, eventCategory, eventOrganizer) {
  counter += 1;
  return { id: eventName, eventCategory, eventOrganizer };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
    constructor(props){
        super(props)
        this.state={
        events:[],
        rows: [].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
          page: 0,
          rowsPerPage: 5,
          pressCategory: ''
        }
    }
    componentDidMount() {
        //api call for events

        axios.get( `http://api.my-events.site/api/v1/events/`
            // baseUrl : `http://api.my-events.site/api/v1/categories/`,
            // responseType: "application/json",
            // headers : `9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`

        )
          .then(res => {
            console.log(res.data);
            this.setState({events:res.data.results, rows:res.data.results})
            
          })


      }
  

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
          <TableHead>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell align="right">Event Category</TableCell>
            <TableCell align="right">Event Organizer</TableCell>
            <TableCell align="right">StartTime <br/> End Time</TableCell>
            <TableCell align="right">Min Ticket <br/> Max Ticket</TableCell>
            <TableCell align="right">Ticket Price Currency</TableCell>

            
          </TableRow>
        </TableHead>
            <TableBody>
       

              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  let x = (row.category &&row.category.name)
                 if(this.props.pressCategory && this.props.pressCategory === x)
                {
                    //console.log("ssssssssssssssssssssssss",this.props.pressCategory)
                    
               return(

                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <a href={row.uri}>{row.name}</a>
                  </TableCell>
                  <TableCell align="right">{row.category && row.category.name}</TableCell>
                  <TableCell align="right">{row.organizer.name}</TableCell>
                  <TableCell align="right">{row.start_time} <br/> {row.finish_time}</TableCell>
                  <TableCell align="right">{row.min_ticket_price}<divider/> {row.max_ticket_price}</TableCell>
                  <TableCell align="right">{row.ticket_price_currency}</TableCell>
                </TableRow>
              )
            }

            }
              
              
              
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);