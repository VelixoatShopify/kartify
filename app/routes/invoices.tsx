import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  InlineStack,
  Box,
  Checkbox,
} from "@shopify/polaris";

// Mock data
const mockOrders = [
  {
    id: "1001",
    customer: "Aayush Mishra",
    date: "2025-07-13",
    total: 1899,
    email: "aayush@example.com",
    address: "Delhi, India",
    products: [
      { name: "Product A", quantity: 2 },
      { name: "Product B", quantity: 1 },
    ],
  },
  {
    id: "1002",
    customer: "Rohan Singh",
    date: "2025-07-12",
    total: 2499,
    email: "rohan@example.com",
    address: "Mumbai, India",
    products: [{ name: "Product C", quantity: 3 }],
  },
  {
    id: "1003",
    customer: "Megha Kapoor",
    date: "2025-07-11",
    total: 1399,
    email: "megha@example.com",
    address: "Bangalore, India",
    products: [
      { name: "Product D", quantity: 1 },
      { name: "Product E", quantity: 2 },
    ],
  },
];

export default function CustomOrderTable() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === mockOrders.length) {
      setSelected([]);
    } else {
      setSelected(mockOrders.map(o => o.id));
    }
  };

  return (
    <Page title="All Orders">
      <Layout>
        <Layout.Section>
          <Card>
            <Box padding="400">
              {/* Table Headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1.2fr 1.2fr 1fr 1fr 2fr",
                  fontWeight: "bold",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <Checkbox
                  checked={selected.length === mockOrders.length}
                  onChange={toggleAll}
                  label=" "
                />
                <Text as="span">Order ID</Text>
                <Text as="span">Customer</Text>
                <Text as="span">Date</Text>
                <Text as="span">Total</Text>
                <Text as="span">Details</Text>
              </div>

              {/* Table Rows */}
              {mockOrders.map(order => (
                <div
                  key={order.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px 1.2fr 1.2fr 1fr 1fr 2fr",
                    padding: "16px 0",
                    borderBottom: "1px solid #eee",
                    alignItems: "start",
                  }}
                >
                  <Checkbox
                    checked={selected.includes(order.id)}
                    onChange={() => toggleSelect(order.id)}
                    label=" "
                  />
                  <Text as="span">#{order.id} </Text>
                  <Text as="span">{order.customer} </Text>
                  <Text as="span">{order.date}</Text>
                  <Text as="span">₹{order.total}</Text>
                  <Box>
                    <Text as="p">Email: {order.email}</Text>
                    <Text as="p">Address: {order.address}</Text>
                    <Text as="p">Products:</Text>
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {order.products.map((p, i) => (
                        <li key={i}>
                          {p.name} × {p.quantity}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </div>
              ))}
            </Box>

            {/* Action Buttons */}
            <Box padding="400">
              <InlineStack gap="400" align="end7">
                <Button onClick={() => alert("PDF for: " + selected.join(", "))}>
                  Download PDF
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    alert("Invoices sent to: " + selected.join(", "))
                  }
                >
                  Send Invoice
                </Button>
              </InlineStack>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
