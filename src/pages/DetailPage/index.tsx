import React, { useEffect, useState } from "react";
import TurnBackOnce from "../../components/TurnBackOnce";
import "./DetailPage.scss";

import MataGedeImage from "../../assets/images/mata-gede.png";
import WarningCard from "../../components/Cards/WarningCard";
import BaseCard from "../../components/Cards/BaseCard";

import GoldIcon from "../../assets/images/gold-icon.svg";
import DepositoIcon from "../../assets/images/deposito-icon.png";
import Badge from "../../components/Badges/Badge";
import PredictionCard from "./components/PredictionCard";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
interface ProductDetails {
    title: string;
    icon: string;
    description: string;
    navigateTo: string;
    navigationTitle: string;
}

const productMapping: Record<string, ProductDetails> = {
    gold: {
        title: "Tabungan E-Mas",
        icon: GoldIcon,
        description:
            "Berdasarkan kalkulasi kami, berikut adalah keuntungan yang akan Anda dapatkan jika berinvestasi melalui Tabungan E-Mas",
        navigateTo: "/calculation/deposito",
        navigationTitle: "Deposito",
    },
    deposito: {
        title: "Deposito",
        icon: DepositoIcon,
        description:
            "Berdasarkan kalkulasi kami, berikut adalah keuntungan yang akan Anda dapatkan jika berinvestasi melalui Deposito",
        navigateTo: "/calculation/gold",
        navigationTitle: "Tabungan E-Mas",
    },
};

const DetailPage: React.FC = () => {
    const { productParam } = useParams<{ productParam: string }>();

    const [product, setProduct] = useState("");
    const [isGold, setIsGold] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (productParam === "gold" || productParam === "deposito") {
            setProduct(productParam);
            if (productParam === "gold") {
                setIsGold(true);
            }
        } else {
            navigate("/404");
        }
    }, [productParam, navigate]);

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
                    <h1 className="font-24 text-white">
                        {productMapping[product]?.title}
                    </h1>
                    <p className="font-18 text-white">
                        {productMapping[product]?.description}
                    </p>
                </div>
            </section>
            <img
                className="mata-gede-image"
                src={MataGedeImage}
                alt="Mata Gede"
            />

            <section className="detail-wrapper">
                <div className="header-converter">
                    <div
                        className="flex flex-col"
                        style={
                            !isGold
                                ? { margin: "auto", textAlign: "center" }
                                : {}
                        }
                    >
                        <p className="font-24 fw-600">Nominal Investasi</p>
                        <p className="font-24 fw-400">Rp2.000.000</p>
                    </div>
                    {isGold && (
                        <>
                            <div className="font-16">setara dengan</div>
                            <div className="flex flex-col">
                                <p className="font-24 fw-600">Gram Emas</p>
                                <p className="font-24 fw-400">1.5 gram</p>
                            </div>
                        </>
                    )}
                </div>
                <BaseCard isRecommendation>
                    <h1>{productMapping[product]?.title}</h1>
                    <div className="detail-container">
                        <img
                            className="card-icon"
                            src={isGold ? GoldIcon : DepositoIcon}
                            alt="Gold Icon"
                        />
                        <div className="inner-container">
                            <div className="left-container">
                                <div className="flex-flex-col">
                                    <p className="font-16 fw-300">
                                        Jangka Waktu
                                    </p>
                                    <p className="font-16 fw-600">12 Bulan</p>
                                </div>
                                {isGold && (
                                    <div className="flex-flex-col">
                                        <p className="font-16 fw-300">
                                            Harga Buy Back
                                        </p>
                                        <p className="font-16 fw-600">
                                            Rp2.000.000
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="divider"></div>
                            <div className="right-container">
                                <div className="flex-flex-col">
                                    <p className="font-16 fw-300">
                                        Prediksi Return
                                    </p>
                                    <p className="font-32 fw-600">
                                        Rp2.000.000
                                    </p>
                                </div>
                                <Badge text="25%" color="green" />
                            </div>
                        </div>
                        <div></div>
                    </div>
                </BaseCard>
                <p className="fw-600 font-20">Coba pilihan lain</p>
                <section className="return-prediction">
                    <PredictionCard />
                    <PredictionCard />
                    <PredictionCard />
                </section>
            </section>
            <section>
                <a href={productMapping[product]?.navigateTo}>
                    <Button type="primary" className="custom-button green">
                        Lihat Detail {productMapping[product]?.navigationTitle}{" "}
                        <ArrowRightOutlined />
                    </Button>
                </a>
            </section>

            <section className="calculation-warning-recommendation">
                <WarningCard />
            </section>
        </>
    );
};

export default DetailPage;
