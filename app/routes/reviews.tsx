import { Page, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function ReviewCollection() {
  return (
    <Page>
      <TitleBar title="Review Collection" />
      <Text as="p" variant="bodyMd">
        🚧 Coming Soon: Collect and manage customer reviews effectively.
      </Text>
    </Page>
  );
}