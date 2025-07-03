import { useState } from "react";
import { Page, Card, Text, Box, InlineStack, BlockStack, Button } from "@shopify/polaris";
import { Link, useLocation } from "@remix-run/react";

export default function CartRecoveryTable() {
  const location = useLocation();
  const currentPath = location.pathname;

  const cartData = [
    { customer: "John Doe", items: "2 items", date: "2024-07-01", value: "$150", status: "Pending" },
    { customer: "Jane Smith", items: "1 item", date: "2024-07-02", value: "$75", status: "Recovered" },
    { customer: "Alice Brown", items: "3 items", date: "2024-07-03", value: "$200", status: "Pending" },
    { customer: "Bob Johnson", items: "4 items", date: "2024-07-04", value: "$340", status: "Recovered" },
    { customer: "Chris Evans", items: "2 items", date: "2024-07-05", value: "$110", status: "Pending" },
    { customer: "Diana Prince", items: "1 item", date: "2024-07-06", value: "$60", status: "Recovered" },
    { customer: "Bruce Wayne", items: "5 items", date: "2024-07-07", value: "$500", status: "Pending" },
    { customer: "Clark Kent", items: "2 items", date: "2024-07-08", value: "$130", status: "Recovered" },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(cartData.length / itemsPerPage);

  return (
    <Page title="Cart Recovery Table">
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

      {/* Table */}
      <div style={{ maxWidth: '1100px', margin: '20px auto' }}>
        <Card>
          <BlockStack gap="400">
            <Box padding="400">
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr 1fr', paddingBottom: '16px' }}>
                <Text as="h4" variant="headingMd" fontWeight="bold">Customer</Text>
                <Text as="h4" variant="headingMd" fontWeight="bold">Cart Items</Text>
                <Text as="h4" variant="headingMd" fontWeight="bold">Abandoned Date</Text>
                <Text as="h4" variant="headingMd" fontWeight="bold">Value</Text>
                <Text as="h4" variant="headingMd" fontWeight="bold">Status</Text>
              </div>

              {currentItems.map((cart, index) => (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr 1fr', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                  <Text as="span" variant="bodyMd">{cart.customer}</Text>
                  <Text as="span" variant="bodyMd">{cart.items}</Text>
                  <Text as="span" variant="bodyMd">{cart.date}</Text>
                  <Text as="span" variant="bodyMd">{cart.value}</Text>
                  <div>
                    {cart.status === "Pending" ? (
                      <Button size="slim" onClick={() => alert(`Recovering cart for ${cart.customer}`)}>
                        Recover Now
                      </Button>
                    ) : (
                      <Text as="span" variant="bodyMd">Recovered</Text>
                    )}
                  </div>
                </div>
              ))}
            </Box>

            {/* Custom Pagination */}
            <Box padding="400">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    backgroundColor: '#fff'
                  }}
                >
                  Previous
                </button>

                {[...Array(totalPages).keys()].map(num => (
                  <button
                    key={num + 1}
                    onClick={() => setCurrentPage(num + 1)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      backgroundColor: currentPage === num + 1 ? '#000' : '#fff',
                      color: currentPage === num + 1 ? '#fff' : '#000',
                      cursor: 'pointer'
                    }}
                  >
                    {num + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    backgroundColor: '#fff'
                  }}
                >
                  Next
                </button>
              </div>
            </Box>
          </BlockStack>
        </Card>
      </div>
    </Page>
  );
}
