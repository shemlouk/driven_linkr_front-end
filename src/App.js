import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionContext from "./hooks/SessionContext.js";
import Timeline from "./layouts/Timeline/index.js";
import SignUp from "./pages/SignUp/index.js";
import SignIn from "./pages/SignIn/index.js";
import { useState } from "react";

const App = () => {
  const [session, setSession] = useState(null);
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn {...{ setSession }} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </SessionContext.Provider>
  );
};

export default App;
