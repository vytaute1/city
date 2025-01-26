const express = require("express");
const {
  getAllCities,
  getCitiesByUserId,
  createCity,
  updateCity,
  deleteCity,
} = require("../services/citiesServices");

const router = express.Router();

// GET: Fetch all cities
router.get("/", async (req, res) => {
  try {
    const cities = await getAllCities();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

// GET: Fetch cities for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const cities = await getCitiesByUserId(req.params.userId);
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cities for user" });
  }
});

// POST: Create a new city
router.post("/", async (req, res) => {
  try {
    const city = await createCity(req.body);
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ error: "Failed to create city" });
  }
});

// PUT: Update an existing city
router.put("/:id", async (req, res) => {
  try {
    const updatedCity = await updateCity(req.params.id, req.body);
    res.status(200).json(updatedCity);
  } catch (error) {
    res.status(500).json({ error: "Failed to update city" });
  }
});

// DELETE: Delete a city
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteCity(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete city" });
  }
});

module.exports = router;