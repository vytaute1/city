const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

async function getAllCities() {
  try {
    const db = getDB();
    const collection = db.collection("city");
    const result = await collection.find().sort({ _id: -1 }).toArray();
    return result;
  } catch (error) {
    console.error("Failed to get cities:", error);
    throw new Error("Failed to get cities");
  }
}

async function getCitiesByUserId(userId) {
  try {
    const db = getDB();
    const collection = db.collection("city");
    const result = await collection.find({ userId: ObjectId(userId) }).toArray();
    return result;
  } catch (error) {
    console.error("Failed to get cities for user:", error);
    throw new Error("Failed to get cities for user");
  }
}

async function createCity(newCity) {
  try {
    const db = getDB();
    const collection = db.collection("city");
    const result = await collection.insertOne(newCity);

    if (result.acknowledged) {
      const city = await collection.findOne({ _id: result.insertedId });
      return city;
    } else {
      throw new Error("Failed to create city");
    }
  } catch (error) {
    console.error("Failed to create city:", error);
    throw new Error("Failed to create city");
  }
}

async function updateCity(id, updatedCity) {
  try {
    const db = getDB();
    const collection = db.collection("city");
    const result = await collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(id) },
      { $set: updatedCity },
      { returnDocument: "after" }
    );

    if (result.matchedCount === 0) {
      throw new Error("City not found");
    }

    return result;
  } catch (error) {
    console.error(`Failed to update city with ID: ${id}`, error);
    throw new Error("Failed to update city");
  }
}

async function deleteCity(id) {
  try {
    const db = getDB();
    const collection = db.collection("city");
    const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) });

    if (result.deletedCount === 0) {
      throw new Error("City not found");
    }

    return { message: "City deleted successfully" };
  } catch (error) {
    console.error(`Failed to delete city with ID: ${id}`, error);
    throw new Error("Failed to delete city");
  }
}

module.exports = {
  getAllCities,
  getCitiesByUserId,
  createCity,
  updateCity,
  deleteCity,
};
