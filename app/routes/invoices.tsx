import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  TextField,
  Button,
  BlockStack,
  Text,
  InlineStack,
  Divider,
  Box,
} from "@shopify/polaris";
import { useNavigation } from "@remix-run/react";

export default function InvoicePage() {
  const navigation = useNavigation();

  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<any>(null);

  const handleSearchOrder = () => {
    // Simulate fetching order (this will be replaced by Shopify API)
    const mockOrder = {
      id: orderId,
      customer: {
        name: "Rohan Singh",
        email: "rohan@example.com",
      },
      items: [
        { name: "T-shirt", quantity: 2, price: 599 },
        { name: "Sneakers", quantity: 1, price: 1999 },
      ],
      subtotal: 3197,
      tax: 320,
      total: 3517,
      date: "2025-07-13",
    };

    setOrderData(mockOrder);
  };

  const handleGenerateInvoice = () => {
    // Later this will trigger PDF creation
    alert("📄 Invoice generated successfully!");
  };

  return (
    <Page title="Invoice Generator">
      <Layout>
        <Layout.Section>
          <Card padding="400">
            <BlockStack gap="400">
              <TextField
                label="Enter Order ID"
                value={orderId}
                onChange={setOrderId}
                autoComplete="off"
              />
              <InlineStack align="end">
                <Button onClick={handleSearchOrder} disabled={!orderId}>
                  Search Order
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>

          {orderData && (
            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h2">
                  Invoice Preview – Order #{orderData.id}
                </Text>
                <Text variant="bodyMd" as="p">
                  <strong>Date:</strong> {orderData.date}
                </Text>
                <Text variant="bodyMd" as="p">
                  <strong>Customer:</strong> {orderData.customer.name} ({orderData.customer.email})
                </Text>

                <Divider />

                <Text variant="headingSm" as="p">Items:</Text>
                {orderData.items.map((item: any, index: number) => (
                  <Box key={index}>
                    <Text variant="bodyMd" as="p">
                      • {item.name} – Qty: {item.quantity} × ₹{item.price}
                    </Text>
                  </Box>
                ))}

                <Divider />

                <Text variant="bodyMd" as="p">
                  <strong>Subtotal:</strong> ₹{orderData.subtotal}
                </Text>
                <Text variant="bodyMd" as="p">
                  <strong>Tax:</strong> ₹{orderData.tax}
                </Text>
                <Text variant="bodyMd" as="p">
                  <strong>Total:</strong> ₹{orderData.total}
                </Text>

                <InlineStack align="end" gap="200">
                  <Button
                    variant="primary"
                    onClick={handleGenerateInvoice}
                    loading={navigation.state === "submitting"}
                  >
                    Generate Invoice PDF
                  </Button>
                  <Button>Send</Button>
                </InlineStack>
              </BlockStack>
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}