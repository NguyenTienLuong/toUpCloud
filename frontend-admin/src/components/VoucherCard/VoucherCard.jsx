// ===============================================
// Location: src/components/VoucherCard/VoucherCard.jsx
// ===============================================
import React from 'react';
import { Row, Col, Button } from "antd";
import logo from "../../assets/logo-noText.svg";
import { RightOutlined } from "@ant-design/icons";

export default function VoucherCard({
  voucher,
  setSelectedVoucher,
  disabled = false,
  isAdmin = false
}) {
  return (
    <div style={{ 
      border: "2px solid #000",
      borderRadius: "20px",
      overflow: "hidden",
      backgroundColor: "#fdfbf5",
      maxWidth: "100%"
    }}>
      <Row style={{ margin: 0 }}>
        <Col
          span={6}
          style={{ 
            backgroundColor: "#2e2100",
            padding: "20px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100px"
          }}
        >
          <img src={logo} alt="" style={{ height: "48px" }} />
        </Col>
        <Col
          span={18}
          style={{
            padding: "14px 18px",
            backgroundColor: "#fdfbf5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <p
            style={{
              fontSize: "15px",
              fontWeight: "500",
              whiteSpace: "normal",
              wordBreak: "break-word",
              margin: 0,
              marginBottom: "12px",
              color: "#000",
              lineHeight: "1.4"
            }}
          >
            {voucher?.description || voucher?.name}
          </p>
          
          <Row align="middle">
            <Col span={12} style={{ fontSize: "13px", color: "#000" }}>
              HSD: {voucher?.end_date || voucher?.endDate}
            </Col>
            <Col span={12} style={{ textAlign: "end" }}>
              {isAdmin ? (
                <span
                  style={{
                    textDecoration: "underline",
                    fontWeight: "400",
                    color: "#dc2626",
                    fontSize: "13px",
                    cursor: "default"
                  }}
                >
                  Dùng ngay <RightOutlined style={{ fontSize: "10px" }} />
                </span>
              ) : (
                <Button
                  type="text"
                  style={{
                    textDecoration: "underline",
                    padding: "0",
                    fontWeight: "400",
                    color: "#dc2626",
                    fontSize: "13px",
                    height: "auto"
                  }}
                  disabled={disabled}
                  onClick={() => setSelectedVoucher(voucher)}
                >
                  Dùng ngay <RightOutlined style={{ fontSize: "10px" }} />
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}