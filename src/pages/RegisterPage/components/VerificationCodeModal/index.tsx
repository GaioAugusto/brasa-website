import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/auth";
import { useLocale } from "../../../../contexts/Locale";
import {
  ActionButtonsBox,
  DescriptionTypography,
  HeaderBox,
  IconBox,
  ResendButton,
  StyledDivider,
  StyledMarkEmailReadIcon,
  StyledTextField,
  VerificationCodeBoxWrapper,
  VerifyButton,
} from "./styles";

const RESEND_CODE_COOLDOWN_SECONDS = 30;

export interface VerificationCodeProps {
  readonly isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ComponentType = React.FC<VerificationCodeProps>;
export const VerificationCodeModal: ComponentType = (props) => {
  const { confirmPendingEmail, pendingEmail, resendCode } = useAuth();
  const { commonLocale, templatesLocale } = useLocale();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(
    RESEND_CODE_COOLDOWN_SECONDS,
  );
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!props.isOpen) return;

    setResendCountdown(RESEND_CODE_COOLDOWN_SECONDS);
    setInfo(null);
  }, [props.isOpen]);

  useEffect(() => {
    if (!props.isOpen || resendCountdown <= 0) return;

    const timer = setInterval(() => {
      setResendCountdown((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [props.isOpen, resendCountdown]);

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const onVerify = async () => {
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      await confirmPendingEmail(code);
      props.setIsOpen(false);
      navigate("/account");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onResendCode = async () => {
    if (!pendingEmail || resendCountdown > 0) return;

    setResendLoading(true);
    setError(null);
    setInfo(null);
    try {
      await resendCode(pendingEmail);
      setResendCountdown(RESEND_CODE_COOLDOWN_SECONDS);
      setInfo("A new verification code has been sent.");
    } catch (e: any) {
      setError(e?.message || "Could not resend verification code.");
    } finally {
      setResendLoading(false);
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

        <ActionButtonsBox>
          <VerifyButton
            disabled={code.length === 0 || loading}
            onClick={onVerify}
          >
            {loading ? "Verifying..." : "Verify"}
          </VerifyButton>

          <ResendButton
            disabled={resendCountdown > 0 || resendLoading || loading}
            onClick={onResendCode}
            variant="outlined"
          >
            {resendLoading
              ? "Resending..."
              : resendCountdown > 0
                ? `Resend code in ${resendCountdown}s`
                : "Resend code"}
          </ResendButton>
        </ActionButtonsBox>

        {info && (
          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
            {info}
          </Typography>
        )}
      </VerificationCodeBoxWrapper>
    </Modal>
  );
};
