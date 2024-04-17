import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../apis/Users';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUserModal from '../components/EditUserModal';
import EnhancedTableHead from '../components/EnhancedTableHead';
import { getComparator, stableSort } from '../helpers/tableHelpers';
import EnhancedTableToolbar from '../components/EnhancedTableToolbar';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import { deleteUser } from '../apis/Users';
import StatusAlert from '../components/StatusAlert';
import { Box, Button } from '@mui/material';

const headCells = [
  { id: 'username', label: 'Username' },
  { id: 'email', label: 'Email' },
  { id: 'name', label: 'Full Name' },
  { id: 'role', label: 'Role' },
];

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('username');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = React.useState(false);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = React.useState({});
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = users.map((user) => user.username);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(users, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [users, order, orderBy, page, rowsPerPage]
  );

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res.users);
      })
      .catch();
  }, [showEditModal]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
          setShowCreateUserModal(true);
        }}
      >
        Create User
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
            title='User'
            titlePlural='Users'
          />

          <Table
            sx={{
              minWidth: 750,
            }}
            aria-labelledby='tableTitle'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.username);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.username}
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
                        onClick={(event) => handleClick(event, row.username)}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'
                      sx={{
                        borderBottom: '1px solid black',
                      }}
                    >
                      {row.username}
                    </TableCell>
                    <TableCell align='left'>{row.email}</TableCell>
                    <TableCell align='left'>{row.name}</TableCell>
                    <TableCell align='left'>{row.role}</TableCell>
                    <TableCell padding='checkbox'>
                      <IconButton
                        onClick={() => {
                          setSelectedUser(row);
                          setShowEditModal(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setSelectedUser(row);
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
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component='div'
            count={users.length}
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
          {showCreateUserModal && (
            <EditUserModal
              open={showCreateUserModal}
              setShowEditModal={setShowCreateUserModal}
              setError={setError}
              setSuccess={setSuccess}
              action='Create'
              selectedUser={{}}
            />
          )}
          {showEditModal && (
            <EditUserModal
              selectedUser={selectedUser}
              open={showEditModal}
              setShowEditModal={setShowEditModal}
              setError={setError}
              setSuccess={setSuccess}
              action='Edit'
            />
          )}
          {showDeleteConfirmDialog && (
            <DeleteConfirmDialog
              selectedItem={selectedUser}
              itemType='User'
              name={selectedUser.username}
              open={showDeleteConfirmDialog}
              deleteFunc={deleteUser}
              setShowDeleteConfirmDialog={setShowDeleteConfirmDialog}
              setError={setError}
              setSuccess={setSuccess}
            />
          )}
          {error && (
            <StatusAlert
              message={error}
              setMessage={setError}
              status='alert-danger'
            />
          )}
          {success && (
            <StatusAlert
              message={success}
              setMessage={setSuccess}
              status='alert-success'
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
}
