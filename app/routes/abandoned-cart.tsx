import { useSearchParams, Link, useNavigate } from "@remix-run/react";
import { Page, Card, Text, Box, InlineStack, BlockStack, Divider, Image, Button, TextField, Select, Checkbox } from "@shopify/polaris";
import { useState } from "react";
import { EditIcon } from "@shopify/polaris-icons";

export default function AbandonedCartPage() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "dashboard";

  return (
    <Page title="Abandoned Cart Recovery">
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
            <Link to="/abandoned-cart?view=dashboard" style={{ textDecoration: 'none' }}>
              <div style={navButtonStyle(view === "dashboard")}> 
                <Text as="span" fontWeight="bold" variant="headingMd">Dashboard</Text>
              </div>
            </Link>

            <Link to="/abandoned-cart?view=table" style={{ textDecoration: 'none' }}>
              <div style={navButtonStyle(view === "table")}> 
                <Text as="span" fontWeight="bold" variant="headingMd">Cart Recovery Table</Text>
              </div>
            </Link>

            <Link to="/abandoned-cart?view=settings" style={{ textDecoration: 'none' }}>
              <div style={navButtonStyle(view === "settings")}> 
                <Text as="span" fontWeight="bold" variant="headingMd">Settings</Text>
              </div>
            </Link>
          </InlineStack>
        </Box>
      </div>

      <Box padding="400">
        {view === "dashboard" && <DashboardComponent />}
        {view === "table" && <TableComponent />}
        {view === "settings" && <SettingsComponent />}
      </Box>
    </Page>
  );
}

const navButtonStyle = (active: boolean) => ({
  padding: '10px 16px',
  borderRadius: '999px',
  cursor: 'pointer',
  backgroundColor: active ? '#ffffff' : 'transparent',
  color: active ? '#000' : '#666',
});

function DashboardComponent() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Box padding="400">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Card>
            <BlockStack gap="100">
              <Text as="h3" variant="headingMd">Total Abandoned Cart</Text>
              <Text as="p" fontWeight="bold" variant="heading2xl">30</Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="100">
              <Text as="h3" variant="headingMd">Recovery Rate</Text>
              <Text as="p" fontWeight="bold" variant="heading2xl">40%</Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="200">
              <InlineStack align="space-between">
                <Text as="h3" variant="headingMd">Recovered Revenue</Text>
                <Text as="span" fontWeight="bold">$490k</Text>
              </InlineStack>
              <Divider />
              <Box padding="200">
                <Image source="/images/chart-placeholder.png" alt="Chart Placeholder" width={200} />
              </Box>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="200">
              <Text as="h3" variant="headingMd">Recovery Channel Used</Text>
              <BlockStack gap="100">
                <InlineStack align="space-between"><Text as="span">WhatsApp</Text><Text as="span">30%</Text></InlineStack>
                <InlineStack align="space-between"><Text as="span">Email</Text><Text as="span">70%</Text></InlineStack>
                <InlineStack align="space-between"><Text as="span">Received</Text><Text as="span">20%</Text></InlineStack>
              </BlockStack>
            </BlockStack>
          </Card>
        </div>
      </Box>
    </div>
  );
}

function TableComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const cartData = [
    { customer: "John Doe", items: "2 items", date: "2024-07-01", value: "$150", status: "Pending" },
    { customer: "Jane Smith", items: "1 item", date: "2024-07-02", value: "$75", status: "Recovered" },
    { customer: "Alice Brown", items: "3 items", date: "2024-07-03", value: "$200", status: "Pending" },
    { customer: "Bob Johnson", items: "4 items", date: "2024-07-04", value: "$340", status: "Recovered" },
    { customer: "Chris Evans", items: "2 items", date: "2024-07-05", value: "$110", status: "Pending" },
    { customer: "Diana Prince", items: "1 item", date: "2024-07-06", value: "$60", status: "Recovered" },
  ];

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cartData.length / itemsPerPage);

  return (
    <div style={{ maxWidth: '1100px', margin: '20px auto' }}>
      <Card>
        <BlockStack gap="400">
          <Box padding="400">
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr 1fr', paddingBottom: '16px' }}>
              <Text as="h4" variant="headingMd">Customer</Text>
              <Text as="h4" variant="headingMd">Cart Items</Text>
              <Text as="h4" variant="headingMd">Abandoned Date</Text>
              <Text as="h4" variant="headingMd">Value</Text>
              <Text as="h4" variant="headingMd">Status</Text>
            </div>

            {currentItems.map((cart, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr 1fr', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <Text as="span">{cart.customer}</Text>
                <Text as="span">{cart.items}</Text>
                <Text as="span">{cart.date}</Text>
                <Text as="span">{cart.value}</Text>
                <div>
                  {cart.status === "Pending" ? (
                    <Button size="slim" onClick={() => navigate('/abandoned-cart?view=settings')}>Recover Now</Button>
                  ) : (
                    <Text as="span">Recovered</Text>
                  )}
                </div>
              </div>
            ))}
          </Box>

          <Box padding="400">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
              {[...Array(totalPages).keys()].map(num => (
                <button key={num} onClick={() => setCurrentPage(num + 1)}>{num + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
          </Box>
        </BlockStack>
      </Card>
    </div>
  );
}

function SettingsComponent() {
  const [message, setMessage] = useState("Hi [Name],\nYou left something in your cart...");
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
    <BlockStack gap="400">
      <Card padding="600">
        <BlockStack gap="400">
          <Text as="h2" variant="headingMd">Template Editor</Text>
          <TextField
            label="Message"
            labelHidden
            value={message}
            onChange={setMessage}
            multiline
            autoComplete="off"
          />
          <InlineStack gap="200">
            <Button icon={EditIcon} size="medium">Edit msg</Button>
            <Button variant="primary" size="medium">Insert Dynamic Variables</Button>
          </InlineStack>
          <InlineStack gap="400">
            <Checkbox label="WhatsApp" checked={viaWhatsapp} onChange={setViaWhatsapp} />
            <Checkbox label="Email" checked={viaEmail} onChange={setViaEmail} />
            <Checkbox label="SMS" checked={viaSms} onChange={setViaSms} />
          </InlineStack>
        </BlockStack>
      </Card>

      <Card padding="600">
        <BlockStack gap="400">
          <Text as="h2" variant="headingMd">Timezone and Delay Settings</Text>
          <Select label="Timezone" options={timezones} value={selectedTimezone} onChange={setSelectedTimezone} />
          <InlineStack gap="200">
            <TextField label="Delay" type="number" value={delay} onChange={setDelay} autoComplete="off" />
            <Select label="Unit" options={delayUnits} value={delayUnit} onChange={setDelayUnit} />
          </InlineStack>
          <div style={{ maxWidth: '200px', margin: '16px auto 0 auto' }}>
            <Button variant="primary" size="slim" fullWidth>Save Settings</Button>
          </div>
        </BlockStack>
      </Card>
    </BlockStack>
  );
}