import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { RegisterFormViewProps } from "./types";
import { ReactComponent as EyeOpen } from "../../../../assets/svg/eye-open-svgrepo-com.svg";
import { ReactComponent as EyeClosed } from "../../../../assets/svg/eye-close-svgrepo-com.svg";

type ComponentType = React.FC<RegisterFormViewProps>;
export const RegisterFormView: ComponentType = (props) => {
  return (
    <Box component="form" onSubmit={props.handleSubmit} sx={{ gap: 2 }}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Please fill in the details below to create your account.
      </Typography>
      <TextField
        label="First Name"
        type="text"
        name="firstName"
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Last Name"
        type="text"
        name="lastName"
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        type={props.showPassword ? "text" : "password"}
        name="password"
        fullWidth
        required
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => props.setShowPassword((prev: boolean) => !prev)}
                aria-label={
                  props.showPassword ? "Hide password" : "Show password"
                }
              >
                {props.showPassword ? (
                  <EyeClosed style={{ width: 20, height: 20 }} />
                ) : (
                  <EyeOpen style={{ width: 20, height: 20 }} />
                )}{" "}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Confirm Password"
        type={props.showPassword ? "text" : "password"}
        name="confirmPassword"
        fullWidth
        required
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => props.setShowPassword((prev: boolean) => !prev)}
                aria-label={
                  props.showPassword ? "Hide password" : "Show password"
                }
              >
                {props.showPassword ? (
                  <EyeClosed style={{ width: 20, height: 20 }} />
                ) : (
                  <EyeOpen style={{ width: 20, height: 20 }} />
                )}{" "}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        type="submit"
        fullWidth
        disabled={props.loading} // ← disable while loading
        sx={{ mt: 1, py: 1.2, position: "relative" }}
        color="success"
      >
        {props.loading ? (
          <CircularProgress size={24} color="inherit" /> // ← spinner
        ) : (
          "Create Account"
        )}
      </Button>
    </Box>
  );
};
