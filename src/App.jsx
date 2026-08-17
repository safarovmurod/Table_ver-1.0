import { useEffect, useState } from "react";
import { Box, Container, MenuItem, TextField, Typography } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";
import Admin from "./components/Admin";
import { categories, levels } from "./data/data";
import { selectUsers } from "./function/function";

const titleStyle = {
  fontSize: "26px",
  color: "#212121",
  paddingBottom: "16px",
  borderBottom: "1px solid #e0e0e0",
};

const fieldStyle = { flex: 1, backgroundColor: "#ffffff" };

export default function App() {
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [users, setUsers] = useState([]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  async function get() {
    const data = await selectUsers(category, experience);
    setUsers(data);
  }

  useEffect(() => {
    get();
  }, [category, experience]);

  return (
    <Container maxWidth={false} sx={{ marginTop: "50px" }}>
      <Box sx={{ display: "flex", bgcolor: "#f8f9fa", minHeight: "100vh" }}>
        <Box sx={{ flexShrink: 0 }}>
          <Sidebar value={value} onChange={handleChange} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, padding: "32px" }}>
          {value === 0 && (
            <Box>
              <Typography sx={titleStyle}>Latest job</Typography>
            </Box>
          )}

          {value === 1 && (
            <Box>
              <Typography sx={titleStyle}>Job ads</Typography>

              <Box sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <TextField
                  select
                  label="Category"
                  size="small"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  sx={fieldStyle}
                >
                  <MenuItem value="">Choose an option</MenuItem>
                  {levels.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box
                sx={{
                  marginTop: "24px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {users.map((el) => (
                  <Card key={el.id} user={el} />
                ))}
              </Box>
            </Box>
          )}

          {value === 2 && (
            <Box>
              <Typography sx={titleStyle}>Admin</Typography>
              <Admin />
            </Box>
          )}

          {value === 3 && (
            <Box>
              <Typography sx={titleStyle}>Manage applicants</Typography>
              <Box sx={{ marginTop: "24px" }}></Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
