import { Box, Button, Chip, Typography } from "@mui/material";

export default function Card({ user }) {
  return (
    <Box
      sx={{
        width: "435px",
        bgcolor: "#ffffff",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        marginTop: "30px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography sx={{ fontSize: "17px", color: "#212121" }}>{user.title}</Typography>
          <Typography sx={{ fontSize: "12px", color: "#9e9e9e", marginTop: "2px" }}>
            {user.category}
          </Typography>
        </Box>

        <Chip
          label={user.level}
          sx={{
            height: "22px",
            bgcolor: "#d6e4f7",
            color: "#1565c0",
            fontSize: "11px",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#2196f3",
            fontSize: "11px",
            padding: "6px 14px",
            boxShadow: "none",
          }}
        >
          SEE MORE
        </Button>

        <Typography sx={{ fontSize: "13px", color: "#424242" }}>{user.city || user.location}</Typography>
      </Box>
    </Box>
  );
}
