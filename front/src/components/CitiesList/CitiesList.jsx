import CityItem from "../CityItem/CityItem";
import "./CitiesList.scss"

const CitiesList = ({ cities, onDelete, onEdit }) => {
  if (!cities || cities.length === 0) {
    return <p>No associated cities.</p>;
  }

  return (
    <>
      <h2>Cities List:</h2>
      <div className="city-list-container">
        {cities.map((city) => (
          <CityItem key={city._id} city={city} onDelete={onDelete} onEdit={onEdit}/> 
        ))}
      </div>
    </>
  );
};

export default CitiesList;