import SignIn from "./components/signIn/SignIn";
import { Routes, Route } from "react-router-dom";
import { SigUp } from "./components/signUp/SigUp";
import Home from "./components/home/Home";
import Nav from "./components/navBar/Nav";
import CreateCard from "./components/createCard/CreateCard";
import CreateChannel from "./components/channel/CreateChannel";
import Footer from "./components/footer/Footer";
import ViewScreen from "./components/viewScreen/ViewScreen";
import ViewChannelDetial from "./components/channel/ViewChannelDetial";
import NoAuthPage from "./components/NoAuth/noAuthPage";
import { isLoggedIn } from "./components/input/Auth";
import AnimCursor from "./components/channel/AnimCursor";
import Activated from "./components/activated/Activated";
import ResendMail from "./components/resendMail/ResendMail";

const App = () => {
  return (
    <main className={`bg-Wallpaper3 text-white font-Roboto`}>
      <AnimCursor />
      <Nav />
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Activated" element={<Activated />} />
        <Route path="/SignUp" element={<SigUp />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/AddVideo"
          element={isLoggedIn.value ? <CreateCard /> : <NoAuthPage />}
        />
        <Route
          path="/createChannel"
          element={isLoggedIn.value ? <CreateChannel /> : <NoAuthPage />}
        />
        <Route
          path="/channel"
          element={isLoggedIn.value ? <ViewChannelDetial /> : <NoAuthPage />}
        />
        <Route path="/:id" element={<ViewScreen />} />
        <Route path="/noauth" element={<NoAuthPage />} />
        <Route path="/resendMail" element={<ResendMail />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
