import { VerifyAccountViewProps } from "./types";
import React from "react";
import { Button, Card, Col, Result, Row, Space, Spin, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

type ComponentType = React.FC<VerifyAccountViewProps>;
export const VerifyAccountView: ComponentType = ({ status, ...props }) => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "70vh", padding: 16 }}
    >
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        {status === "idle" && (
          <Card>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Title level={3} style={{ marginBottom: 0 }}>
                Email verification
              </Title>
              <Paragraph type="secondary">
                Click the button below to confirm your email.
              </Paragraph>
              <Space>
                <Button style={{ color: "green" }} onClick={props.handleVerify}>
                  Verify my email
                </Button>
              </Space>
              <Text type="secondary">
                If this wasn’t you, you can safely ignore this page.
              </Text>
            </Space>
          </Card>
        )}

        {status === "loading" && (
          <Card>
            <Space
              direction="vertical"
              size="large"
              style={{ width: "100%", alignItems: "center" }}
            >
              <Spin style={{ color: "#16a34a" }} tip="Verifying your email…" />
              <Text type="secondary">This will only take a moment.</Text>
            </Space>
          </Card>
        )}

        {status === "success" && (
          <Result
            status="success"
            title="Email verified"
            subTitle="You're all set! Redirecting to login…"
          />
        )}

        {status === "error" && (
          <Result
            status="error"
            title="Verification failed"
            subTitle={
              props.message ||
              "Something went wrong while verifying your email."
            }
            extra={[
              <Button key="retry" onClick={props.handleVerify}>
                Try again
              </Button>,
            ]}
          />
        )}
      </Col>
    </Row>
  );
};
