import React from "react";
import TurnBackOnce from "../../components/TurnBackOnce";
import "./CalculationPage.scss";
import BaseCard from "../../components/Cards/BaseCard";
import { Button } from "antd";

import BusinessMonitoringImage from "../../assets/images/business-monitoring.png";
import DepositoIcon from "../../assets/images/deposito-icon.png";
import GoldIcon from "../../assets/images/gold-icon.svg";
import Badge from "../../components/Badges/Badge";
import WarningCard from "../../components/Cards/WarningCard";
import { useLocation } from "react-router-dom";
import { PredictionResponse } from "../HomePage/components/PredictionForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils/formatNumber";

const CalculationPage: React.FC = () => {
    const location = useLocation();
    const predictionData: PredictionResponse | null = location.state
        ?.prediction as PredictionResponse | null;

    const investmentAmount = location.state?.investment;
    const tenureAmount = location.state?.tenure;

    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state || !predictionData) {
            navigate("/");
        }
    }, [location.state, predictionData, navigate]);
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
                src={BusinessMonitoringImage}
                alt="Mata Gede"
            />
            {/* <section className="input-section">
                <PredictionForm />
            </section> */}
            <section className="calculation-card-wrapper">
                <BaseCard
                    isRecommendation={predictionData?.recommend === "gold"}
                >
                    <div className="wrapper-prediksi-container">
                        <img
                            className="card-icon"
                            src={GoldIcon}
                            alt="Gold Icon"
                        />
                        <div className="prediksi-container">
                            <h1>Tabungan E-Mas</h1>
                            <div className="inner-container">
                                <div className="flex flex-col">
                                    <p className="font-16">Prediksi Return</p>
                                    <p className="font-32 fw-600">
                                        Rp
                                        {formatNumber(
                                            predictionData?.profit_gold ?? 0,
                                        )}
                                    </p>
                                </div>
                                <Badge
                                    text={predictionData?.gold_return_rate}
                                    color="green"
                                />
                            </div>
                            <Button
                                type="primary"
                                className="custom-button green"
                                onClick={() => {
                                    navigate("/calculation/gold", {
                                        state: {
                                            investmentAmount: investmentAmount,
                                            tenure: tenureAmount,
                                            recommend:
                                                predictionData?.recommend,
                                        },
                                    });
                                }}
                            >
                                Lihat Detail
                            </Button>
                        </div>
                    </div>
                </BaseCard>
                <BaseCard
                    isRecommendation={predictionData?.recommend === "deposit"}
                >
                    <div className="wrapper-prediksi-container">
                        <img
                            className="card-icon"
                            src={DepositoIcon}
                            alt="Deposito Icon"
                        />
                        <div className="prediksi-container">
                            <h1>Deposito</h1>
                            <div className="inner-container">
                                <div className="flex flex-col">
                                    <p className="font-16">Prediksi Return</p>
                                    <p className="font-32 fw-600">
                                        Rp{" "}
                                        {formatNumber(
                                            predictionData?.profit_deposit ?? 0,
                                        )}
                                    </p>
                                </div>
                                <Badge
                                    text={predictionData?.deposit_return_rate}
                                    color="green"
                                />
                            </div>
                            <Button
                                type="primary"
                                className="custom-button green"
                                onClick={() => {
                                    navigate("/calculation/deposito", {
                                        state: {
                                            investmentAmount: investmentAmount,
                                            tenure: tenureAmount,
                                            recommend:
                                                predictionData?.recommend,
                                        },
                                    });
                                }}
                            >
                                Lihat Detail
                            </Button>
                        </div>
                    </div>
                </BaseCard>
            </section>
            <section className="calculation-warning-recommendation">
                <WarningCard />
            </section>
        </>
    );
};

export default CalculationPage;
