// shopify.js
const { shopifyApi, LATEST_API_VERSION } = require("@shopify/shopify-api");
const { shopifyApiAdapter } = require("@shopify/shopify-api/adapters/node");
const { SQLiteSessionStorage } = require("@shopify/shopify-app-session-storage-sqlite");
require("dotenv").config();
const path = require("path");

// ✅ SQLite DB file path
const dbPath = path.join(__dirname, "database.sqlite");

const sessionStorage = new SQLiteSessionStorage(dbPath); // ✅ actual session storage instance

const shopify = shopifyApi({
  adapter: shopifyApiAdapter,
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES.split(","),
  hostName: process.env.HOST.replace(/^https?:\/\//, ""),
  isEmbeddedApp: true,
  apiVersion: LATEST_API_VERSION,
  sessionStorage, // ✅ correctly passed here
});

// ────────────────────────────────────────────────────────────────────────
// Helper: get a REST client for the current session
async function getAdminClient(session) {
  return new shopify.clients.Rest({
    session,
    version: LATEST_API_VERSION
  });
}

module.exports = { shopify, sessionStorage, getAdminClient };
