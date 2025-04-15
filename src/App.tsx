import { Routes, Route } from "react-router-dom";
import "./styles/Global.scss";

import HomePage from "./pages/HomePage";
import AppLayout from "./components/AppLayout";

function App() {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </AppLayout>
    );
}

export default App;
