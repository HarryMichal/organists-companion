import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  paper: {

  },
})

class TableHeader extends React.PureComponent {
  render() {
    return(
      <div></div>
    )
  }
}

class PsalmsTable extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { classes, psalms, filter } = this.props;
    
    return(
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
              Číslo
              </TableCell>
              <TableCell>
              Text
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {psalms.map(row => {
            return(
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" numeric>{row.id}</TableCell>
                <TableCell>
                  {row.text}
                </TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(PsalmsTable);
