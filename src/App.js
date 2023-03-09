import { SessionContextProvider } from "./hooks/SessionContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HashtagContext from "./hooks/HashtagContext.js";
import Timeline from "./pages/Timeline/index.js";
import SignUp from "./pages/SignUp/index.js";
import SignIn from "./pages/SignIn/index.js";
import { useState } from "react";
import Hashtag from "./pages/Hashtag/index.js";

const App = () => {
  const [hashtag, setHashtag] = useState(null);
  return (
    <SessionContextProvider>
      <HashtagContext.Provider value={{ hashtag, setHashtag }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route exact path="/timeline" element={<Timeline />} />
            <Route exact path="/hashtag/:hashtagName" element={<Hashtag />} />
          </Routes>
        </BrowserRouter>
      </HashtagContext.Provider>
    </SessionContextProvider>
  );
};

export default App;
