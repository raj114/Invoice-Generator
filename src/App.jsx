import { Card, Layout, Steps, Typography } from "antd";
import { useState } from "react";
import "./App.css";
import ClientForm from "./components/ClientForm";
import ItemsForm from "./components/ItemsForm";
import Preview from "./components/Preview";

const { Content } = Layout;
const { Title } = Typography;

function App() {
  const [step, setStep] = useState(0);
  const [clientData, setClientData] = useState(null);
  const [items, setItems] = useState([]);

  const handleClientSubmit = (data) => {
    setClientData(data);
    setStep(1);
  };

  const handleItemsSubmit = (itemsData) => {
    setItems(itemsData);
    setStep(2);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setClientData(null);
    setItems([]);
  };

  const steps = [
    {
      title: "Client Info",
      description: "Enter client information",
    },
    {
      title: "Items",
      description: "Add items details",
    },
    {
      title: "Preview",
      description: "Review and generate PDF",
    },
  ];

  return (
    <Layout className="app-layout">
      <Content className="app-content">
        <div className="container">
          <Card className="main-card">
            <Title
              level={2}
              className="title"
              style={{ textAlign: "center", marginBottom: 32 }}
            >
              Invoice Generator
            </Title>

            <Steps
              current={step}
              items={steps}
              className="step-indicator"
              style={{ marginBottom: 40 }}
            />

            {step === 0 && <ClientForm onSubmit={handleClientSubmit} />}
            {step === 1 && (
              <ItemsForm
                onSubmit={handleItemsSubmit}
                onBack={handleBack}
                initialItems={items}
              />
            )}
            {step === 2 && (
              <Preview
                clientData={clientData}
                items={items}
                onBack={handleBack}
                onReset={handleReset}
              />
            )}
          </Card>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
