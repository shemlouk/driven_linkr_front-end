import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionContext from "./hooks/SessionContext.js";
import SignUp from "./pages/SignUp/index.js";
import SignIn from "./pages/SignIn/index.js";
import { useState } from "react";

const App = () => {
  const [session, setSession] = useState(null);
  return (
    <SessionContext.Provider value={session}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn {...{ setSession }} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </SessionContext.Provider>
  );
};

export default App;
