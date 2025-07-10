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
  const [formFontSize, setFormFontSize] = useState<number>(16);
  const [topFontSize, setTopFontSize] = useState<number>(16);

  const [activeSection, setActiveSection] = useState<'basic' | 'background' | 'font' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState("Red T-Shirt");

  const tabs = [
    { id: 'review-dashboard', content: 'Review Dashboard', panelID: 'review-dashboard-content' },
    { id: 'widget-style', content: 'Widget & Styles', panelID: 'widget-style-content' }
  ];

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
        <Layout.Section>

          {/* Tab 1: Review Dashboard */}
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
                <Text as="p" variant="bodyMd">Graph placeholder for future data visualization (e.g., daily reviews)</Text>
              </Card>

              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">Review Logs</Text>
                  {filteredLogs.map((log, index) => (
                    <Card key={index} padding="300">
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
          )}

          {/* Tab 2: Widget & Styles */}
          {selectedTab === 1 && (
            <Card padding="600">
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
                      autoComplete="off"
                    />

                    <Checkbox label="Enable Top Reviewed Products Widget" checked={enableTopWidget} onChange={setEnableTopWidget} />
                    <TextField
                      label="Heading Text for Top Reviewed Widget"
                      value={topWidgetHeading}
                      onChange={setTopWidgetHeading}
                      autoComplete="off"
                    />
                  </BlockStack>
                )}

                {/* Background Colors Section */}
                <Button onClick={() => setActiveSection(activeSection === 'background' ? null : 'background')}>
                  {activeSection === 'background' ? 'Hide' : 'Show'} Background Colors
                </Button>

                {activeSection === 'background' && (
                  <BlockStack gap="300">
                    <Text as="p" variant="bodyMd">Product Page Widget Background</Text>
                    <InlineStack align="start">
                      <div style={{ borderRadius: 8, overflow: "hidden", width: 80 }}>
                        <ColorPicker onChange={setFormBackgroundColor} color={formBackgroundColor} />
                      </div>
                    </InlineStack>

                    <Text as="p" variant="bodyMd">Top Reviewed Widget Background</Text>
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
                    <Text as="p" variant="bodyMd">Product Page Widget Font Size: {formFontSize}px</Text>
                    <RangeSlider
                      label="Font Size"
                      value={formFontSize}
                      onChange={(val) => setFormFontSize(typeof val === 'number' ? val : formFontSize)}
                      output
                      min={10}
                      max={30}
                    />

                    <Text as="p" variant="bodyMd">Top Reviewed Widget Font Size: {topFontSize}px</Text>
                    <RangeSlider
                      label="Font Size"
                      value={topFontSize}
                      onChange={(val) => setTopFontSize(typeof val === 'number' ? val : topFontSize)}
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
