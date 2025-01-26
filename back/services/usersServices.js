const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

async function getAllUsers() {
  try {
    const db = getDB();
    const collection = db.collection("users");
    const result = await collection.find().sort({ _id: -1 }).toArray();
    return result;
  } catch (error) {
    console.error("Failed to get users:", error);
    throw new Error("Failed to get users");
  }
}

async function getUserById(id) {
  try {
    const db = getDB();
    const collection = db.collection("users");
    const result = await collection.findOne({ _id: ObjectId.createFromHexString(id) });
    return result;
  } catch (error) {
    console.error("Failed to get user:", error);
    throw new Error("Failed to get user");
  }
}

async function createUser(newUser) {
  try {
    const db = getDB();
    const collection = db.collection("users");
    const result = await collection.insertOne(newUser);

    if (result.acknowledged) {
      const user = await db.collection("users").findOne({ _id: result.insertedId });
      return user;
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new Error("Failed to create user");
  }
}

async function updateUser(id, updatedUser) {
  try {
    const db = getDB();
    const collection = db.collection("users");
    const result = await collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(id) },
      { $set: updatedUser },
      { returnDocument: "after" }
    );

    if (result.matchedCount === 0) {
      throw new Error("User not found");
    }

    return result;
  } catch (error) {
    console.error(`Failed to update user with ID: ${id}`, error);
    throw new Error("Failed to update user");
  }
}

async function deleteUser(id) {
  try {
    const db = getDB();
    const collection = db.collection("users");
    const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) });

    if (result.deletedCount === 0) {
      throw new Error("User not found");
    }

    return { message: "User deleted successfully" };
  } catch (error) {
    console.error(`Failed to delete user with ID: ${id}`, error);
    throw new Error("Failed to delete user");
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
