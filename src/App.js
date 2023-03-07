import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./layouts/Timeline/index.js";
import SignUp from "./pages/SignUp/index.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
