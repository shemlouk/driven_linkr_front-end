import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionContext from "./hooks/SessionContext.js";
import HashtagContext from "./hooks/HashtagContext.js";
import Timeline from "./pages/Timeline/index.js";
import SignUp from "./pages/SignUp/index.js";
import SignIn from "./pages/SignIn/index.js";
import { useState } from "react";

const App = () => {
  const [session, setSession] = useState(null);
  const [hashtag, setHashtag] = useState(null);
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      <HashtagContext.Provider value = {{hashtag, setHashtag}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn {...{ setSession }} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route exact path="/timeline" element={<Timeline />} />
            <Route exact path="/hashtag/:hashtag" element={<Timeline />} />
          </Routes>
        </BrowserRouter>
      </HashtagContext.Provider>
    </SessionContext.Provider>
  );
};

export default App;
