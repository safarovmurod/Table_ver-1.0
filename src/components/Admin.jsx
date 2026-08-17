import { useEffect, useState } from "react";
import { Box, Button, MenuItem, Pagination, Stack, TextField } from "@mui/material";
import JobTable from "./JobTable";
import UserModal from "./UserModal";
import { categories, levels } from "../data/data";
import {
  getUsers,
  searchUsers,
  selectUsers,
  countUsers,
  addUser,
  editUser,
  deleteUser,
} from "../function/function";

const limit = 6;
const fieldStyle = { flex: 1, backgroundColor: "#ffffff" };

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // кадом функсияро кор фармоем — аз ҳолати филтрҳо вобаста аст
  async function loadUsers() {
    let list = [];

    if (search) {
      list = await searchUsers(search, page, limit);
    } else if (category || level) {
      list = await selectUsers(category, level, page, limit);
    } else {
      list = await getUsers(page, limit);
    }

    const count = await countUsers(search, category, level);
    setUsers(list);
    setTotal(count);
  }

  useEffect(() => {
    loadUsers();
  }, [page, search, category, level]);

  function handleSearch(event) {
    setSearch(event.target.value);
    setPage(1);
  }

  function handleCategory(event) {
    setCategory(event.target.value);
    setPage(1);
  }

  function handleLevel(event) {
    setLevel(event.target.value);
    setPage(1);
  }

  function handlePage(event, newPage) {
    setPage(newPage);
  }

  function handleCreate() {
    setSelectedUser(null);
    setOpen(true);
  }

  function handleEdit(user) {
    setSelectedUser(user);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setSelectedUser(null);
  }

  async function handleSave(form) {
    if (selectedUser) {
      await editUser(selectedUser.id, form);
    } else {
      await addUser(form);
    }
    handleClose();
    loadUsers();
  }

  async function handleDelete(id) {
    await deleteUser(id);

    // агар дар саҳифа охирин user буд — як саҳифа ақиб мегардем
    if (users.length === 1 && page > 1) {
      setPage(page - 1);
    } else {
      loadUsers();
    }
  }

  const pageCount = Math.ceil(total / limit);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={handleSearch}
          sx={fieldStyle}
        />

        <TextField
          select
          label="Category"
          size="small"
          value={category}
          onChange={handleCategory}
          sx={fieldStyle}
        >
          <MenuItem value="">Choose an option</MenuItem>
          {categories.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Experience level"
          size="small"
          value={level}
          onChange={handleLevel}
          sx={fieldStyle}
        >
          <MenuItem value="">Choose an option</MenuItem>
          {levels.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          onClick={handleCreate}
          sx={{
            bgcolor: "#2196f3",
            fontSize: "11px",
            padding: "6px 16px",
            whiteSpace: "nowrap",
            boxShadow: "none",
          }}
        >
          CREATE NEW
        </Button>
      </Box>

      <Box sx={{ marginTop: "24px" }}>
        <JobTable jobs={users} onEdit={handleEdit} onDelete={handleDelete} />
      </Box>

      <Stack spacing={2} sx={{ marginTop: "24px", alignItems: "center" }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePage}
          color="primary"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#2196f3",
              color: "#ffffff",
            },
          }}
        />
      </Stack>

      <UserModal
        open={open}
        user={selectedUser}
        onClose={handleClose}
        onSave={handleSave}
      />
    </Box>
  );
}
