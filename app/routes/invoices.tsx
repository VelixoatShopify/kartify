import { Page, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function InvoiceGeneration() {
  return (
    <Page>
      <TitleBar title="Invoice Generation" />
      <Text as="p" variant="bodyMd">
        🚧 Coming Soon: Generate and send invoices to your customers.
      </Text>
    </Page>
  );
}