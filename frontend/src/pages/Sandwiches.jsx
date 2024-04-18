import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Container, Stack } from '@mui/material';
import SandwichModal from '../components/SandwichModal';
import { deleteSandwich, getAllSandwiches } from '../apis/Sandwiches';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import StatusAlert from '../components/StatusAlert';
import EnhancedTableHead from '../components/EnhancedTableHead';
import { getComparator, stableSort } from '../helpers/tableHelpers';
import EnhancedTableToolbar from '../components/EnhancedTableToolbar';

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'price', label: 'Price' },
  { id: 'description', label: 'Description' },
  { id: 'ingredients', label: 'Ingredients' }
];

const Sandwiches = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [sandwiches, setSandwiches] = useState([]);
  const [selectedSandwich, setSelectedSandwich] = useState(null);
  const [showCreateSandwichModal, setShowCreateSandwichModal] = useState(false);
  const [showEditSandwichModal, setShowEditSandwichModal] = useState(false);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = sandwiches.map((sandwich) => sandwich.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sandwiches.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(sandwiches, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, sandwiches]
  );

  useEffect(() => {
    getAllSandwiches()
      .then((res) => {
        setSandwiches(res.sandwiches);
      })
      .catch();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Button
        style={{
          fontFamily: 'Gill Sans',
          fontSize: '18px',
        }}
        sx={{
          color: 'green',
          marginLeft: 'auto',
        }}
        onClick={() => {
          setShowCreateSandwichModal(true);
        }}>
        Create Sandwich
      </Button>
      <Container
        sx={{
          width: '100%',
          marginLeft: 'auto',
          overflowX: 'auto',
          marginTop: '20px',
          marginBottom: '20px',
          backgroundColor: 'rgba(248, 223, 139, 0.4)',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px 1px black',
        }}
      >
        <Stack sx={{ alignItems: 'left' }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            title='Sandwich'
            titlePlural='Sandwiches'
          />
          <TableContainer>
            <Table
              sx={{
                minWidth: 750,
              }}
              aria-labelledby='tableTitle'
              size={'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={sandwiches.length}
                headCells={headCells}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.ss);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      sx={{
                        borderBottom: '1px solid black',
                        '.MuiTableCell-root': {
                          borderBottom: 'none',
                        },
                      }}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.name)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        sx={{
                          borderBottom: '1px solid black',
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align='left'>${row.price}</TableCell>
                      <TableCell align='left'>{row.description}</TableCell>
                      <TableCell align='left'>{row.ingredients.join(', ')}</TableCell>
                      <TableCell padding='checkbox'>
                        <IconButton
                          onClick={() => {
                            setSelectedSandwich(row);
                            setShowEditSandwichModal(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setSelectedSandwich(row);
                            setShowDeleteConfirmDialog(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component='div'
            count={sandwiches.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
              alignContent: 'center',
              margin: '0px',
              '& .MuiTablePagination-selectLabel': {
                margin: '0px',
              },
              '& .MuiTablePagination-displayedRows': {
                margin: '0px',
              },
            }}
          />
          {showCreateSandwichModal &&
            <SandwichModal
              action='Create'
              open={showCreateSandwichModal}
              setShowCreateSandwichModal={setShowCreateSandwichModal}
              setError={setError}
              setSuccess={setSuccess}
              selectedSandwich={{}}
            />
          }
          {showEditSandwichModal &&
            <SandwichModal
              action='Edit'
              open={showEditSandwichModal}
              setShowCreateSandwichModal={setShowEditSandwichModal}
              setError={setError}
              setSuccess={setSuccess}
              selectedSandwich={selectedSandwich}
            />
          }
          {showDeleteConfirmDialog &&
            <DeleteConfirmDialog
              selectedItem={selectedSandwich}
              itemType='Sandwich'
              name={selectedSandwich.name}
              open={showDeleteConfirmDialog}
              deleteFunc={deleteSandwich}
              setShowDeleteConfirmDialog={setShowDeleteConfirmDialog}
              setError={setError}
              setSuccess={setSuccess}
            />
          }
          {error &&
            <StatusAlert
              message={error}
              setMessage={setError}
              status='alert-danger'
            />
          }
          {success &&
            <StatusAlert
              message={success}
              setMessage={setSuccess}
              status='alert-success'
            />
          }
        </Stack>
      </Container>
    </Box>
  );
};

export default Sandwiches;