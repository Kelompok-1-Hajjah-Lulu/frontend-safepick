import { Modal, message, Checkbox, CheckboxChangeEvent } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface PredictionFormRequest {
    amount?: number;
    tenor?: number;
}

export interface PredictionResponse {
    deposit_return_rate: number;
    gold_gram: number;
    gold_return_rate: number;
    predicted_buyback: number;
    predicted_gold_price: number;
    profit_deposit: number;
    profit_gold: number;
    recommend: string;
}

const PredictionForm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [goldGram, setGoldGram] = useState<number>(0);
    const [data, setData] = useState<PredictionFormRequest>();
    const [loading, setLoading] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate();

    const handlePredictClick = async () => {
        if (!data?.amount || !data?.tenor) {
            messageApi.warning("Please fill in all fields before submitting.");
            return;
        }
        if (data.amount < 2000000) {
            messageApi.warning(
                "Please enter an investment amount greater than Rp2.000.000.",
            );
            return;
        }
        if (data.amount > 1000000000) {
            messageApi.warning(
                "Please enter an investment amount lower than Rp1.000.000.000.",
            );
            return;
        }

        const dontShow =
            localStorage.getItem("dontShowPredictionModal") === "true";
        if (dontShow) {
            await submitPrediction();
        } else {
            setIsModalVisible(true);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const submitPrediction = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "http://192.168.23.171:8008/predict",
                {
                    amount: data?.amount,
                    tenor: data?.tenor,
                },
            );
            console.log("Prediction result:", response.data);

            navigate("/calculation", {
                state: {
                    prediction: response?.data as PredictionResponse,
                    investment: data?.amount,
                    tenure: data?.tenor,
                },
            });
            message.success("Prediction submitted successfully!");
        } catch (error) {
            console.error("Error submitting prediction:", error);
            message.warning("Failed to submit prediction. Please try again.");
        } finally {
            setLoading(false);
            setIsModalVisible(false);
        }
    };

    const handleSubmit = async () => {
        if (dontShowAgain) {
            localStorage.setItem("dontShowPredictionModal", "true");
        }
        await submitPrediction();
    };

    const calculateGoldGrams = (investment: number) => {
        if (investment === 0) {
            return 0;
        }
        const goldPricePerGram = 1877000;
        return parseFloat((investment / goldPricePerGram).toFixed(2));
    };

    const handleInvestmentChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const investment = parseInt(event.target.value);
        setGoldGram(calculateGoldGrams(investment));
        setData({
            ...data,
            amount: investment,
        });
    };

    const handleTenorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tenor = parseInt(event.target.value);
        setData({
            ...data,
            tenor: tenor,
        });
    };

    const handleDontShowAgain = (e: CheckboxChangeEvent) => {
        const isChecked = e.target.checked;
        setDontShowAgain(isChecked);
    };

    useEffect(() => {
        const dontShow =
            localStorage.getItem("dontShowPredictionModal") === "true";
        setDontShowAgain(dontShow);
        if (dontShow) {
            setIsModalVisible(false);
        }
    }, []);

    return (
        <>
            {contextHolder}
            <div className="input-wrapper-section">
                <div className="input-row">
                    <div
                        className="input-wrapper"
                        style={{ position: "relative" }}
                    >
                        <div className="label-wrapper">
                            <label>Nominal Investasi</label>
                            {goldGram !== 0 && !Number.isNaN(goldGram) && (
                                <p className="font-14 fw-300">
                                    Setara dengan{" "}
                                    <span className="fw-600">
                                        {goldGram} Gram
                                    </span>{" "}
                                    emas
                                </p>
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Input nominal yang ingin diinvestasikan"
                            onChange={(event) => {
                                const rawValue = event.target.value.replace(
                                    /\D/g,
                                    "",
                                );
                                const formattedValue = `Rp ${new Intl.NumberFormat(
                                    "id-ID",
                                ).format(parseInt(rawValue || "0"))}`;
                                event.target.value = formattedValue;
                                handleInvestmentChange({
                                    ...event,
                                    target: {
                                        ...event.target,
                                        value: rawValue,
                                    },
                                });
                            }}
                        />
                        <p className="font-14" style={{ color: "black" }}>
                            Nominal investasi harus lebih dari{" "}
                            <span className="fw-600">Rp2.000.000</span> dan
                            kurang dari{" "}
                            <span className="fw-600">Rp1.000.000.000</span>
                        </p>
                    </div>
                    <div className="input-wrapper" style={{ height: "45px" }}>
                        <label>Jangka Waktu</label>
                        <select onChange={handleTenorChange}>
                            <option>Pilih Jangka Waktu</option>
                            <option value="1">1 Bulan</option>
                            <option value="3">3 Bulan</option>
                            <option value="6">6 Bulan</option>
                            <option value="12">12 Bulan</option>
                        </select>
                    </div>
                </div>

                <button className="btn-predict" onClick={handlePredictClick}>
                    Prediksi Keuntungan
                </button>
            </div>

            <Modal
                title="⚠️ Perhatian"
                open={isModalVisible}
                onCancel={handleModalClose}
                onOk={handleSubmit}
                okText="Lanjut"
                okButtonProps={{ loading: loading }}
                cancelButtonProps={{ style: { display: "none" } }}
                className="ant-modal-custom"
            >
                <div className="modal-body-wrapper">
                    <p>
                        Rekomendasi dari{" "}
                        <span className="highlight-orange">SAFEPICK</span>{" "}
                        bersifat <strong>prediksi</strong> dan tidak menjamin
                        hasil pasti.
                    </p>
                    <p>
                        Keputusan dan <strong> risiko </strong> investasi
                        sepenuhnya menjadi{" "}
                        <strong>tanggung jawab pengguna</strong>.
                    </p>
                    <Checkbox
                        checked={dontShowAgain}
                        onChange={handleDontShowAgain}
                    >
                        Jangan tampilkan lagi
                    </Checkbox>
                </div>
            </Modal>
        </>
    );
};

export default PredictionForm;
