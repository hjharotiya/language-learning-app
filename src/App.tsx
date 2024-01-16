import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import { Suspense, lazy } from "react";
import Loading from "./Components/Loading";
import Learning from "./Components/Learning";

const Login = lazy(() => import("./Components/Login"));
const Result = lazy(() => import("./Components/Result"));
const Quiz = lazy(() => import("./Components/Quiz"));
const Learn = lazy(() => import("./Components/Learning"));
const Home = lazy(() => import("./Components/Home"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
