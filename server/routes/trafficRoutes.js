const express = require("express");
const router = express.Router();
const {
  addTrafficData,
  getTrafficData,
  getLiveTrafficStatus,
  getPublicAlerts,
  getRoadCongestion,
  getHealth
} = require("../controllers/trafficController");
const { auth } = require("../middlewares/auth");

// Public endpoints (no auth required)
router.get("/health", getHealth);

// Protected endpoints (auth required)
router.get("/live-status", auth, getLiveTrafficStatus);
router.get("/alerts", auth, getPublicAlerts);
router.get("/congestion", auth, getRoadCongestion);

// Legacy endpoints
router.post("/add", auth, addTrafficData);
router.get("/", auth, getTrafficData);

module.exports = router;