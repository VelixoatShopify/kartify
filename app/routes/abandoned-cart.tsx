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
  const [message, setMessage] = useState("Hey [Name], we noticed you left some items in your cart. Complete your purchase now before they're gone!");
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [delay, setDelay] = useState("0");
  const [delayUnit, setDelayUnit] = useState("minutes");
  const [viaWhatsapp, setViaWhatsapp] = useState(false);
  const [viaEmail, setViaEmail] = useState(false);
  const [viaSms, setViaSms] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isEditing, setIsEditing] = useState(false);

  const timezones = [
    { label: 'UTC+00:00', value: 'UTC' },
    { label: 'GMT+00:00', value: 'GMT' },
    { label: 'IST+05:30', value: 'IST' },
    { label: 'EST-05:00', value: 'EST' },
    { label: 'PST-08:00', value: 'PST' },
  ];

  const delayUnits = [
    { label: 'Minutes', value: 'minutes' },
    { label: 'Hours', value: 'hours' },
  ];

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
  ];

  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>

      <div style={{ flex: '1 1 45%' }}>
        <Card>
          <div style={{ padding: 20, borderBottom: '1px solid #DFE3E8' }}>
            <Text as="h2" variant="headingMd">Template Editor</Text>
          </div>

          <div style={{ padding: 20 }}>
            {isEditing ? (
              <TextField
                labelHidden
                label="Message"
                multiline
                value={message}
                onChange={setMessage}
                autoComplete="off"
              />
            ) : (
              <Text as="p">{message}</Text>
            )}

            <div style={{ marginTop: 6 }}>
          <span style={{ fontSize: '12px', color: '#6D7175' }}>
            This is the default message sent to recover abandoned carts.
          </span>
        </div>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Button icon={EditIcon} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Done" : "Edit Message"}
          </Button>

          <div
            onClick={() => {
              // Handle dynamic variable insertion here
            }}
            style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-block',
              textAlign: 'center',
              minWidth: '200px',
            }}
          >
            Insert Dynamic Variables
          </div>
        </div>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ backgroundColor: '#075E54', padding: '8px 12px', borderRadius: '8px', color: '#FFFFFF' }}>
                <Checkbox
                  label={<span style={{ fontWeight: 'bold', color: '#FFFFFF' }}>Via WhatsApp</span>}
                  checked={viaWhatsapp}
                  onChange={setViaWhatsapp}
                />
              </div>

              <div style={{ backgroundColor: '#4682B4', padding: '8px 12px', borderRadius: '8px', color: '#FFFFFF' }}>
                <Checkbox
                  label={<span style={{ fontWeight: 'bold', color: '#FFFFFF' }}>Via Email</span>}
                  checked={viaEmail}
                  onChange={setViaEmail}
                />
              </div>

              <div style={{ backgroundColor: '#DCDCDC', padding: '8px 12px', borderRadius: '8px', color: '#000000' }}>
                <Checkbox
                  label={<span style={{ fontWeight: 'bold', color: '#000000' }}>Via SMS</span>}
                  checked={viaSms}
                  onChange={setViaSms}
                />
              </div>

            </div>
          </div>
        </Card>
      </div>

      <div style={{ flex: '1 1 45%' }}>
        <Card>
          <div style={{ padding: 20, borderBottom: '1px solid #DFE3E8' }}>
            <Text as="h2" variant="headingMd">Timezone & Delay</Text>
          </div>

          <div style={{ padding: 20 }}>
            <Select
              label="Timezone"
              options={timezones}
              value={selectedTimezone}
              onChange={setSelectedTimezone}
            />

            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <TextField
                label="Delay"
                type="number"
                value={delay}
                onChange={setDelay}
                autoComplete="off"
              />
              <Select
                label="Unit"
                options={delayUnits}
                value={delayUnit}
                onChange={setDelayUnit}
              />
            </div>

            <div style={{ borderTop: '1px solid #DFE3E8', marginTop: 24, paddingTop: 16 }}>
              <Text as="h2" variant="headingMd">Language Translation</Text>

              <div style={{ marginTop: 16 }}>
                <Select
                  label="Translate to"
                  options={languages}
                  value={language}
                  onChange={setLanguage}
                />
              </div>

              <div style={{ marginTop: 16 }}>
                <Button fullWidth size="medium">Save Translation</Button>
              </div>
            </div>

          </div>
        </Card>
      </div>

    </div>
  );
}
