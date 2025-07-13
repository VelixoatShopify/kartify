import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  TextField,
  Select,
  Button,
  InlineStack,
  Checkbox,
  Text,
  BlockStack,
  Divider,
  Box,
} from "@shopify/polaris";
import { json, ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const payload = {
    title: formData.get("title"),
    discountType: formData.get("discountType"),
    discountValue: formData.get("discountValue"),
    isVisible: formData.get("isVisible") === "on",
    style: {
      backgroundColor: formData.get("backgroundColor"),
      textColor: formData.get("textColor"),
      buttonColor: formData.get("buttonColor"),
      fontSize: formData.get("fontSize"),
    },
  };

  console.log("Bundle Saved:", payload);
  return json({ success: true, message: "Bundle saved successfully!" });
}

export default function BundlingPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const [bundleName, setBundleName] = useState("");
  const [discountType, setDiscountType] = useState("fixed");
  const [discountValue, setDiscountValue] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [buttonColor, setButtonColor] = useState("#007bff");
  const [fontSize, setFontSize] = useState("16");

  const discountOptions = [
    { label: "Fixed Price Bundle", value: "fixed" },
    { label: "Percentage Discount", value: "percentage" },
    { label: "Buy X Get Y", value: "bxgy" },
  ];

  return (
    <Page title="Create Product Bundle">
      <Layout>
        <Layout.Section>
          {actionData?.success && (
            <Card>
              <BlockStack gap="200" padding="400">
                <Text as="p" variant="bodyMd" tone="success">
                  ✅ {actionData.message}
                </Text>
              </BlockStack>
            </Card>
          )}

          <Card padding="400">
            <form method="POST">
              <BlockStack gap="400">
                {/* Bundle Details */}
                <Text as="h3" variant="headingMd">
                  Bundle Details
                </Text>

                <TextField
                  label="Bundle Name"
                  name="title"
                  value={bundleName}
                  onChange={setBundleName}
                  autoComplete="off"
                />

                <Select
                  label="Discount Type"
                  name="discountType"
                  options={discountOptions}
                  value={discountType}
                  onChange={setDiscountType}
                />

                <TextField
                  label={
                    discountType === "percentage"
                      ? "Discount %"
                      : discountType === "fixed"
                      ? "Fixed Price"
                      : "Offer Details"
                  }
                  name="discountValue"
                  value={discountValue}
                  onChange={setDiscountValue}
                  type="text"
                />

                <Checkbox
                  label="Visible on Storefront"
                  name="isVisible"
                  checked={isVisible}
                  onChange={setIsVisible}
                />

                <Divider />

                {/* Styling Section */}
                <Text as="h3" variant="headingMd">
                  Style Your Bundle Widget
                </Text>

                <InlineStack wrap={false} gap="400">
                  <Box width="33%">
                    <Text as="label">Background Color (HEX)</Text>
                    <input
                      type="color"
                      name="backgroundColor"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      style={{ width: "100%", height: "36px", border: "none" }}
                    />
                  </Box>

                  <Box width="33%">
                    <Text as="label">Text Color (HEX)</Text>
                    <input
                      type="color"
                      name="textColor"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      style={{ width: "100%", height: "36px", border: "none" }}
                    />
                  </Box>

                  <Box width="33%">
                    <Text as="label">Button Color (HEX)</Text>
                    <input
                      type="color"
                      name="buttonColor"
                      value={buttonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      style={{ width: "100%", height: "36px", border: "none" }}
                    />
                  </Box>
                </InlineStack>

                <div>
                  <Text as="label">Font Size: {fontSize}px</Text>
                  <input
                    type="range"
                    name="fontSize"
                    min="12"
                    max="32"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    style={{ width: "100%", marginTop: "8px" }}
                  />
                </div>

                <Divider />

                {/* Live Preview */}
                <Text as="h3" variant="headingMd">
                  Live Preview
                </Text>

                <Box
                  padding="400"
                  borderRadius="200"
                  background="bg-surface"
                  style={{
                    backgroundColor,
                    color: textColor,
                    fontSize: `${fontSize}px`,
                    border: `1px solid #ddd`,
                  }}
                >
                  <Text variant="headingSm">🔥 Bundle Preview</Text>
                  <p>Buy the combo at ₹{discountValue}</p>
                  <button
                    style={{
                      marginTop: "10px",
                      backgroundColor: buttonColor,
                      color: "#fff",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Add Bundle to Cart
                  </button>
                </Box>

                <InlineStack align="end">
                  <Button
                    primary
                    submit
                    loading={navigation.state === "submitting"}
                  >
                    Save Bundle
                  </Button>
                </InlineStack>
              </BlockStack>
            </form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}