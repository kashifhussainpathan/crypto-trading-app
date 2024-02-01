import { Route, Routes } from "react-router-dom";
import Trade from "./pages/trade";
import Profile from "./pages/profile";

function App() {
  return (
    <main className="w-full text-gray-700">
      <Routes>
        <Route path="/" element={<Trade />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </main>
  );
}

export default App;
