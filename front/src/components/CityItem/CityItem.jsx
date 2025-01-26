import "./CityItem.scss";

const CityItem = ({ city, onDelete, onEdit }) => {
  return (
    <div className="city-item-container">
      <h3 className="city-name">Name: {city.name}</h3>
      {city.description && <p className="city-description">Description: {city.description}</p>}
      {city.image && <div className="city-and-logo">
        <div className="logo-container">
          <img alt={`${city.name} logo`} src={city.image} />
        </div>
      </div>}
      <div className="actions">
        <button onClick={() => onEdit(city)}>Edit</button>
        <button onClick={() => onDelete(city._id)}>Delete</button>
      </div>
    </div>
  );
};

export default CityItem;

