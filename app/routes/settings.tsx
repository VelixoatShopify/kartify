import { Page, Card, Text, Box, TextField, Button, InlineStack, BlockStack, Select, Checkbox } from "@shopify/polaris";
import { EditIcon } from "@shopify/polaris-icons";
import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";

export default function SettingsPage() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [message, setMessage] = useState(
    "Hi [Name],\nYou left something in your cart,\nDon’t forget to complete your purchase!\n[Products]"
  );
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [delay, setDelay] = useState("0");
  const [delayUnit, setDelayUnit] = useState("minutes");
  const [viaWhatsapp, setViaWhatsapp] = useState(false);
  const [viaEmail, setViaEmail] = useState(false);
  const [viaSms, setViaSms] = useState(false);

  const timezones = [
    { label: 'UTC+00:00', value: 'UTC' },
    { label: 'GMT+00:00', value: 'GMT' },
    { label: 'IST+05:30', value: 'IST' },
    { label: 'EST-05:00', value: 'EST' },
    { label: 'PST-08:00', value: 'PST' },
  ];

  const delayUnits = [
    { label: 'minutes', value: 'minutes' },
    { label: 'hours', value: 'hours' },
  ];

  return (
    <Page title="Recovery Actions and Settings">
      <BlockStack gap="400">

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
                  <InlineStack align="center" gap="600">
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

        {/* Template Editor Section */}
        <Card padding="600">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">Template Editor</Text>

            <TextField
              label=""
              value={message}
              onChange={(value) => setMessage(value)}
              multiline
              autoComplete="off"
              helpText="This is the message that will be sent to recover abandoned carts."
            />

            <InlineStack gap="200">
              <Button icon={EditIcon} size="medium">Edit msg</Button>
              <Button variant="primary" size="medium">Insert Dynamic Variables</Button>
            </InlineStack>

            <InlineStack gap="400">
              <Checkbox
                label={<div style={{ backgroundColor: '#25D366', padding: '6px 10px', borderRadius: '8px', color: '#fff' }}>Via WhatsApp</div>}
                checked={viaWhatsapp}
                onChange={setViaWhatsapp}
              />
              <Checkbox
                label={<div style={{ backgroundColor: '#007bff', padding: '6px 10px', borderRadius: '8px', color: '#fff' }}>Via Email</div>}
                checked={viaEmail}
                onChange={setViaEmail}
              />
              <Checkbox
                label={<div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '6px 10px', borderRadius: '8px', color: '#000' }}>Via SMS</div>}
                checked={viaSms}
                onChange={setViaSms}
              />
            </InlineStack>

          </BlockStack>
        </Card>

        {/* Timezone and Delay */}
        <Card padding="600">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">Timezone and Delay Settings</Text>

            <Select
              label="Timezone"
              options={timezones}
              value={selectedTimezone}
              onChange={setSelectedTimezone}
            />

            <InlineStack gap="200">
              <TextField
                label="Delay"
                type="number"
                value={delay}
                onChange={setDelay}
                autoComplete="off"
              />
              <Select
                label="Prfou"
                options={delayUnits}
                value={delayUnit}
                onChange={setDelayUnit}
              />
            </InlineStack>

            <div style={{ maxWidth: '200px', margin: '16px auto 0 auto' }}>
              <Button
                variant="primary"
                size="slim"
                fullWidth
              >
                Save Settings
              </Button>
            </div>
            
          </BlockStack>
        </Card>

      </BlockStack>
    </Page>
  );
}
