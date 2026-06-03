import { Avatar, Box, Card, Divider, Typography } from "@mui/material";
import { useAuth } from "../../../../contexts/auth";
import { BrasaCardViewProps } from "./types";
import { useLocale } from "../../../../contexts/Locale";

type ComponentType = React.FC<BrasaCardViewProps>;
export const BrasaCardView: ComponentType = ({ ...props }) => {
    const { user } = useAuth();
    const { commonLocale } = useLocale();

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 4rem)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: (t) =>
                    t.palette.mode === "dark" ? "grey.900" : "grey.100",
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
                {/* Header bar */}
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
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                bgcolor: "#2E7D32",
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 50,
                                    height: 50,
                                    color: "white",
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Right logo */}
                    <Box
                        component="img"
                        src="/logos/LogoUofT2021.png"
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
                        {user
                            ? `${user.firstName} ${user.lastName}`
                            : `${commonLocale.get("firstName")} ${commonLocale.get("lastName")}`}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "center", mb: 2 }}
                    >
                        {user ? user.email : commonLocale.get("exampleMail")}
                    </Typography>

                    <Divider />

                    <Box sx={{ mt: 2, display: "grid", rowGap: 1 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Student Number
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                <strong>{user?.studentId}</strong>
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                {commonLocale.get("validUntil")}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                <strong>{commonLocale.get("expiryDate")}</strong>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};
