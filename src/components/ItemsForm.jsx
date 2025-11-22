import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import "./ItemsForm.css";

const { TextArea } = Input;
const { Title } = Typography;

function ItemsForm({ onSubmit, onBack, initialItems = [] }) {
  const [form] = Form.useForm();
  const [items, setItems] = useState(
    initialItems.length > 0
      ? initialItems
      : [
          {
            id: Date.now(),
            particulars: "",
            sizeW: "",
            sizeH: "",
            sqFt: 0,
            gst: 0,
            quantity: 1,
            rate: "",
            amount: 0,
          },
        ]
  );

  useEffect(() => {
    form.setFieldsValue({ items });
  }, [items, form]);

  const calculateItem = (item) => {
    const sizeW = parseFloat(item.sizeW) || 0;
    const sizeH = parseFloat(item.sizeH) || 0;
    const quantity = parseFloat(item.quantity) || 1;
    const rate = parseFloat(item.rate) || 0;

    const sqFt = sizeW * sizeH;
    const amount = sqFt * rate * quantity;
    const gst = 0; // GST always 0

    return { ...item, sqFt, gst, amount };
  };

  const handleValuesChange = (changedValues, allValues) => {
    if (allValues.items) {
      const updatedItems = allValues.items.map((item, index) => {
        const existingItem = items[index] || { id: Date.now(), quantity: 1 };
        const mergedItem = { ...existingItem, ...item };
        return calculateItem(mergedItem);
      });
      setItems(updatedItems);
    }
  };

  const onFinish = () => {
    onSubmit(items);
  };

  const subtotal = items.reduce((sum, item) => {
    const sizeW = parseFloat(item.sizeW) || 0;
    const sizeH = parseFloat(item.sizeH) || 0;
    const quantity = parseFloat(item.quantity) || 1;
    const rate = parseFloat(item.rate) || 0;
    return sum + sizeW * sizeH * rate * quantity;
  }, 0);

  const totalGST = 0; // GST always 0
  const grandTotal = subtotal; // No GST added

  return (
    <Card className="form-card">
      <Title level={3} style={{ marginBottom: 24 }}>
        Items Details
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={handleValuesChange}
        initialValues={{ items }}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Card
                  key={field.key}
                  title={`Item ${index + 1}`}
                  extra={
                    fields.length > 1 && (
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          remove(field.name);
                          const newItems = items.filter(
                            (_, i) => i !== field.name
                          );
                          setItems(newItems);
                        }}
                      >
                        Remove
                      </Button>
                    )
                  }
                  style={{ marginBottom: 16 }}
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "particulars"]}
                    label="Particulars"
                  >
                    <Input placeholder="Enter particulars" />
                  </Form.Item>

                  <Row gutter={12}>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "sizeW"]}
                        label="Size (W)"
                      >
                        <Input type="number" step="0.01" placeholder="0.00" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "sizeH"]}
                        label="Size (H)"
                      >
                        <Input type="number" step="0.01" placeholder="0.00" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item label="SQ Ft/inch">
                        <Input
                          value={items[field.name]?.sqFt?.toFixed(2) || "0.00"}
                          readOnly
                          className="readonly-field"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item label="GST 18%">
                        <Input
                          value={items[field.name]?.gst?.toFixed(2) || "0.00"}
                          readOnly
                          className="readonly-field"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "quantity"]}
                        label="Quantity"
                        initialValue={1}
                      >
                        <Input type="number" step="1" min={1} placeholder="1" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "rate"]}
                        label="Rate"
                      >
                        <Input type="number" step="0.01" placeholder="0.00" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item label="Amount">
                        <Input
                          value={`₹${
                            items[field.name]?.amount?.toFixed(2) || "0.00"
                          }`}
                          readOnly
                          className="total-field"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    const newItem = {
                      id: Date.now(),
                      particulars: "",
                      sizeW: "",
                      sizeH: "",
                      sqFt: 0,
                      gst: 0,
                      quantity: 1,
                      rate: "",
                      amount: 0,
                    };
                    add();
                    setItems([...items, newItem]);
                  }}
                  block
                  icon={<PlusOutlined />}
                  style={{ marginBottom: 16 }}
                >
                  Add New Item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Divider />

        <Card>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Statistic
                title="Subtotal"
                value={subtotal}
                prefix="₹"
                precision={2}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title="GST 18%"
                value={totalGST}
                prefix="₹"
                precision={2}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title="Grand Total"
                value={grandTotal}
                prefix="₹"
                precision={2}
                valueStyle={{
                  color: "#3f8600",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              />
            </Col>
          </Row>
        </Card>

        <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
          <Space>
            <Button onClick={onBack}>Back</Button>
            <Button type="primary" htmlType="submit" size="large">
              Finish
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default ItemsForm;
