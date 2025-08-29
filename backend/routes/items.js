const express = require("express");
const router = express.Router();
const stringSimilarity = require("string-similarity");

// Temporary in-memory storage (replace later with DB)
let items = [];

/**
 * POST /report
 * Save a lost/found item
 */
router.post("/report", (req, res) => {
  const newItem = {
    id: items.length + 1,
    type: req.body.type, // 'lost' or 'found'
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    location: req.body.location,
    date: req.body.date,
  };

  items.push(newItem);

  let matches = [];

  // If user reports LOST → check all FOUND in same category
  if (newItem.type === "lost") {
    const foundItems = items.filter(
      (i) => i.type === "found" && i.category === newItem.category
    );

    matches = foundItems
      .map((fi) => {
        return {
          item: fi,
          score: stringSimilarity.compareTwoStrings(
            newItem.description.toLowerCase(),
            fi.description.toLowerCase()
          ),
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // take top 3
  }

  res.json({
    message: "Item added successfully!",
    newItem,
    possibleMatches: matches,
  });
});

/**
 * GET /items
 * Get all items (with optional filters)
 */
router.get("/items", (req, res) => {
  let results = items;

  if (req.query.type) {
    results = results.filter((i) => i.type === req.query.type);
  }
  if (req.query.category) {
    results = results.filter((i) => i.category === req.query.category);
  }
  if (req.query.q) {
    const q = req.query.q.toLowerCase();
    results = results.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q)
    );
  }

  res.json(results);
});

module.exports = router;
