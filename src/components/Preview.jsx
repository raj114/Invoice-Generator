import {
  ArrowLeftOutlined,
  FilePdfOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Flex,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import html2pdf from "html2pdf.js";
import { useRef } from "react";
import logo from "../assets/logo.png";
import { numberToWords } from "../utils/numberToWords";
import "./Preview.css";

const { Title, Text } = Typography;

function Preview({ clientData, items, onBack, onReset }) {
  const previewRef = useRef(null);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const sizeW = parseFloat(item.sizeW) || 0;
    const sizeH = parseFloat(item.sizeH) || 0;
    const quantity = parseFloat(item.quantity) || 1;
    const rate = parseFloat(item.rate) || 0;
    return sum + sizeW * sizeH * rate * quantity;
  }, 0);

  const totalGST = 0; // GST always 0
  const grandTotal = subtotal; // No GST added
  const amountInWords = numberToWords(grandTotal);

  const generatePDF = async () => {
    if (!previewRef.current) return;

    const element = previewRef.current;

    // Wait for rendering
    await new Promise((resolve) => setTimeout(resolve, 200));

    const opt = {
      margin: [5, 5, 5, 5],
      filename: `Invoice_${(clientData.clientName || "Invoice").replace(
        /\s+/g,
        "_"
      )}_${Date.now()}.pdf`,
      image: { type: "jpeg", quality: 1 },

      // ---------------------------------------------------
      // 🔥 HIGH RESOLUTION SETTINGS (Prevents Blurriness)
      // ---------------------------------------------------
      html2canvas: {
        scale: 4, // Increase DPI (default 1 → blur)
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: false,
        letterRendering: true,
        removeContainer: true,

        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector(".pdf-content");
          if (clonedElement) {
            clonedElement.style.overflow = "visible";
            clonedElement.style.height = "auto";

            // Force high-res rendering
            clonedElement.style.transform = "scale(1)";
            clonedElement.style.backfaceVisibility = "hidden";
            clonedElement.style.webkitFontSmoothing = "antialiased";
            clonedElement.style.textRendering = "optimizeLegibility";
          }

          // fix blurry text inside ant components
          clonedDoc.querySelectorAll("*").forEach((node) => {
            node.style.transform = "scale(1)";
            node.style.boxShadow = "none";
          });
        },
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
        hotfixes: ["px_scaling"], // ❤️ extra clarity
      },

      pagebreak: {
        mode: ["css", "legacy"],
        before: ".page-break-before",
        after: ".page-break-after",
        avoid: [".ant-table", ".ant-card"],
      },
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const tableColumns = [
    {
      title: "Sr.no",
      dataIndex: "index",
      key: "index",
      width: 60,
    },
    {
      title: "Particulars",
      dataIndex: "particulars",
      key: "particulars",
      width: 200,
    },
    {
      title: "Size(W)",
      dataIndex: "sizeW",
      key: "sizeW",
      width: 80,
      render: (text) => (text ? parseFloat(text).toFixed(2) : "-"),
    },
    {
      title: "Size(H)",
      dataIndex: "sizeH",
      key: "sizeH",
      width: 80,
      render: (text) => (text ? parseFloat(text).toFixed(2) : "-"),
    },
    {
      title: "SQ Ft/inch",
      dataIndex: "sqFt",
      key: "sqFt",
      width: 100,
      render: (text) => (text ? parseFloat(text).toFixed(2) : "-"),
    },
    {
      title: "Gst 18%",
      dataIndex: "gst",
      key: "gst",
      width: 100,
      render: (text) => (text ? parseFloat(text).toFixed(2) : "-"),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      width: 100,
      render: (text) => (text ? parseFloat(text).toFixed(2) : "-"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      align: "right",
      render: (text) => `₹${text ? parseFloat(text).toFixed(2) : "0.00"}`,
    },
  ];

  const tableData = items.map((item, index) => ({
    key: index,
    index: index + 1,
    ...item,
  }));

  return (
    <Card className="form-card">
      <Title level={3} className="no-print" style={{ marginBottom: 24 }}>
        Preview
      </Title>

      <div ref={previewRef} className="preview-content pdf-content">
        <Card
          className="banner-header orange-banner"
          style={{ marginBottom: 12 }}
          bodyStyle={{ padding: "12px" }}
        >
          <Flex vertical style={{ width: "100%", padding: 16 }}>
            {/* Row 1: Logo full height on left, Name + Details on right */}
            <Row align="middle" style={{ width: "100%" }}>
              {/* Left: Logo (Span 8 of 24) */}
              <Col
                span={8}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ maxHeight: 140, maxWidth: 260 }}
                />
              </Col>

              {/* Right Side Content (Span 16 of 24) */}
              <Col span={16}>
                {/* Row 1: Company Name */}
                <Row>
                  <Col span={24} style={{ textAlign: "left" }}>
                    <Title level={2} style={{ color: "white", margin: 0 }}>
                      {clientData.companyName || "VAISHNAVI SIGN BOARD'S"}
                    </Title>
                  </Col>
                </Row>

                {/* Row 2: Description Text */}
                <Row>
                  <Col span={24}>
                    <Text
                      style={{
                        color: "white",
                        marginTop: 8,
                        fontSize: 14,
                        lineHeight: 1.4,
                      }}
                    >
                      LED Board • Backlite Board • Flex Banner • Digital Print •
                      Vinyl Cutting • Radium Cutting • Acrylic Emboss Letter
                      Bending • Indoor / Outdoor Print • Industrial Composite
                      Board
                    </Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Flex>
        </Card>

        <Card style={{ marginBottom: 12 }} bodyStyle={{ padding: "8px 12px" }}>
          <Row justify="space-between">
            <Col>
              <Text strong>Date :</Text>{" "}
              {clientData.date
                ? new Date(clientData.date).toLocaleDateString("en-GB")
                : ""}
            </Col>
          </Row>
        </Card>

        <Row gutter={16} style={{ marginBottom: 12 }}>
          <Col xs={24} md={12}>
            <Card
              title="VAISHNAVI SIGN BOARD'S"
              size="small"
              bodyStyle={{ padding: "8px 12px", fontSize: "14px" }}
            >
              <Descriptions
                column={1}
                size="small"
                colon={false}
                style={{ fontSize: "14px" }}
              >
                <Descriptions.Item label="From">
                  {clientData.companyName || "VAISHNAVI SIGN BOARD'S"}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {clientData.companyAddress || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Mobil NO">
                  {clientData.companyMobile || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {clientData.companyEmail || ""}
                </Descriptions.Item>
                <Descriptions.Item label="GSTIN">
                  {clientData.companyGSTIN || ""}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              title="Clients Details"
              size="small"
              bodyStyle={{ padding: "8px 12px", fontSize: "14px" }}
            >
              <Descriptions
                column={1}
                size="small"
                colon={false}
                style={{ fontSize: "14px" }}
              >
                <Descriptions.Item label="To">
                  {clientData.clientName || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {clientData.clientAddress || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {clientData.clientEmail || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Contact">
                  {clientData.clientContact || ""}
                </Descriptions.Item>
                <Descriptions.Item label="GSTIN">
                  {clientData.clientGSTIN || ""}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>

        <Card
          title="Quotation/Invoice"
          style={{ marginBottom: 12 }}
          bodyStyle={{ padding: "8px" }}
        >
          <Table
            columns={tableColumns}
            dataSource={tableData}
            pagination={false}
            size="small"
            bordered
            style={{ fontSize: "14px" }}
          />

          <Row justify="end" style={{ marginTop: 12 }}>
            <Col xs={24} sm={12} md={8}>
              <Card size="small" bodyStyle={{ padding: "8px 12px" }}>
                <Space
                  direction="vertical"
                  style={{ width: "100%" }}
                  size="small"
                >
                  <Row justify="space-between">
                    <Col>Total:</Col>
                    <Col>₹{subtotal.toFixed(2)}</Col>
                  </Row>
                  <Row justify="space-between">
                    <Col>Gst 18%:</Col>
                    <Col>₹{totalGST.toFixed(2)}</Col>
                  </Row>
                  <Row justify="space-between">
                    <Col>R.O:</Col>
                    <Col></Col>
                  </Row>
                  <Divider style={{ margin: "8px 0" }} />
                  <Row justify="space-between">
                    <Col>
                      <Text strong>Grand Total:</Text>
                    </Col>
                    <Col>
                      <Text strong style={{ fontSize: 18, color: "#1890ff" }}>
                        ₹{grandTotal.toFixed(2)}
                      </Text>
                    </Col>
                  </Row>
                </Space>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>

      <Space
        className="no-print"
        style={{ width: "100%", justifyContent: "center", marginTop: 24 }}
      >
        <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
          Back
        </Button>
        <Button
          type="primary"
          icon={<FilePdfOutlined />}
          onClick={generatePDF}
          size="large"
        >
          Generate PDF
        </Button>
        <Button icon={<ReloadOutlined />} onClick={onReset}>
          New Invoice
        </Button>
      </Space>
    </Card>
  );
}

export default Preview;
