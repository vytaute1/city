import egypt1 from "./images/egypt1.jpg";
import "./App.scss";
import Egypt from "./Egypt";
import UserList from "./UserList";

function App() {
  return (
    <div>
      <Egypt />
      <img src={egypt1} alt="Logo" />
      <UserList />
    </div>
  );
}

export default App;
