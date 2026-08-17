import { useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const headStyle = {
  fontSize: "13px",
  color: "#616161",
  padding: "10px",
  whiteSpace: "nowrap",
};

const cellStyle = {
  fontSize: "13px",
  color: "#212121",
  padding: "10px",
  whiteSpace: "nowrap",
};

export default function JobTable({ jobs, onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  function handleMenuOpen(event, id) {
    setAnchorEl(event.currentTarget);
    setOpenMenuId(id);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    setOpenMenuId(null);
  }

  function handleEdit(job) {
    handleMenuClose();
    onEdit(job);
  }

  function handleDelete(id) {
    handleMenuClose();
    onDelete(id);
  }

  return (
    <TableContainer sx={{ backgroundColor: "#ffffff", borderRadius: "8px", overflowX: "auto" }}>
      <Table sx={{ minWidth: "900px" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headStyle}>Title</TableCell>
            <TableCell sx={headStyle}>Category</TableCell>
            <TableCell sx={headStyle}>Level</TableCell>
            <TableCell sx={headStyle}>Location</TableCell>
            <TableCell sx={headStyle}>Phone number</TableCell>
            <TableCell sx={headStyle}>Application</TableCell>
            <TableCell sx={headStyle}>Closing</TableCell>
            <TableCell sx={headStyle}>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} sx={{ borderBottom: "1px solid #e0e0e0" }}>
              <TableCell sx={cellStyle}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Avatar src={job.img} sx={{ width: "32px", height: "32px" }} />
                  {job.title}
                </Box>
              </TableCell>

              <TableCell sx={cellStyle}>{job.category}</TableCell>
              <TableCell sx={cellStyle}>{job.level}</TableCell>
              <TableCell sx={cellStyle}>{job.city || job.location}</TableCell>
              <TableCell sx={cellStyle}>{job.phone}</TableCell>

              <TableCell sx={{ padding: "10px" }}>
                <Chip
                  label={job.application}
                  sx={{
                    height: "24px",
                    backgroundColor: "#eeeeee",
                    color: "#424242",
                    fontSize: "12px",
                  }}
                />
              </TableCell>

              <TableCell sx={cellStyle}>{job.closing ? job.closing.slice(0, 10) : ""}</TableCell>

              <TableCell sx={{ padding: "10px" }}>
                <IconButton onClick={(event) => handleMenuOpen(event, job.id)}>
                  <MoreVertIcon />
                </IconButton>

                <Menu anchorEl={anchorEl} open={openMenuId === job.id} onClose={handleMenuClose}>
                  <MenuItem onClick={() => handleEdit(job)}>Edit</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Info</MenuItem>
                  <MenuItem onClick={() => handleDelete(job.id)} sx={{ color: "#d32f2f" }}>
                    Delete
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
