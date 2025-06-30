import { Page, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function ProductBundling() {
  return (
    <Page>
      <TitleBar title="Product Bundling" />
      <Text as="p" variant="bodyMd">
        🚧 Coming Soon: Create and configure product bundles for upsells.
      </Text>
    </Page>
  );
}