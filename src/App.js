import { SessionContextProvider } from "./hooks/SessionContext.js";
import { PublishContextProvider } from "./hooks/PublishContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HashtagContext from "./hooks/HashtagContext.js";
import Timeline from "./pages/Timeline/index.js";
import SignUp from "./pages/SignUp/index.js";
import SignIn from "./pages/SignIn/index.js";
import { useState } from "react";
import Hashtag from "./pages/Hashtag/index.js";
import UserPage from "./pages/UserPage/index.js";
import 'react-tooltip/dist/react-tooltip.css';

const App = () => {
  const [hashtag, setHashtag] = useState(null);
  return (
    <SessionContextProvider>
      <PublishContextProvider>
        <HashtagContext.Provider value={{ hashtag, setHashtag }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route exact path="/timeline" element={<Timeline />} />
              <Route exact path="/hashtag/:hashtagName" element={<Hashtag />} />
              <Route path="/user/:id?" element={<UserPage />} />
            </Routes>
          </BrowserRouter>
        </HashtagContext.Provider>
      </PublishContextProvider>
    </SessionContextProvider>
  );
};

export default App;
