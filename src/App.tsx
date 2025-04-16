import { Routes, Route } from "react-router-dom";
import "./styles/Global.scss";

import HomePage from "./pages/HomePage";
import AppLayout from "./components/AppLayout";
import CalculationPage from "./pages/CalculationPage";
import DetailPage from "./pages/DetailPage";

function App() {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/calculation" element={<CalculationPage />} />
                <Route path="/calculation/:id" element={<DetailPage />} />
            </Routes>
        </AppLayout>
    );
}

export default App;
