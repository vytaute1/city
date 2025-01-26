import "./UserItem.scss"
import userLogo from "../../images/user.png"
import { Link } from "react-router-dom";

const UserItem = ({ user, onDelete, onEdit }) => {
  return (
    <div className="user-item-container">
    <h3 className="user-name">{user.name}</h3>
    {user.city && <p className="user-city">{user.city}</p>}
    <div className="user-and-logo">
      <div className="logo-container">
        <img alt="user-logo" src={userLogo} />
      </div>
    </div>
    <div className="actions">
      <button onClick={() => onDelete(user._id)}>Delete</button>
      <button onClick={() => onEdit(user)}>Edit</button>
      <Link to={`/users/${user._id}`}>
        <button className="details">View Details</button>
      </Link>
    </div>
  </div>
  );
};

export default UserItem;
