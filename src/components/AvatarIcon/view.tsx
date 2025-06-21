import { Avatar, Box, Typography } from "@mui/material";
import { AvatarIconViewProps } from "./types";

type ComponentType = React.FC<AvatarIconViewProps>;
export const AvatarIconView: ComponentType = (props) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Avatar
        sx={{
          bgcolor: "success.main",
          width: 56,
          height: 56,
          margin: "0 auto 8px",
        }}
      ></Avatar>
      <Typography variant="h5" fontWeight={600}>
        {props.title}
      </Typography>
    </Box>
  );
};
