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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, message, Skeleton, Spin } from "antd";
import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { formatNumber } from "../../utils/formatNumber";
import ModalFormPengajuan from "../../components/Modals/ModalFormPengajuan";

interface ProductDetails {
    title: string;
    icon: string;
    description: string;
    navigateTo: string;
    navigationTitle: string;
}

// response
interface PredictionData {
    gold_gram: number;
    tenure_1: TenureDetails;
    tenure_3: TenureDetails;
    tenure_6: TenureDetails;
    tenure_12: TenureDetails;
}

interface TenureDetails {
    deposit_return_rate: number;
    gold_return_rate: number;
    predicted_buyback: number;
    predicted_gold_price: number;
    profit_deposit: number;
    profit_gold: number;
    tenure: number;
}

const productMapping: Record<string, ProductDetails> = {
    gold: {
        title: "Tabungan E-Mas",
        icon: GoldIcon,
        description:
            "Berikut adalah keuntungan yang akan Anda dapatkan dengan investasi melalui Tabungan E-Mas",
        navigateTo: "/calculation/deposito",
        navigationTitle: "Deposito",
    },
    deposito: {
        title: "Deposito",
        icon: DepositoIcon,
        description:
            "Berikut adalah keuntungan yang akan Anda dapatkan dengan investasi melalui Deposito",
        navigateTo: "/calculation/gold",
        navigationTitle: "Tabungan E-Mas",
    },
};

const DetailPage: React.FC = () => {
    const { productParam } = useParams<{ productParam: string }>();

    const [product, setProduct] = useState("");
    const [isGold, setIsGold] = useState(false);
    const navigate = useNavigate();

    const [data, setData] = useState<PredictionData>();
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const investmentAmount = location.state.investmentAmount;
    const tenureAmount = location.state.tenure;
    const recommend = location.state.recommend;

    const [isModalFormPengajuanOpen, setIsModalFormPengajuanOpen] =
        useState(false);

    const showModal = () => {
        setIsModalFormPengajuanOpen(true);
    };

    const getPredictionByTenure = (tenure: number) => {
        if (!data) return null;

        switch (tenure) {
            case 1:
                return data.tenure_1 as TenureDetails;
            case 3:
                return data.tenure_3 as TenureDetails;
            case 6:
                return data.tenure_6 as TenureDetails;
            case 12:
                return data.tenure_12 as TenureDetails;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (productParam === "gold" || productParam === "deposito") {
            setProduct(productParam);
            setIsGold(productParam === "gold");
        } else {
            navigate("/404");
        }
    }, [productParam, navigate]);

    useEffect(() => {
        const fetchPredictionData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    "http://192.168.23.171:8080/predicts-all",
                    {
                        amount: investmentAmount,
                    },
                );
                setData(response.data as PredictionData);
                console.log(response.data);
                message.success("Prediction submitted successfully!");
            } catch (error) {
                console.error("Error submitting prediction:", error);
                message.warning(
                    "Failed to submit prediction. Please try again.",
                );
            } finally {
                setLoading(false);
            }
        };
        fetchPredictionData();
    }, [investmentAmount]);

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
                    <p className="font-24 text-white">
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
                    {loading ? (
                        <div
                            className="flex flex-col"
                            style={{
                                width: "100%",
                                display: "flex",
                                gap: "20px",
                                alignItems: "center",
                            }}
                        >
                            <Spin
                                indicator={<LoadingOutlined spin />}
                                size="large"
                            />
                            <p className="font-24 fw-400">predicting prices</p>
                        </div>
                    ) : (
                        <>
                            <div
                                className="flex flex-col"
                                style={
                                    !isGold
                                        ? {
                                              margin: "auto",
                                              textAlign: "center",
                                          }
                                        : {}
                                }
                            >
                                <p className="font-24 fw-600">
                                    Nominal Investasi
                                </p>
                                <p className="font-24 fw-400">
                                    Rp{formatNumber(parseInt(investmentAmount))}
                                </p>
                            </div>
                            {isGold && (
                                <>
                                    <div className="font-16">setara dengan</div>
                                    <div className="flex flex-col">
                                        <p className="font-24 fw-600">
                                            Gram Emas
                                        </p>
                                        <p className="font-24 fw-400">
                                            {data?.gold_gram} gram
                                        </p>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
                <BaseCard
                    isRecommendation={
                        recommend ===
                        (productParam === "deposito" ? "deposit" : productParam)
                    }
                    style={{ maxWidth: "1200px", margin: "auto" }}
                >
                    {loading ? (
                        <Skeleton active />
                    ) : (
                        <>
                            <div className="detail-container">
                                <img
                                    className="card-icon"
                                    src={isGold ? GoldIcon : DepositoIcon}
                                    alt="Gold Icon"
                                />
                                <div className="inner-container">
                                    <h1>{productMapping[product]?.title}</h1>
                                    <div className="left-container">
                                        <div className="flex flex-col">
                                            <p className="font-24 fw-300">
                                                Jangka Waktu
                                            </p>
                                            <p className="font-24 fw-600">
                                                {tenureAmount} Bulan
                                            </p>
                                        </div>
                                        {isGold && (
                                            <div className="flex flex-col">
                                                <p className="font-24 fw-300">
                                                    Harga Buy Back
                                                </p>
                                                <p className="font-24 fw-600">
                                                    Rp
                                                    {formatNumber(
                                                        getPredictionByTenure(
                                                            tenureAmount,
                                                        )?.predicted_buyback ||
                                                            0,
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="divider"></div>
                                    <div className="right-container">
                                        <div className="flex-flex-col">
                                            <p className="font-24 fw-300">
                                                Prediksi Return
                                            </p>
                                            <p className="font-48 fw-600">
                                                Rp
                                                {formatNumber(
                                                    isGold
                                                        ? getPredictionByTenure(
                                                              tenureAmount,
                                                          )?.profit_gold || 0
                                                        : getPredictionByTenure(
                                                              tenureAmount,
                                                          )?.profit_deposit ||
                                                              0,
                                                )}
                                            </p>
                                        </div>
                                        <Badge
                                            text={
                                                isGold
                                                    ? getPredictionByTenure(
                                                          tenureAmount,
                                                      )?.gold_return_rate
                                                    : getPredictionByTenure(
                                                          tenureAmount,
                                                      )?.deposit_return_rate
                                            }
                                            color="green"
                                        />
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </>
                    )}
                </BaseCard>
                <p className="fw-600 font-20">Coba pilihan lain</p>
                <section className="return-prediction">
                    {handlePredictionCard(tenureAmount, data!, isGold)}
                </section>
            </section>

            <section className="calculation-warning-recommendation">
                <div style={{ width: "100%" }}>
                    <WarningCard />
                </div>
                <div className="button-wrapper-calculation">
                    <Button className="custom-button green" onClick={showModal}>
                        Ajukan Sekarang
                    </Button>
                    <a
                        href={productMapping[product]?.navigateTo}
                        style={{ width: "100%" }}
                    >
                        <Button
                            className="custom-button green outlined"
                            onClick={() => {
                                navigate(
                                    productParam === "deposito"
                                        ? "/calculation/gold"
                                        : "/calculation/deposito",
                                    {
                                        state: {
                                            investmentAmount: investmentAmount,
                                            tenure: tenureAmount,
                                            recommend: recommend,
                                        },
                                        replace: true,
                                    },
                                );
                            }}
                        >
                            Lihat {productMapping[product]?.navigationTitle}{" "}
                            <ArrowRightOutlined />
                        </Button>
                    </a>
                </div>
            </section>
            <ModalFormPengajuan
                isModalOpen={isModalFormPengajuanOpen}
                setIsModalOpen={setIsModalFormPengajuanOpen}
            />
        </>
    );
};

export default DetailPage;

const handlePredictionCard = (
    tenureAmount: number,
    data: PredictionData,
    isGold: boolean,
) => {
    const filteredTenures = Object.entries(data || {})
        .filter(
            ([key, value]) =>
                key.startsWith("tenure_") && value.tenure !== tenureAmount,
        )
        .map(([_, value]) => value as TenureDetails)
        .sort((a, b) =>
            isGold
                ? b.profit_gold - a.profit_gold
                : b.profit_deposit - a.profit_deposit,
        );

    return (
        <>
            {filteredTenures.map((data, index) => (
                <PredictionCard
                    key={index}
                    hargaBuyback={isGold ? data.predicted_buyback : 0}
                    prediksiReturnPersen={
                        isGold
                            ? data.gold_return_rate
                            : data.deposit_return_rate
                    }
                    prediksiReturnRupiah={
                        isGold ? data.profit_gold : data.profit_deposit
                    }
                    tenure={data.tenure}
                    jangkaWaktu={0}
                />
            ))}
        </>
    );
};
