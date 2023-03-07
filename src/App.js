import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/index.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
