import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  IndexTable,
  Button,
  Box,
} from "@shopify/polaris";

// Mock data
const mockOrders = [
  {
    id: "1001",
    name: "#1001",
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
    name: "#1002",
    customer: "Rohan Singh",
    date: "2025-07-12",
    total: 2499,
    email: "rohan@example.com",
    address: "Mumbai, India",
    products: [{ name: "Product C", quantity: 3 }],
  },
  {
    id: "1003",
    name: "#1003",
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

export default function InvoiceOrderListPage() {
  const [orders] = useState(mockOrders);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const rowMarkup = orders.map((order, index) => (
    <IndexTable.Row
      id={order.id}
      key={order.id}
      selected={selectedOrders.includes(order.id)}
      position={index}
    >
      <IndexTable.Cell>{order.name}</IndexTable.Cell>
      <IndexTable.Cell>{order.customer}</IndexTable.Cell>
      <IndexTable.Cell>{order.date}</IndexTable.Cell>
      <IndexTable.Cell>₹{order.total}</IndexTable.Cell>
      <IndexTable.Cell>
        <Text>Email: {order.email}</Text>
        <Text>Address: {order.address}</Text>
        <Text>Products:</Text>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {order.products.map((product, idx) => (
            <li key={idx}>
              {product.name} × {product.quantity}
            </li>
          ))}
        </ul>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Page title="All Orders">
      <Layout>
        <Layout.Section>
          <Card>
            <IndexTable
              resourceName={{ singular: "order", plural: "orders" }}
              itemCount={orders.length}
              selectedItemsCount={selectedOrders.length}
              onSelectionChange={(selected) =>
                setSelectedOrders(selected as string[])
              }
              headings={[
                { title: "Order ID" },
                { title: "Customer" },
                { title: "Date" },
                { title: "Total" },
                { title: "Details" },
              ]}
            >
              {rowMarkup}
            </IndexTable>

            <Box padding="4" display="flex" gap="4">
              <Button
                onClick={() =>
                  alert("PDFs downloaded for: " + selectedOrders.join(", "))
                }
              >
                Download PDF
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  alert("Invoices sent to: " + selectedOrders.join(", "))
                }
              >
                Send Invoice
              </Button>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}