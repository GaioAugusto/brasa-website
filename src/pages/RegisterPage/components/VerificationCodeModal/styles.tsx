import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import styled from "styled-components";

export const VerificationCodeBoxWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  outline: none;
`;

export const HeaderBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const StyledDivider = styled(Divider)`
  && {
    margin-bottom: 24px;
  }
`;

export const IconBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const StyledMarkEmailReadIcon = styled(MarkEmailReadIcon)`
  && {
    font-size: 64px;
    color: #2e7d32;
  }
`;

export const DescriptionTypography = styled(Typography)`
  && {
    text-align: center;
    line-height: 1.7;
    margin-bottom: 24px;
  }
`;

export const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 16px;
  }
`;

export const ActionButtonsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const VerifyButton = styled(Button)`
  && {
    width: 100%;
    background-color: #2e7d32;
    color: #fff;
    &:hover {
      background-color: #1b5e20;
    }
    &:disabled {
      background-color: rgba(46, 125, 50, 0.3);
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

export const ResendButton = styled(Button)`
  && {
    width: 100%;
    color: #2e7d32;
    border-color: #2e7d32;
    background-color: #fff;
    &:hover {
      border-color: #1b5e20;
      color: #1b5e20;
      background-color: rgba(46, 125, 50, 0.05);
    }
    &:disabled {
      border-color: rgba(46, 125, 50, 0.3);
      color: rgba(46, 125, 50, 0.5);
    }
  }
`;
