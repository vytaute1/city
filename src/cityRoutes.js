const express = require("express");
const router = express.Router();

const cities = [
  {
    id: 1,
    name: "Sharm El Sheikh",
    description:
      "A beautiful resort town located between the desert of the Sinai Peninsula and the Red Sea.",
    image: "https://example.com/sharm.jpg",
  },
  {
    id: 2,
    name: "Hurghada",
    description:
      "A stunning beach resort town along the Red Sea coast, famous for snorkeling and diving.",
    image: "https://example.com/hurghada.jpg",
  },
  {
    id: 3,
    name: "Luxor",
    description:
      "Known as the world’s greatest open-air museum, Luxor is home to ancient Egyptian monuments.",
    image: "https://example.com/luxor.jpg",
  },
];

// Get All Cities
router.get("/", (req, res) => {
  res.json(cities);
});

// Get City by ID
router.get("/:id", (req, res) => {
  const city = cities.find((c) => c.id === parseInt(req.params.id));
  if (!city) return res.status(404).json({ message: "City not found" });
  res.json(city);
});

module.exports = router;
