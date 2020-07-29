import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';

import MoreIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import DenseTable from './productList'
import { red } from '@material-ui/core/colors';

// Dialog Here
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

//Table Here 
function createData(name, calories, fat, carbs, protein, icon) {
  return { name, calories, fat, carbs, protein, icon };
}

const rows = [
  createData('Numan Arshad', 'numanuet311@gmail.com', '03086415241', 'Sale Agent', 'Uet',
    <div>
      <EditIcon /><MoreIcon style={{ marginLeft: 10 }} /></div>),
  createData('Numan Arshad', 'numanuet311@gmail.com', '03086415241', 'Customer', 'Uet',
    <div><EditIcon /><DeleteIcon style={{ marginLeft: 10 }} /></div>),
  createData('Numan Arshad', 'numanuet311@gmail.com', '03086415241', 'Sale Agent', 'Uet',
    <div><EditIcon /><DeleteIcon style={{ marginLeft: 10 }} /></div>),
  createData('Ali', 'numanuet311@gmail.com', '03086415241', 'Sale Agent', 'Uet',
    <div><EditIcon /><DeleteIcon style={{ marginLeft: 10 }} /></div>),
  createData('Ahmad Hassan', 'numanuet311@gmail.com', '03086415241', 'Sale Agent', 'Uet',
    <div><EditIcon /><DeleteIcon style={{ marginLeft: 10 }} /></div>),
  //createData('Ali', 'Hassan', 25.0, 51, 4.9),
  //createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
  // createData('Honeycomb', 408, 3.2, 87, 6.5),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Jelly Bean', 375, 0.0, 94, 0.0),
  // createData('KitKat', 518, 26.0, 65, 7.0),
  // createData('Lollipop', 392, 0.2, 98, 0.0),
  // createData('Marshmallow', 318, 0, 81, 2.0),
  // createData('Nougat', 360, 19.0, 9, 37.0),
  // createData('Oreo', 437, 18.0, 63, 4.0),
];



function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { label: ' Agent Name', numeric: false, disablePadding: true, id: 'Numan' },
  //  { label: 'Last Name', numeric: true, disablePadding: false, id: 'Arshad' },
  { label: 'Customer Name', numeric: true, disablePadding: false, id: 'numanuet311@gmail.com' },
  { label: 'TargetStatusType', numeric: true, disablePadding: false, id: '03086415241' },
  { label: 'OrderStatusType', numeric: true, disablePadding: false, id: 'Sales Agent' },
  { label: 'More', numeric: true, disablePadding: false, id: 'Sales Age' }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'Select all desserts' }}
          /> */}
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    // marginTop:10
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              {/* Nutrition */}
            </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      {/* <div className={classes.actions}>
        {numSelected > 0 ? (
          
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <MoreIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div> */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: 60//theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

function ShowOrders(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [customerOrderItemslist, setCustomerOrderItems] = React.useState([]);
  //Modal Here
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Table Here
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = props.usersList.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleChangeDense(event) {
    setDense(event.target.checked);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.orders.length - page * rowsPerPage);
  // console.log(props.orders);
  return (
    <div className={classes.root}>
      {/* <Button variant="contained" color="primary" 
    
    style={{paddingTop:20,paddingBottom:20,marginLeft:20,cursor:'default'}}>Show Users</Button> */}
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.orders.length}
            />
            <TableBody>
              {stableSort(props.orders, getSorting(order, orderBy))  //rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (

                    <TableRow
                      hover

                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.agentName}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" onClick={event => handleClick(event, row.name)}>

                        {/* <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          /> */}
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.agentObject.firstName + ' ' + row.agentObject.lastName}
                      </TableCell>
                      <TableCell >{row.customerObject.customerObject.firstName + ' ' + row.customerObject.customerObject.lastName}</TableCell>
                      {(() => {

                        if (row.targetType == 'Pending') {

                          return < TableCell style={{ color: '#ff0000' }
                          }> {row.targetType}</TableCell>
                        }
                        else if (row.targetType == 'Visited') {

                          return < TableCell style={{ color: '#00ffff' }
                          }> {row.targetType}</TableCell>
                        }
                        else {

                          return < TableCell style={{ color: '#228B22' }
                          }> {row.targetType}</TableCell>
                        }

                      })()}
                      <TableCell >{row.orderType}</TableCell>
                      <TableCell onClick={
                        () => {
                          //props.createUser()//;props.history.push('/distributor/snd/users/User')
                        }
                      }>
                        <div>
                          {(() => {
                            if (row.productInventoryList.length == 0) {
                              return <Button variant="outlined" size="small" color="primary" disabled={true}>
                                Detail
                              </Button>
                            } else {
                              return <Button variant="outlined" size="small" color="primary"
                                onClick={
                                  () => {
                                    setOpen(true), setCustomerOrderItems(row.productInventoryList)
                                  }
                                }
                              >
                                Detail
                              </Button>
                            }
                          })()}

                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.orders.length} //rows
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      <div>
        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open dialog
      </Button> */}
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Customer Product
        </DialogTitle>
          <DialogContent dividers>
            <DenseTable customerOrderItemslist={customerOrderItemslist} />
          </DialogContent>
        </Dialog>

      </div>
    </div >
  );
}
export default withRouter(ShowOrders)