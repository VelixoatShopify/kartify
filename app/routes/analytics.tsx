import { Page, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function AnalyticsDashboard() {
  return (
    <Page>
      <TitleBar title="Analytics Dashboard" />
      <Text as="p" variant="bodyMd">
        🚧 Coming Soon: View your store performance and key metrics.
      </Text>
    </Page>
  );
}