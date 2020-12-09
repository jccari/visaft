import {useContext, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { AppContext } from "contexts/AppContext";
import {cloneDeep, isEqual} from "lodash"
import Tweet from "../tweets/tweet";

const useStyles2 = makeStyles({
  table: {
    minWidth: 300,
    maxWidth: 400,
  },
  tableCell: {
    padding: 0,
    width: '100%'
  }
});

export default function VisTweetsPagination() {
  const classes = useStyles2();
  const {visTweets, totalVisTweets, dimensionSelected, keywordsFilter} = useContext(AppContext)
  // console.log("visTweets", visTweets)
  // const [rows, setRows] = useState(cloneDeep(visTweets))
  // const [rows, setRows] = useState(null)
  let rows = cloneDeep(visTweets)
  // console.log("rows", rows)
  let dim = dimensionSelected
  let keyFilter = keywordsFilter

  // console.log("equal", isEqual(visTweets, rows))
  // console.log("equal", JSON.stringify(visTweets)==JSON.stringify(rows))

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (!rows)
    return "Selecciona un elemento del gráfico"

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {/* <p className="font-weight-bold mt-0 mb-0">DIMENSION: {dim}</p> */}
      {/* <p className="font-weight-bold">INCLUYE: {keyFilter}</p> */}
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {((rows && rowsPerPage > 0)
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" className={classes.tableCell}>
                <Tweet item={row}/>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[2,5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={totalVisTweets}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              // ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
  );
}
