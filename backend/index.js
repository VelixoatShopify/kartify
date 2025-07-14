const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { shopify } = require("./shopify");

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
    // ⚠️ Don't manually redirect here — SDK handles it
  } catch (e) {
    console.error("❌ Auth begin error", e);
    return res.status(500).send("OAuth begin failed");
  }
});

// ✅ OAuth Callback
// ✅ OAuth Callback
app.get("/auth/callback", async (req, res) => {
  try {
    const result = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const session = result.session; // ✅ FIXED: extract session from result

    console.log("✅ FULL session object:", session);

    if (!session || !session.shop || !session.accessToken) {
      console.error("❌ Missing session data:", session);
      return res.status(500).send("OAuth failed: session data incomplete");
    }

    console.log("✅ Authenticated shop:", session.shop);
    console.log("🔐 Access token:", session.accessToken);

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


