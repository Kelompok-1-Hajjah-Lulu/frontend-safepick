import { Modal } from "antd";
import { useState } from "react";

const PredictionForm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handlePredictClick = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <div className="label-row">
                <label>Nominal Investasi</label>
                <label>Tenor</label>
            </div>

            <div className="input-row">
                <div
                    className="input-wrapper"
                    style={{ position: "relative", display: "flex", flex: 1 }}
                >
                    <p
                        className="font-14 fw-300"
                        style={{
                            marginTop: "-10px",
                            marginBottom: "20px",
                            position: "absolute",
                            top: "-15px",
                            right: "0",
                            color: "white",
                        }}
                    >
                        Setara dengan <span className="fw-600">1.5 Gram</span>{" "}
                        emas
                    </p>
                    <input
                        type="text"
                        placeholder="Input nominal yang ingin diinvestasikan"
                    />
                </div>
                <select>
                    <option>Pilih Jangka Waktu</option>
                    <option value="1">1 Bulan</option>
                    <option value="3">3 Bulan</option>
                    <option value="6">6 Bulan</option>
                    <option value="12">12 Bulan</option>
                </select>
            </div>

            <button className="btn-predict" onClick={handlePredictClick}>
                Prediksi Keuntungan
            </button>

            <Modal
                title="⚠️ Perhatian"
                open={isModalVisible}
                onCancel={handleModalClose}
                onOk={handleModalClose}
                okText="Lanjut"
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <p>
                    Rekomendasi dari <strong>SAFEPICK</strong> bersifat{" "}
                    <strong>prediksi</strong> dan tidak menjamin hasil pasti.
                </p>
                <p>
                    Keputusan dan <strong>risiko</strong> investasi sepenuhnya
                    menjadi <strong>tanggung jawab pengguna</strong>.
                </p>
            </Modal>
        </>
    );
};

export default PredictionForm;
