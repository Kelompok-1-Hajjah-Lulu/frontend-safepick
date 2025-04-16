import { Routes, Route } from "react-router-dom";
import "./styles/Global.scss";

import HomePage from "./pages/HomePage";
import AppLayout from "./components/AppLayout";
import CalculationPage from "./pages/CalculationPage";

function App() {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/calculation" element={<CalculationPage />} />
            </Routes>
        </AppLayout>
    );
}

export default App;
