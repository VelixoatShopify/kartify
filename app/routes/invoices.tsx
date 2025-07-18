import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  IndexTable,
  Button,
  InlineStack,
  Box,
  useIndexResourceState,
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

export default function InvoiceOrderListPage() {
  const [orders] = useState(mockOrders);

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState(orders);

  const rowMarkup = orders.map((order, index) => (
    <IndexTable.Row
      id={order.id}
      key={order.id}
      selected={selectedResources.includes(order.id)}
      position={index}
    >
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="medium" as="span">
          #{order.id}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span">{order.customer}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span">{order.date}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span">₹{order.total}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="p">Email: {order.email}</Text>
        <Text as="p">Address: {order.address}</Text>
        <Text as="p">Products:</Text>
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
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
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
            <Box padding="400">
              <InlineStack gap="400" align="start">
                <Button
                  onClick={() =>
                    alert(
                      "PDFs downloaded for: " + selectedResources.join(", ")
                    )
                  }
                >
                  Download PDF
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    alert(
                      "Invoices sent to: " + selectedResources.join(", ")
                    )
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
