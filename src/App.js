import { Toaster } from "react-hot-toast";
import "./App.css";
import User from "./getuser/User";

function App() {
  return (
    <div className="App">
      <User />
      <Toaster />
    </div>
  );
}

export default App;
