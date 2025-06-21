import { Avatar, Box, Card, Divider, Typography } from "@mui/material";
import { AccountViewProps } from "./types";

type ComponentType = React.FC<AccountViewProps>;
export const AccountView: ComponentType = (props) => {
  const email = "test@gmail.com";
  const firstName = "first name";
  const lastName = "last name";
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 4rem)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: (t) => (t.palette.mode === "dark" ? "grey.900" : "grey.100"),
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 360,
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        {/* Header bar with BRASA green */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#2E7D32",
            px: 2,
            py: 1.5,
          }}
        >
          <Avatar
            src="/avatar-placeholder.png"
            alt="Profile"
            sx={{
              width: 64,
              height: 64,
              border: "2px solid #fff",
            }}
          />
          <Box
            component="img"
            src="/LogoUofT2021.png"
            alt="BRASA UofT Logo"
            sx={{
              height: 48,
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Body */}
        <Box sx={{ p: 2, bgcolor: "#fff" }}>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ textAlign: "center", mb: 0.5 }}
          >
            {firstName && lastName
              ? `${firstName} ${lastName}`
              : "First Name Last Name"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 2 }}
          >
            {email || "email@example.com"}
          </Typography>

          <Divider />

          <Box sx={{ mt: 2, display: "grid", rowGap: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Student ID
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>#########</strong>
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Member ID
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>BR-2025-XXX</strong>
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Valid Until
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Dec 2025</strong>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
