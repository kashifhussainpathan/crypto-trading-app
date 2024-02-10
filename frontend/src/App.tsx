import { Route, Routes } from "react-router-dom";
import Trade from "./pages/trade";
import Profile from "./pages/profile";
import Navbar from "./components/navbar";
import useGetCoinsPrice from "./hooks/useGetCoinsPrice";

function App() {
  useGetCoinsPrice();

  return (
    <main className="w-full text-gray-700">
      <Navbar />
      <Routes>
        <Route path="/" element={<Trade />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </main>
  );
}

export default App;
