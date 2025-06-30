import {
  Page,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Button,
  List,
  Box,
} from "@shopify/polaris";

export default function AppHome() {
  return (
    <Page title="Kartify">
      <BlockStack gap="600">
        {/* Top: Company Intro */}
        <Card>
          <Box padding="400">
            <BlockStack gap="400">
              {/* <Text variant="headingXl" as="h1">
                Kartify
              </Text> */}
              <Text variant="bodyMd" as="p">
                Kartify is your all-in-one Shopify automation toolkit designed to streamline abandoned cart recovery, WhatsApp communication, review collection, product bundling, and analytics — helping you boost conversions and build lasting customer relationships.
              </Text>
            </BlockStack>
          </Box>
        </Card>

        {/* Side-by-Side: Support & To-Do */}
        <InlineStack gap="400" wrap={false}>
          {/* Left Card */}
          <Box width="50%">
            <Card>
              <Box padding="400" minHeight="180px">
                <BlockStack gap="300">
                  <Text variant="headingLg" as="h2">
                    Customer Support
                  </Text>
                  <Text variant="bodyMd" as="p">
                    Need help? Our support team is here to assist you with anything — from setup to troubleshooting.
                  </Text>
                  <Button variant="primary">Contact Support</Button>
                </BlockStack>
              </Box>
            </Card>
          </Box>

          {/* Right Card */}
          <Box width="50%">
            <Card>
              <Box padding="400" minHeight="180px">
                <BlockStack gap="300">
                  <Text variant="headingLg" as="h2">
                    Your To-Do List
                  </Text>
                  <List>
                    <List.Item>Connect your WhatsApp account</List.Item>
                    <List.Item>Enable abandoned cart recovery</List.Item>
                    <List.Item>Set up product bundling</List.Item>
                    <List.Item>Configure review collection</List.Item>
                  </List>
                </BlockStack>
              </Box>
            </Card>
          </Box>
        </InlineStack>
      </BlockStack>
    </Page>
  );
}
