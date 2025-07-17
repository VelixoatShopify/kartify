import React, { useState } from "react";
import { useSearchParams, Link } from "@remix-run/react";
import {
  Page,
  Text,
  Layout,
  Card,
  TextField,
  BlockStack,
  Checkbox,
  InlineStack,
  Button,
  Select,
  Box,
} from "@shopify/polaris";

export default function ReviewCollection() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "dashboard";

  return (
    <Page title="Review Collection">
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          borderBottom: '1px solid #dfe3e8',
          backgroundColor: '#f4f6f8',
          borderRadius: '8px'
        }}
      >
        <Box padding="400">
          <InlineStack align="center" gap="600">
            <Link to={`?view=dashboard`} style={{ textDecoration: 'none' }}>
              <div style={navButtonStyle(view === "dashboard")}>
                <Text as="span" fontWeight="bold" variant="headingMd">
                  Review Dashboard
                </Text>
              </div>
            </Link>
            <Link to={`?view=styles`} style={{ textDecoration: 'none' }}>
              <div style={navButtonStyle(view === "styles")}>
                <Text as="span" fontWeight="bold" variant="headingMd">
                  Widget & Styles
                </Text>
              </div>
            </Link>
          </InlineStack>
        </Box>
      </div>
      <Box padding="400">
        {view === "dashboard" && <DashboardView />}
        {view === "styles" && <StylesView />}
      </Box>
    </Page>
  );
}

function DashboardView() {
  const [selectedProduct, setSelectedProduct] = useState("Red T-Shirt");
  const productOptions = [
    { label: "Red T-Shirt", value: "Red T-Shirt" },
    { label: "Blue Jeans", value: "Blue Jeans" },
    { label: "Sneakers", value: "Sneakers" },
  ];
  const sampleLogs = [
    { product: "Red T-Shirt", user: "John Doe", rating: 5, review: "Excellent!", date: "2025-07-01" },
    { product: "Red T-Shirt", user: "Jane Smith", rating: 4, review: "Good, but could improve.", date: "2025-07-02" },
    { product: "Blue Jeans", user: "David Lee", rating: 5, review: "Fits perfectly!", date: "2025-07-03" },
  ];
  const filteredLogs = sampleLogs.filter(log => log.product === selectedProduct);

  return (
    <BlockStack gap="400">
      <Card>
        <Select
          label="Select Product"
          options={productOptions}
          onChange={setSelectedProduct}
          value={selectedProduct}
        />
      </Card>

      <Card>
        <Text as="p" variant="bodyMd">
          Graph placeholder for future data visualization (e.g., daily reviews)
        </Text>
      </Card>

      <Card>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm">Review Logs</Text>
          {filteredLogs.map((log, i) => (
            <Card key={i} padding="300">
              <BlockStack gap="100">
                <Text as="span" variant="bodyMd" fontWeight="bold">{log.product}</Text>
                <Text as="span" variant="bodyMd">Reviewer: {log.user}</Text>
                <Text as="span" variant="bodyMd">Rating: {"⭐".repeat(log.rating)}</Text>
                <Text as="span" variant="bodyMd">Comment: {log.review}</Text>
                <Text as="span" variant="bodyMd">Submitted on: {log.date}</Text>
              </BlockStack>
            </Card>
          ))}
        </BlockStack>
      </Card>
    </BlockStack>
  );
}

function StylesView() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showStyles, setShowStyles] = useState(false);

  const [enableFormWidget, setEnableFormWidget] = useState(true);
  const [enableTopWidget, setEnableTopWidget] = useState(true);
  const [formWidgetHeading, setFormWidgetHeading] = useState("Customer Review");
  const [topWidgetHeading, setTopWidgetHeading] = useState("Top Reviewed Products");

  const [prodBg, setProdBg] = useState("#ffffff");
  const [prodTextColor, setProdTextColor] = useState("#000000");
  const [prodFontSize, setProdFontSize] = useState(16);
  const [prodBtnColor, setProdBtnColor] = useState("#007bff");

  const [topBg, setTopBg] = useState("#ffffff");
  const [topTextColor, setTopTextColor] = useState("#000000");
  const [topFontSize, setTopFontSize] = useState(18);
  const [topBtnColor, setTopBtnColor] = useState("#007bff");

  return (
    <Card padding="600">
      <BlockStack gap="400">
        <Button onClick={() => setActiveSection(activeSection === 'basic' ? null : 'basic')}>
          {activeSection === 'basic' ? 'Hide' : 'Show'} Basics
        </Button>
        {activeSection === 'basic' && (
          <BlockStack gap="400">
            <Checkbox
              label="Enable Product Page Review Form"
              checked={enableFormWidget}
              onChange={setEnableFormWidget}
            />
            <TextField
              label="Heading Text for Product Page Widget"
              value={formWidgetHeading}
              onChange={setFormWidgetHeading}
              autoComplete="off"
            />
            <Checkbox
              label="Enable Top Reviewed Products Widget"
              checked={enableTopWidget}
              onChange={setEnableTopWidget}
            />
            <TextField
              label="Heading Text for Top Reviewed Widget"
              value={topWidgetHeading}
              onChange={setTopWidgetHeading}
              autoComplete="off"
            />
          </BlockStack>
        )}

        <Button onClick={() => setShowStyles(!showStyles)}>
          {showStyles ? "Hide Styles" : "Show Styles"}
        </Button>
        {showStyles && (
          <BlockStack gap="400">
            <Text as="h3" variant="headingMd">Style Your Review Widgets</Text>

            <Card padding="200">
              <BlockStack gap="300">
                <Text as="h4" variant="headingSm">Customer Review Card</Text>
                <InlineStack wrap={false} gap="400">
                  <Box width="33%">
                    <Text as="p">Background Color</Text>
                    <input type="color" value={prodBg} onChange={(e) => setProdBg(e.target.value)} style={{ width: "100%", height: "36px", border: "none" }} />
                  </Box>
                  <Box width="33%">
                    <Text as="p">Text Color</Text>
                    <input type="color" value={prodTextColor} onChange={(e) => setProdTextColor(e.target.value)} style={{ width: "100%", height: "36px", border: "none" }} />
                  </Box>
                  <Box width="33%">
                    <Text as="p">Button Color</Text>
                    <input type="color" value={prodBtnColor} onChange={(e) => setProdBtnColor(e.target.value)} style={{ width: "100%", height: "36px", border: "none" }} />
                  </Box>
                </InlineStack>

                <Box width="50%">
                  <Text as="p">Font Size (Title & Review)</Text>
                  <input type="range" min={12} max={24} value={prodFontSize} onChange={(e) => setProdFontSize(parseInt(e.target.value))} style={{ width: "100%" }} />
                </Box>

                <Box paddingBlockStart="400">
                  <Text as="h5" variant="headingSm">Live Preview</Text>
                </Box>
                <Box padding="400" borderRadius="200" background="bg-surface">
                  <div style={{ backgroundColor: prodBg, padding: "16px", borderRadius: "12px" }}>
                    <div style={{ color: prodTextColor, fontSize: `${prodFontSize}px` }}>
                      <Text as="p" variant="headingSm">{formWidgetHeading}</Text>
                      <Text as="p" variant="bodyMd">“Great quality, fast shipping!”</Text>
                      <Text as="p" variant="bodyMd">{"⭐".repeat(4)}</Text>
                    </div>
                    <button style={{ marginTop: "10px", backgroundColor: prodBtnColor, color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                      Write Review
                    </button>
                  </div>
                </Box>
              </BlockStack>
            </Card>

            <Card padding="200">
              <BlockStack gap="300">
                <Text as="h4" variant="headingSm">Best Selling Products</Text>
                <InlineStack wrap={false} gap="400">
                  <Box width="33%">
                    <Text as="p">Background Color</Text>
                    <input type="color" value={topBg} onChange={(e) => setTopBg(e.target.value)} style={{ width: "100%", height: "36px", border: "none" }} />
                  </Box>
                  <Box width="33%">
                    <Text as="p">Title Text Color</Text>
                    <input type="color" value={topTextColor} onChange={(e) => setTopTextColor(e.target.value)} style={{ width: "100%", height: "36px", border: "none" }} />
                  </Box>
                  <Box width="33%">
                    <Text as="p">Button Color</Text>
                    <input type="color" value={topBtnColor} onChange={(e) => setTopBtnColor(e.target.value)} style={{ width: "100%", height: "36px", border: "none" }} />
                  </Box>
                </InlineStack>

                <Box width="50%">
                  <Text as="p">Title Font Size</Text>
                  <input type="range" min={14} max={28} value={topFontSize} onChange={(e) => setTopFontSize(parseInt(e.target.value))} style={{ width: "100%" }} />
                </Box>

                <Box paddingBlockStart="400">
                  <Text as="h5" variant="headingSm">Live Preview</Text>
                </Box>
                <Box padding="400" borderRadius="200" background="bg-surface">
                  <div style={{ backgroundColor: topBg, padding: "16px", borderRadius: "12px" }}>
                    <div style={{ color: topTextColor, fontSize: `${topFontSize}px` }}>
                      <Text as="p" variant="headingSm">{topWidgetHeading}</Text>
                    </div>
                    <div style={{ marginTop: "8px" }}>
                      <Card padding="200">
                        <Text as="p" variant="bodyMd">Product Name – $49.99</Text>
                        <Text as="p" variant="bodySm">Top rated, limited stock</Text>
                        <button style={{ marginTop: "10px", backgroundColor: topBtnColor, color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                          Buy Now
                        </button>
                      </Card>
                    </div>
                  </div>
                </Box>
              </BlockStack>
            </Card>
          </BlockStack>
        )}
      </BlockStack>
    </Card>
  );
}

const navButtonStyle = (active: boolean) => ({
  padding: '10px 16px',
  borderRadius: '999px',
  cursor: 'pointer',
  backgroundColor: active ? '#ffffff' : 'transparent',
  color: active ? '#000' : '#666',
});