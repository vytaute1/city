import React from "react";
// import "./Egypt.scss";

const Egypt = () => {
  const cities = [
    {
      name: "Sharm El Sheikh",
      description:
        "A beautiful resort town located between the desert of the Sinai Peninsula and the Red Sea.",
      image: "https://example.com/sharm.jpg",
    },
    {
      name: "Hurghada",
      description:
        "A stunning beach resort town along the Red Sea coast, famous for snorkeling and diving.",
      image: "https://example.com/hurghada.jpg",
    },
    {
      name: "Luxor",
      description:
        "Known as the world’s greatest open-air museum, Luxor is home to ancient Egyptian monuments.",
      image: "https://example.com/luxor.jpg",
    },
  ];

  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const handleCityChange = (event) => {
    const city = cities.find((c) => c.name === event.target.value);
    setSelectedCity(city);
  };

  return (
    <div className="egypt">
      <h1>Welcome to Egypt</h1>
      <p>
        Explore the beautiful cities of Egypt and learn about its rich culture.
      </p>
      <div className="city-selector">
        <label htmlFor="city">Select a City:</label>
        <select id="city" onChange={handleCityChange}>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <div className="city-details">
          <h2>{selectedCity.name}</h2>
          <p>{selectedCity.description}</p>
          <img src={selectedCity.image} alt={selectedCity.name} />
        </div>
      )}
    </div>
  );
};

export default Egypt;
