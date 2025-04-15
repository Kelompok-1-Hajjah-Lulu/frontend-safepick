import React from "react";
import TurnBackOnce from "../../components/TurnBackOnce"; // Adjust the path as needed
import "./CalculationPage.scss";
import BaseCard from "../../components/Cards/BaseCard";
import { Button, Divider } from "antd";

import MataGedeImage from "../../assets/images/mata-gede.png"; // Adjust the path as needed
import DepositoIcon from "../../assets/images/deposito-icon.png"; // Adjust the path as needed
import Badge from "../../components/Badges/Badge";
import RecommendationBadge from "../../components/Badges/RecommendationBadge";

const CalculationPage: React.FC = () => {
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
                    <h1 className="font-24 text-white">Hasil Kalkulasi</h1>
                    <p className="font-18 text-white">
                        Berdasarkan hasil kalkulasi, berikut adalah keuntungan
                        yang akan Anda dapatkan setelah berinvestasi
                    </p>
                </div>
            </section>
            <img
                className="mata-gede-image"
                src={MataGedeImage}
                alt="Mata Gede"
            />
            <section className="calculation-card-wrapper">
                <BaseCard>
                    <div className="rekomendasi-badge-wrapper">
                        <RecommendationBadge />
                    </div>
                    <h1>Tabungan E-Mas</h1>
                    <div className="wrapper-prediksi-container">
                        <img
                            className="card-icon"
                            src={DepositoIcon}
                            alt="Deposito Icon"
                        />
                        <div className="prediksi-container">
                            <div className="upper-container">
                                <div className="flex flex-col">
                                    <p className="font-16">Tenor</p>
                                    <p className="font-18 fw-600">6 Bulan</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-16">Dana Investasi</p>
                                    <p className="font-18 fw-600">
                                        Rp2.000.000
                                    </p>
                                </div>
                            </div>
                            <Divider
                                style={{
                                    marginBlock: "10px",
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                }}
                            />
                            <div className="lower-container">
                                <div className="flex flex-col">
                                    <p className="font-16">Prediksi Return</p>
                                    <p className="font-32 fw-600">
                                        Rp2.000.000
                                    </p>
                                </div>
                                <Badge text="25%" color="green" />
                            </div>
                        </div>
                    </div>
                    <Button
                        type="primary"
                        className="custom-button green"
                        onClick={() => {}}
                    >
                        Lihat Detail
                    </Button>
                </BaseCard>
                <BaseCard>
                    <h1>Deposito</h1>
                    <div className="wrapper-prediksi-container">
                        <img
                            className="card-icon"
                            src={DepositoIcon}
                            alt="Deposito Icon"
                        />
                        <div className="prediksi-container">
                            <div className="upper-container">
                                <div className="flex flex-col">
                                    <p className="font-16">Tenor</p>
                                    <p className="font-18 fw-600">6 Bulan</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-16">Dana Investasi</p>
                                    <p className="font-18 fw-600">
                                        Rp2.000.000
                                    </p>
                                </div>
                            </div>
                            <Divider
                                style={{
                                    marginBlock: "10px",
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                }}
                            />
                            <div className="lower-container">
                                <div className="flex flex-col">
                                    <p className="font-16">Prediksi Return</p>
                                    <p className="font-32 fw-600">
                                        Rp2.000.000
                                    </p>
                                </div>
                                <Badge text="25%" color="green" />
                            </div>
                        </div>
                    </div>
                    <Button
                        type="primary"
                        className="custom-button green"
                        onClick={() => {}}
                    >
                        Lihat Detail
                    </Button>
                </BaseCard>
            </section>
        </>
    );
};

export default CalculationPage;
