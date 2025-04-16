import Badge from "../../../components/Badges/Badge";

import "./PredictionCard.scss";

interface PredictionCardProps {
    jangkaWaktu?: string;
    hargaBuyback?: string;
    prediksiReturnRupiah?: string;
    prediksiReturnPersen?: string;
}

const PredictionCard = ({}: // jangkaWaktu,
// hargaBuyback,
// prediksiReturnRupiah,
// prediksiReturnPersen,
PredictionCardProps) => {
    return (
        <div className="prediction-card">
            <div className="left-container">
                <div className="flex-flex-col">
                    <p className="font-16 fw-300">Jangka Waktu</p>
                    <p className="font-16 fw-600">12 Bulan</p>
                </div>
                <div className="flex-flex-col">
                    <p className="font-16 fw-300">Harga Buy Back</p>
                    <p className="font-16 fw-600">Rp2.000.000</p>
                </div>
            </div>
            <div className="divider"></div>
            <div className="right-container">
                <div className="flex-flex-col">
                    <p className="font-16 fw-300">Prediksi Return</p>
                    <p className="font-32 fw-600">Rp2.000.000</p>
                </div>
                <Badge text="25%" color="green" />
            </div>
        </div>
    );
};

export default PredictionCard;
