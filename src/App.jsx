import { SessionContextProvider } from "./hooks/SessionContext";
import { PublishContextProvider } from "./hooks/PublishContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModalContextProvider } from "./hooks/ModalContext";
import HashtagContext from "./hooks/HashtagContext";
import UserPage from "./pages/UserPage/index";
import Timeline from "./pages/Timeline/index";
import Hashtag from "./pages/Hashtag/index";
import SignUp from "./pages/SignUp/index";
import SignIn from "./pages/SignIn/index";
import { useState } from "react";

const App = () => {
  const [hashtag, setHashtag] = useState(null);
  return (
    <SessionContextProvider>
      <PublishContextProvider>
        <ModalContextProvider>
          <HashtagContext.Provider value={{ hashtag, setHashtag }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route exact path="/timeline" element={<Timeline />} />
                <Route
                  exact
                  path="/hashtag/:hashtagName"
                  element={<Hashtag />}
                />
                <Route path="/user/:id?" element={<UserPage />} />
              </Routes>
            </BrowserRouter>
          </HashtagContext.Provider>
        </ModalContextProvider>
      </PublishContextProvider>
    </SessionContextProvider>
  );
};

export default App;
