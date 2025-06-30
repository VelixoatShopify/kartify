import { Page, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function AbandonedCart() {
  return (
    <Page>
      <TitleBar title="Abandoned Cart Recovery" />
      <Text as="p" variant="bodyMd">
        🚧 Coming Soon: Configure your abandoned cart recovery workflows here.
      </Text>
    </Page>
  );
}