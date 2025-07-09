import { useState } from "react";
import {
  Page, Text, Layout, Card, Tabs, TextField, BlockStack, ColorPicker, Checkbox, RangeSlider, InlineStack, Button, Select
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function ReviewCollection() {
  const [selectedTab, setSelectedTab] = useState(0);

  // Widget Settings State
  const [enableFormWidget, setEnableFormWidget] = useState(true);
  const [enableTopWidget, setEnableTopWidget] = useState(true);
  const [formWidgetHeading, setFormWidgetHeading] = useState("Write a Review");
  const [topWidgetHeading, setTopWidgetHeading] = useState("Top Reviewed Products");

  // Styling State
  const [formBackgroundColor, setFormBackgroundColor] = useState({ hue: 120, brightness: 1, saturation: 1 });
  const [topBackgroundColor, setTopBackgroundColor] = useState({ hue: 60, brightness: 1, saturation: 1 });
  const [formFontSize, setFormFontSize] = useState(16);
  const [topFontSize, setTopFontSize] = useState(16);

  const [activeSection, setActiveSection] = useState<'basic' | 'background' | 'font' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState("Red T-Shirt");

  const tabs = [
    {
      id: 'review-dashboard',
      content: 'Review Dashboard',
      panelID: 'review-dashboard-content'
    },
    {
      id: 'widget-style',
      content: 'Widget & Styles',
      panelID: 'widget-style-content'
    }
  ];

  // Sample Data for Logs
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
    <Page>
      <TitleBar title="Review Collection" />
      <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} fitted>
        {/* Tab 1: Review Dashboard */}
        <Layout.Section>
          {selectedTab === 0 && (
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
                <Text>Graph placeholder for future data visualization (e.g., daily reviews)</Text>
              </Card>
              <Card title="Review Logs">
                <BlockStack gap="200">
                  {filteredLogs.map((log, index) => (
                    <Card key={index} sectioned>
                      <Text strong>{log.product}</Text>
                      <Text>Reviewer: {log.user}</Text>
                      <Text>Rating: {"⭐".repeat(log.rating)}</Text>
                      <Text>Comment: {log.review}</Text>
                      <Text>Submitted on: {log.date}</Text>
                    </Card>
                  ))}
                </BlockStack>
              </Card>
            </BlockStack>
          )}

          {/* Tab 2: Widget & Styles */}
          {selectedTab === 1 && (
            <Card title="Widget Settings" padding="600">
              <BlockStack gap="400">
                {/* Basics Section */}
                <Button onClick={() => setActiveSection(activeSection === 'basic' ? null : 'basic')}>
                  {activeSection === 'basic' ? 'Hide' : 'Show'} Basics
                </Button>
                {activeSection === 'basic' && (
                  <BlockStack gap="400">
                    <Checkbox label="Enable Product Page Review Form" checked={enableFormWidget} onChange={setEnableFormWidget} />
                    <TextField
                      label="Heading Text for Product Page Widget"
                      value={formWidgetHeading}
                      onChange={setFormWidgetHeading}
                    />

                    <Checkbox label="Enable Top Reviewed Products Widget" checked={enableTopWidget} onChange={setEnableTopWidget} />
                    <TextField
                      label="Heading Text for Top Reviewed Widget"
                      value={topWidgetHeading}
                      onChange={setTopWidgetHeading}
                    />
                  </BlockStack>
                )}

                {/* Background Colors Section */}
                <Button onClick={() => setActiveSection(activeSection === 'background' ? null : 'background')}>
                  {activeSection === 'background' ? 'Hide' : 'Show'} Background Colors
                </Button>
                {activeSection === 'background' && (
                  <BlockStack gap="300">
                    <Text>Product Page Widget Background</Text>
                    <InlineStack align="start">
                      <div style={{ borderRadius: 8, overflow: "hidden", width: 80 }}>
                        <ColorPicker onChange={setFormBackgroundColor} color={formBackgroundColor} />
                      </div>
                    </InlineStack>

                    <Text>Top Reviewed Widget Background</Text>
                    <InlineStack align="start">
                      <div style={{ borderRadius: 8, overflow: "hidden", width: 80 }}>
                        <ColorPicker onChange={setTopBackgroundColor} color={topBackgroundColor} />
                      </div>
                    </InlineStack>
                  </BlockStack>
                )}

                {/* Font Size Section */}
                <Button onClick={() => setActiveSection(activeSection === 'font' ? null : 'font')}>
                  {activeSection === 'font' ? 'Hide' : 'Show'} Font Sizes
                </Button>
                {activeSection === 'font' && (
                  <BlockStack gap="300">
                    <Text>Product Page Widget Font Size: {formFontSize}px</Text>
                    <RangeSlider
                      label="Font Size"
                      value={formFontSize}
                      onChange={setFormFontSize}
                      output
                      min={10}
                      max={30}
                    />

                    <Text>Top Reviewed Widget Font Size: {topFontSize}px</Text>
                    <RangeSlider
                      label="Font Size"
                      value={topFontSize}
                      onChange={setTopFontSize}
                      output
                      min={10}
                      max={30}
                    />
                  </BlockStack>
                )}
              </BlockStack>
            </Card>
          )}
        </Layout.Section>
      </Tabs>
    </Page>
  );
}
