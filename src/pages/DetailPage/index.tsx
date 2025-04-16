import React from "react";
import TurnBackOnce from "../../components/TurnBackOnce";
import "./DetailPage.scss";

import MataGedeImage from "../../assets/images/mata-gede.png";
import WarningCard from "../../components/Cards/WarningCard";
import BaseCard from "../../components/Cards/BaseCard";

import GoldIcon from "../../assets/images/gold-icon.svg";
import Badge from "../../components/Badges/Badge";
import PredictionCard from "./components/PredictionCard";

const DetailPage: React.FC = () => {
    return (
        <>
            <section className="header-calculation-page">
                <TurnBackOnce />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-3px",
                    }}
                >
                    <h1 className="font-24 text-white">Tabungan E-Mas</h1>
                    <p className="font-18 text-white">
                        Berdasarkan kalkulasi kami, berikut adalah keuntungan
                        yang akan Anda dapatkan jika berinvestasi melalui
                        Tabungan E-Mas
                    </p>
                </div>
            </section>
            <img
                className="mata-gede-image"
                src={MataGedeImage}
                alt="Mata Gede"
            />

            <section className="detail-wrapper">
                <BaseCard isRecommendation>
                    <h1>Tabungan E-Mas</h1>
                    <div className="detail-container">
                        <img
                            className="card-icon"
                            src={GoldIcon}
                            alt="Gold Icon"
                        />
                        <div className="detail-content">
                            <div className="inner-container">
                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <p className="font-16">
                                            Prediksi Return
                                        </p>
                                        <p className="font-32 fw-600">
                                            Rp2.000.000
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-16">
                                            Prediksi Return
                                        </p>
                                        <p className="font-32 fw-600">
                                            Rp2.000.000
                                        </p>
                                    </div>
                                </div>
                                <Badge text="25%" color="green" />
                            </div>
                        </div>
                    </div>
                </BaseCard>
                <p className="fw-600 font-20">Coba pilihan lain</p>
                <section className="return-prediction">
                    <PredictionCard />
                    <PredictionCard />
                    <PredictionCard />
                </section>
            </section>

            <section className="calculation-warning-recommendation">
                <WarningCard />
            </section>
        </>
    );
};

export default DetailPage;
