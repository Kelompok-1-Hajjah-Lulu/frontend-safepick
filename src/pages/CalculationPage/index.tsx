import React, { useState } from "react";
import TurnBackOnce from "../../components/TurnBackOnce";
import "./CalculationPage.scss";
import BaseCard from "../../components/Cards/BaseCard";
import { Button } from "antd";

import BusinessMonitoringImage from "../../assets/images/business-monitoring.png";
import DepositoIcon from "../../assets/images/deposito-icon.png";
import GoldIcon from "../../assets/images/gold-icon.svg";
import BagIcon from "../../assets/icons/bag-icon.svg";
import TimeIcon from "../../assets/icons/time-icon.svg";
import Badge from "../../components/Badges/Badge";
import WarningCard from "../../components/Cards/WarningCard";
import { useLocation } from "react-router-dom";
import { PredictionResponse } from "../HomePage/components/PredictionForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils/formatNumber";
import ModalFormPengajuan from "../../components/Modals/ModalFormPengajuan";

const CalculationPage: React.FC = () => {
    const location = useLocation();
    const predictionData: PredictionResponse | null = location.state
        ?.prediction as PredictionResponse | null;

    const investmentAmount = location.state?.investment;
    const tenureAmount = location.state?.tenure;

    const [modalFormPengajuan, setModalFormPengajuan] = useState(false);
    const [clickedValue, setClickedValue] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setClickedValue("");
    }, [modalFormPengajuan]);

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
                className="mata-gede-image desktop-only"
                src={BusinessMonitoringImage}
                alt="Mata Gede"
            />
            <section>
                <div className="calculation-header-tenure">
                    <div className="askd">
                        <img src={BagIcon} alt="Bag Icon" />
                        <div className="flex flex-col">
                            <p className="font-22 fw-600">Nominal Investasi</p>
                            <p className="font-22">
                                Rp{formatNumber(investmentAmount ?? 0)}
                            </p>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="askd">
                        <img src={TimeIcon} alt="Time Icon" />
                        <div className="flex flex-col">
                            <p className="font-22 fw-600">Jangka Waktu</p>
                            <p className="font-22">{tenureAmount} Bulan</p>
                        </div>
                    </div>
                </div>
            </section>
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
                                        Rp{" "}
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
                                className="custom-button green"
                                onClick={() => {
                                    setModalFormPengajuan(true);
                                    setClickedValue("gold");
                                }}
                            >
                                Ajukan Sekarang
                            </Button>
                            <Button
                                type="primary"
                                className="custom-button green outlined"
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
                                className="custom-button green"
                                onClick={() => {
                                    setModalFormPengajuan(true);
                                    setClickedValue("deposito");
                                }}
                            >
                                Ajukan Sekarang
                            </Button>
                            <Button
                                type="primary"
                                className="custom-button green outlined"
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
            <pre>{clickedValue}</pre>
            <ModalFormPengajuan
                isModalOpen={modalFormPengajuan}
                setIsModalOpen={setModalFormPengajuan}
                isGold={clickedValue === "gold"}
                investmentAmount={investmentAmount}
                tenureAmount={tenureAmount}
            />
        </>
    );
};

export default CalculationPage;
