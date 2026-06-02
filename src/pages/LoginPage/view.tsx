import React from "react";
import { useLocale } from "../../contexts/Locale";

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as EyeOpen } from "../../assets/svg/eye-open-svgrepo-com.svg";
import { ReactComponent as EyeClosed } from "../../assets/svg/eye-close-svgrepo-com.svg";
import { LoginPageViewProps } from "./types";
import { AvatarIcon } from "../../components/AvatarIcon";

type ComponentType = React.FC<LoginPageViewProps>;
export const LoginPageView: ComponentType = ({ handleSubmit, ...props }) => {
  const { commonLocale, templatesLocale } = useLocale();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 4rem)", // minus NavBar height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "grey.900" : "grey.100",
        px: 2,
      }}
    >
      <Card sx={{ width: 360, px: 3, py: 4, boxShadow: 4 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ textAlign: "center" }}>
            <AvatarIcon title={commonLocale.get("login")} />
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              required
              margin="normal"
            />

            <TextField
              label={commonLocale.get("password")}
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
                      onClick={() =>
                        props.setShowPassword((prev: boolean) => !prev)
                      }
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

            <FormControlLabel
              control={<Checkbox name="remember" color="success" />}
              label={commonLocale.get("rememberMe")}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={props.loading}
              sx={{ mt: 1, py: 1.2, position: "relative" }}
              color="success"
            >
              {props.loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                commonLocale.get("signIn")
              )}
            </Button>
          </Box>

          <Box
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            {templatesLocale.get("dontHaveAnAccount")}
            {/* <Link
              component={RouterLink}
              to="#"
              underline="hover"
              variant="body2"
            >
              Forgot password?
            </Link> */}
            <Link
              component={RouterLink}
              to="/register"
              underline="hover"
              variant="body2"
            >
              {commonLocale.get("signUp")}
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
