import { Box, Tab, Tabs } from "@mui/material";

export default function Sidebar({ value, onChange }) {
  return (
    <Tabs
      orientation="vertical"
      value={value}
      onChange={onChange}
      sx={{
        width: 200,
        "& .MuiTabs-indicator": {
          width: "3px",
          backgroundColor: "#2196f3",
          left: "auto",
          right: 0,
        },
      }}
    >
      {["MAIN", "JOB SEARCH", "ADMIN", "MANAGE APPLICANTS"].map((label) => (
        <Tab
          key={label}
          label={label}
          sx={{
            alignItems: "flex-start",
            textAlign: "left",
            minHeight: "40px",
            padding: "10px 16px",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            color: "#6b7280",
            backgroundColor: "transparent",
            "&.Mui-selected": {
              color: "#2196f3",
              backgroundColor: "#e8f2fd",
            },
          }}
        />
      ))}
    </Tabs>
  );
}
