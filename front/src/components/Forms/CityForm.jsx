import React, { useState, useEffect } from "react";
import { createCity, editCity } from "../../api/cityApi";
import "./Form.scss";

const CityForm = ({ userId, onCityAdded, cityToEdit, onEditCity, onCancelEdit }) => {
  const [cityData, setCityData] = useState({ name: "", description: "", image: "" });

  useEffect(() => {
    if (cityToEdit) {
      setCityData({
        name: cityToEdit.name || "",
        description: cityToEdit.description || "",
        image: cityToEdit.image || "",
      });
    } else {
      setCityData({
        name: "",
        description: "",
        image: "",
      });
    }
  }, [cityToEdit]);

  const handleInputChange = (e) => {
    setCityData({ ...cityData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (cityToEdit) {
        const updatedCity = await editCity(cityToEdit._id, { ...cityData, userId });
        onEditCity(updatedCity); 
      } else {
        const createdCity = await createCity({ ...cityData, userId });
        onCityAdded(createdCity); 
      }

      setCityData({ name: "", description: "", image: "" });
    } catch (error) {
      console.error(cityToEdit ? "Error editing city:" : "Error adding city:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        name="name"
        placeholder="City Name"
        value={cityData.name}
        onChange={handleInputChange}
        className="form-input"
      />
      <input
        type="text"
        name="description"
        placeholder="City Description"
        value={cityData.description}
        onChange={handleInputChange}
        className="form-input"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={cityData.image}
        onChange={handleInputChange}
        className="form-input"
      />
      <div className="form-actions">
        <button type="submit" className="form-button">
          {cityToEdit ? "Update City" : "Add City"}
        </button>
        {cityToEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="form-button cancel-button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CityForm;
