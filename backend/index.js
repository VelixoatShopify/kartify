// backend/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { shopify, sessionStorage, getAdminClient } = require("./shopify"); // Added getAdminClient & sessionStorage import

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Kartify backend is running!");
});

// ✅ Start OAuth
app.get("/auth", async (req, res) => {
  const shop = req.query.shop;
  if (!shop) return res.status(400).send("Missing shop parameter");

  try {
    await shopify.auth.begin({
      shop,
      callbackPath: "/auth/callback",
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    });
    // ⚠️ SDK handles redirect
  } catch (e) {
    console.error("❌ Auth begin error", e);
    return res.status(500).send("OAuth begin failed");
  }
});

// ✅ OAuth Callback
app.get("/auth/callback", async (req, res) => {
  try {
    const result = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const session = result.session;
    console.log("✅ Authenticated shop:", session.shop);

    return res.redirect(
      `https://admin.shopify.com/store/${session.shop.split(".myshopify.com")[0]}/apps/kartify-5?shop=${session.shop}`
    );
  } catch (e) {
    console.error("❌ OAuth callback error", e);
    return res.status(500).send("Authentication failed");
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
