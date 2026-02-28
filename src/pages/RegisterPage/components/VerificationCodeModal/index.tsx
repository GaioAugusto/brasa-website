import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/auth";
import { useLocale } from "../../../../contexts/Locale";
import {
  DescriptionTypography,
  HeaderBox,
  IconBox,
  StyledButton,
  StyledDivider,
  StyledMarkEmailReadIcon,
  StyledTextField,
  VerificationCodeBoxWrapper,
} from "./styles";

export interface VerificationCodeProps {
  readonly isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ComponentType = React.FC<VerificationCodeProps>;
export const VerificationCodeModal: ComponentType = (props) => {
  const { confirmPendingEmail } = useAuth();
  const { commonLocale, templatesLocale } = useLocale();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const onVerify = async () => {
    setLoading(true);
    setError(null);
    try {
      await confirmPendingEmail(code);
      props.setIsOpen(false);
      navigate("/login");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={props.isOpen} onClose={handleClose}>
      <VerificationCodeBoxWrapper>
        <HeaderBox>
          <Typography variant="h6" fontWeight="bold">
            {commonLocale.get("emailVerification")}
          </Typography>
          <IconButton onClick={handleClose} size="small" aria-label="close">
            <CloseIcon />
          </IconButton>
        </HeaderBox>

        <StyledDivider />

        <IconBox>
          <StyledMarkEmailReadIcon />
        </IconBox>

        <DescriptionTypography variant="body2" color="text.secondary">
          {templatesLocale.get("emailVerificationDescription")}
        </DescriptionTypography>

        <StyledTextField
          fullWidth
          label="Verification Code"
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          error={Boolean(error)}
          helperText={error ?? " "}
        />

        <StyledButton
          disabled={code.length === 0 || loading}
          onClick={onVerify}
        >
          {loading ? "Verifying..." : "Verify"}
        </StyledButton>
      </VerificationCodeBoxWrapper>
    </Modal>
  );
};
