import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  DataTable,
  Badge,
  TextField,
  Button,
  InlineStack,
  BlockStack,
  Text,
  Thumbnail,
  Checkbox,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

// Static mock data for testing UI without backend
const mockProducts = [
  {
    id: "1",
    title: "Red T-Shirt",
    sku: "TSH-RED",
    stock: 5,
    threshold: 10,
    image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/products/red-tshirt.png",
  },
  {
    id: "2",
    title: "Blue Jeans",
    sku: "JEAN-BLU",
    stock: 20,
    threshold: 15,
    image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/products/blue-jeans.png",
  },
  {
    id: "3",
    title: "Sneakers",
    sku: "SNK-001",
    stock: 0,
    threshold: 5,
    image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/products/sneakers.png",
  },
];

export default function InventoryAlert() {
  // State to manage product list and threshold values
  const [products, setProducts] = useState(mockProducts);

  // Global threshold value for all products (UI only)
  const [globalThreshold, setGlobalThreshold] = useState("10");

  // State to filter products based on stock status
  const [filter, setFilter] = useState<"ALL" | "LOW" | "OUT">("ALL");

  // Update threshold for individual product
  const updateThreshold = (id: string, newThreshold: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, threshold: Number(newThreshold) } : product
      )
    );
  };

  // Filter products based on selected filter: ALL, LOW, or OUT
  const filteredProducts = products.filter((product) => {
    if (filter === "LOW") return product.stock <= product.threshold;
    if (filter === "OUT") return product.stock === 0;
    return true;
  });

  // Table rows for DataTable
  const rows = filteredProducts.map((product) => [
    // Product image and title
    <InlineStack gap="200" align="center">
      <Thumbnail source={product.image} alt={product.title} size="small" />
      <Text as="span" variant="bodyMd">{product.title}</Text>
    </InlineStack>,

    // SKU
    product.sku,

    // Stock
    product.stock,

    // Editable threshold input
    <TextField
      label=""
      value={String(product.threshold)}
      type="number"
      onChange={(val) => updateThreshold(product.id, val)}
      autoComplete="off"
    />,

    // Status badge: Low or OK
    product.stock <= product.threshold ? (
      <Badge tone="critical">Low</Badge>
    ) : (
      <Badge tone="success">OK</Badge>
    ),

    // Smart action placeholder (Reorder Now)
    <Button size="slim" onClick={() => alert("Reorder form (coming soon)")}>Reorder Now</Button>,
  ]);

  return (
    <Page title="Inventory Alerts">
      {/* Shopify App page title */}

      <Layout>
        <Layout.Section>
          <Card padding="600">
            <BlockStack gap="500">
              {/* Page description */}
              <Text as="p" variant="bodyMd">
                Monitor product stock and receive alerts when items go below threshold.
              </Text>

              {/* Global default threshold setting */}
              <InlineStack gap="400" align="start">
                <TextField
                  label="Global Default Threshold"
                  type="number"
                  value={globalThreshold}
                  onChange={setGlobalThreshold}
                  autoComplete="off"
                  helpText="This threshold will apply to new products by default."
                />
                <Button variant="plain" onClick={() => alert("Apply to all")}>Apply to All Products</Button>
              </InlineStack>

              {/* Filter buttons */}
              <InlineStack gap="300">
                <Button pressed={filter === "ALL"} onClick={() => setFilter("ALL")}>All Products</Button>
                <Button pressed={filter === "LOW"} onClick={() => setFilter("LOW")}>Low Stock Only</Button>
                <Button pressed={filter === "OUT"} onClick={() => setFilter("OUT")}>Out of Stock Only</Button>
              </InlineStack>

              {/* Inventory table */}
              <DataTable
                columnContentTypes={["text", "text", "numeric", "numeric", "text", "text"]}
                headings={["Product", "SKU", "Stock", "Threshold", "Status", "Smart Action"]}
                rows={rows}
              />

              {/* Action buttons for export, bulk edit, and logs */}
              <InlineStack gap="400">
                <Button onClick={() => alert("Export CSV (coming soon)")}>Export Inventory Report</Button>
                <Button onClick={() => alert("Bulk Edit (coming soon)")}>Bulk Edit Thresholds</Button>
                <Button onClick={() => alert("View Alert Logs (coming soon)")}>View Alert Logs</Button>
              </InlineStack>

              {/* Notification and user permission settings (UI only) */}
              <Card padding="300">
                <BlockStack gap="300">
                  <Text as="h3" variant="headingSm">Notifications & Permissions</Text>

                  {/* Email alerts checkbox (future backend) */}
                  <Checkbox
                    label="Send Email alerts when threshold is crossed"
                    checked
                    disabled
                    helpText="(Backend required)"
                    onChange={() => {}}
                  />

                  {/* WhatsApp/SMS alerts checkbox */}
                  <Checkbox
                    label="Send WhatsApp/SMS alert (Coming Soon)"
                    checked={false}
                    disabled
                    onChange={() => {}}
                  />

                  {/* Staff permission checkbox */}
                  <Checkbox
                    label="Allow staff to manage thresholds"
                    checked
                    disabled
                    helpText="(Staff permission roles will be handled in backend)"
                    onChange={() => {}}
                  />
                </BlockStack>
              </Card>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
