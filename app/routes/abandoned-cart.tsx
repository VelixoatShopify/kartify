import { useState } from "react";
import { Page, Card, Text, Box, InlineStack, BlockStack, Divider, Image } from "@shopify/polaris";
import type { MetaFunction } from "@remix-run/node";
import { Link, useLocation } from "@remix-run/react";
import chartPlaceholder from "../images/chart-placeholder.png";

export const meta: MetaFunction = () => [{ title: "Abandoned Cart Dashboard" }];

export default function AbandonedCart() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Page title="Abandoned Cart Recovery">
      {/* Navbar */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          borderBottom: '1px solid #dfe3e8',
          backgroundColor: '#f4f6f8',
          borderRadius: '8px',
        }}
      >
        <Box padding="400">
          <InlineStack align="center" gap="600"> {/* Increased gap */}
            <Link to="/abandoned-cart" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  backgroundColor: currentPath === '/abandoned-cart' ? '#ffffff' : 'transparent',
                  color: currentPath === '/abandoned-cart' ? '#000' : '#666',
                }}
              >
                <Text as="span" fontWeight="bold" variant="headingMd">
                  Dashboard
                </Text>
              </div>
            </Link>

            <Link to="/table" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  backgroundColor: currentPath === '/table' ? '#ffffff' : 'transparent',
                  color: currentPath === '/table' ? '#000' : '#666',
                }}
              >
                <Text as="span" fontWeight="bold" variant="headingMd">
                  Cart Recovery Table
                </Text>
              </div>
            </Link>

            <Link to="/settings" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  backgroundColor: currentPath === '/settings' ? '#ffffff' : 'transparent',
                  color: currentPath === '/settings' ? '#000' : '#666',
                }}
              >
                <Text as="span" fontWeight="bold" variant="headingMd">
                  Settings
                </Text>
              </div>
            </Link>
          </InlineStack>
        </Box>
      </div>

      {/* Dashboard Cards */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Box padding="400">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            <Card>
              <BlockStack gap="100">
                <Text variant="headingMd" as="h3">
                  Total Abandoned Cart
                </Text>
                <Text as="p" fontWeight="bold" variant="heading2xl">
                  T30
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="100">
                <Text variant="headingMd" as="h3">
                  Recovery Rate
                </Text>
                <Text as="p" fontWeight="bold" variant="heading2xl">
                  40%
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <InlineStack align="space-between">
                  <Text variant="headingMd" as="h3">
                    Recovered Revenue
                  </Text>
                  <Text as="span" fontWeight="bold">
                    $490k
                  </Text>
                </InlineStack>
                <Divider />
                <Box padding="200">
                  <Image
                    source="/images/chart-placeholder.png"
                    alt="Chart Placeholder"
                    width={200}
                  />
                </Box>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd" as="h3">
                  Recovery Channel Used
                </Text>
                <BlockStack gap="100">
                  <InlineStack align="space-between">
                    <Text as="span">WhatsApp</Text>
                    <Text as="span">30%</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text as="span">Email</Text>
                    <Text as="span">70%</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text as="span">Recieved</Text>
                    <Text as="span">20%</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>
          </div>
        </Box>
      </div>
    </Page>
  );
}
