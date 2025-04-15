import React from "react";
import TurnBackOnce from "../../components/TurnBackOnce"; // Adjust the path as needed

const HomePage: React.FC = () => {
    return (
        <section>
            <TurnBackOnce />
            <p className="font-18 text-white">
                Berdasarkan hasil kalkulasi, berikut adalah keuntungan yang akan
                Anda dapatkan setelah berinvestasi
            </p>
        </section>
    );
};

export default HomePage;
