import { SessionContextProvider } from "./hooks/SessionContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./pages/Timeline/index.js";
import SignUp from "./pages/SignUp/index.js";
import SignIn from "./pages/SignIn/index.js";

const App = () => {
  return (
    <SessionContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </SessionContextProvider>
  );
};

export default App;
