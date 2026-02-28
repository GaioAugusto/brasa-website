import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
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
  const { commonLocale, templatesLocale } = useLocale();
  const [code, setCode] = useState("");

  const handleClose = () => {
    props.setIsOpen(false);
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
          inputProps={{ maxLength: 6 }}
        />

        <StyledButton
          fullWidth
          variant="contained"
          disabled={code.length === 0}
        >
          Verify
        </StyledButton>
      </VerificationCodeBoxWrapper>
    </Modal>
  );
};
