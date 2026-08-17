import { useEffect, useState } from "react";
import { Box, Button, Dialog, MenuItem, TextField, Typography } from "@mui/material";
import { categories, levels } from "../data/data";

const emptyUser = {
  title: "",
  category: "",
  level: "",
  city: "",
  phone: "",
  application: "",
  closing: "",
  img: "",
};

const fieldStyle = { backgroundColor: "#ffffff" };

export default function UserModal({ open, user, onClose, onSave }) {
  const [form, setForm] = useState(emptyUser);

  useEffect(() => {
    if (user) {
      setForm({
        ...emptyUser,
        ...user,
        closing: user.closing ? user.closing.slice(0, 10) : "",
      });
    } else {
      setForm(emptyUser);
    }
  }, [user, open]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit() {
    onSave(form);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ padding: "24px" }}>
        <Typography
          sx={{
            fontSize: "20px",
            color: "#212121",
            paddingBottom: "16px",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {user ? "Edit job" : "Create new"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          <TextField
            label="Title"
            name="title"
            size="small"
            value={form.title}
            onChange={handleChange}
            sx={fieldStyle}
          />

          <TextField
            select
            label="Category"
            name="category"
            size="small"
            value={form.category}
            onChange={handleChange}
            sx={fieldStyle}
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Experience level"
            name="level"
            size="small"
            value={form.level}
            onChange={handleChange}
            sx={fieldStyle}
          >
            {levels.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Location"
            name="city"
            size="small"
            value={form.city}
            onChange={handleChange}
            sx={fieldStyle}
          />

          <TextField
            label="Phone number"
            name="phone"
            size="small"
            value={form.phone}
            onChange={handleChange}
            sx={fieldStyle}
          />

          <TextField
            label="Application"
            name="application"
            size="small"
            value={form.application}
            onChange={handleChange}
            sx={fieldStyle}
          />

          <TextField
            label="Closing"
            name="closing"
            type="date"
            size="small"
            value={form.closing}
            onChange={handleChange}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={fieldStyle}
          />

          <TextField
            label="Image url"
            name="img"
            size="small"
            value={form.img}
            onChange={handleChange}
            sx={fieldStyle}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          <Button
            onClick={onClose}
            sx={{ fontSize: "12px", padding: "6px 14px", color: "#616161" }}
          >
            CANCEL
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: "#2196f3",
              fontSize: "12px",
              padding: "6px 18px",
              boxShadow: "none",
            }}
          >
            SAVE
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
