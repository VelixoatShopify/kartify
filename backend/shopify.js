const { shopifyApi, LATEST_API_VERSION } = require("@shopify/shopify-api");
const { shopifyApiAdapter } = require("@shopify/shopify-api/adapters/node"); // ✅ correct adapter import
const { SQLiteSessionStorage } = require("@shopify/shopify-app-session-storage-sqlite");
require("dotenv").config();

const dbPath = `${__dirname}/database.sqlite`;

const shopify = shopifyApi({
  adapter: shopifyApiAdapter, // ✅ set adapter here!
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES.split(","),
  hostName: process.env.HOST.replace(/^https?:\/\//, ""),
  isEmbeddedApp: true,
  apiVersion: LATEST_API_VERSION,
  sessionStorage: new SQLiteSessionStorage(dbPath),
});

module.exports = { shopify };
