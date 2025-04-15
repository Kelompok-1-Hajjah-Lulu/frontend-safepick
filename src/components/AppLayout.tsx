import React from "react";
import Header from "./Header";
import "./AppLayout.scss";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <>
            <div className="app-layout">
                <Header />
                <div className="main-content">{children}</div>
            </div>
        </>
    );
};

export default AppLayout;
