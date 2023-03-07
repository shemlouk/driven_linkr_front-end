import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionContext from "./hooks/SessionContext.js";
import Timeline from "./layouts/Timeline/index.js";
import SignUp from "./pages/SignUp/index.js";
import SignIn from "./pages/SignIn/index.js";
import { useEffect, useState } from "react";

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("session"));
    setSession(sessionData);
  }, []);

  return (
    <SessionContext.Provider value={session}>
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
