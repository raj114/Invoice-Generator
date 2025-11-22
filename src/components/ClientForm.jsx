import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import dayjs from "dayjs";
import "./ClientForm.css";

const { TextArea } = Input;
const { Title } = Typography;

function ClientForm({ onSubmit }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      date: values.date
        ? values.date.format("YYYY-MM-DD")
        : new Date().toISOString().split("T")[0],
    };
    onSubmit(formattedValues);
  };

  return (
    <Card className="form-card">
      <Title level={3} style={{ marginBottom: 24 }}>
        Quotation Details
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          date: dayjs(),
          companyName: "VAISHNAVI SIGN BOARD'S",
          companyAddress: "WADGAON SHERI PUNE 14",
          companyMobile: "9834809816",
          companyEmail: "somnathgarade123@gmail.com",
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">
          <Title level={4} style={{ margin: 0 }}>
            Company Details
          </Title>
        </Divider>

        <Form.Item label="Company Name" name="companyName">
          <Input placeholder="Enter company name" />
        </Form.Item>

        <Form.Item label="Company Address" name="companyAddress">
          <TextArea rows={2} placeholder="Enter company address" />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Mobile Number" name="companyMobile">
              <Input placeholder="Enter mobile number" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Email" name="companyEmail">
              <Input type="email" placeholder="Enter email address" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Company GSTIN" name="companyGSTIN">
          <Input placeholder="Enter GSTIN" />
        </Form.Item>

        <Divider orientation="left">
          <Title level={4} style={{ margin: 0 }}>
            Client Details (To)
          </Title>
        </Divider>

        <Form.Item
          label="Client Name"
          name="clientName"
          rules={[{ required: true, message: "Please enter client name" }]}
        >
          <Input placeholder="Enter client name" />
        </Form.Item>

        <Form.Item
          label="Client Address"
          name="clientAddress"
          rules={[{ required: true, message: "Please enter client address" }]}
        >
          <TextArea rows={2} placeholder="Enter client address" />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Email" name="clientEmail">
              <Input type="email" placeholder="Enter email address" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Contact" name="clientContact">
              <Input placeholder="Enter contact number" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Client GSTIN" name="clientGSTIN">
          <Input placeholder="Enter GSTIN" />
        </Form.Item>

        <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" size="large" block>
            Next
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default ClientForm;
