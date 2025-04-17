import Badge from "../../../components/Badges/Badge";
import { formatNumber } from "../../../utils/formatNumber";

import "./PredictionCard.scss";

interface PredictionCardProps {
    jangkaWaktu: number;
    hargaBuyback: number;
    prediksiReturnRupiah: number;
    prediksiReturnPersen: number;
    tenure: number;
}

const PredictionCard = ({
    hargaBuyback = 0,
    prediksiReturnRupiah,
    prediksiReturnPersen,
    tenure,
}: PredictionCardProps) => {
    return (
        <div className="prediction-card">
            <div className="left-container">
                <div className="flex-flex-col">
                    <p className="font-16 fw-300">Jangka Waktu</p>
                    <p className="font-16 fw-600">{tenure} Bulan</p>
                </div>
                {hargaBuyback !== 0 && (
                    <div className="flex-flex-col">
                        <p className="font-16 fw-300">Harga Buy Back</p>
                        <p className="font-16 fw-600">
                            Rp{formatNumber(hargaBuyback)}
                        </p>
                    </div>
                )}
            </div>
            <div className="divider"></div>
            <div className="right-container">
                <div className="flex-flex-col">
                    <p className="font-16 fw-300">Prediksi Return</p>
                    <p className="font-32 fw-600">
                        Rp{formatNumber(prediksiReturnRupiah!)}
                    </p>
                </div>
                <Badge text={prediksiReturnPersen} color="green" />
            </div>
        </div>
    );
};

export default PredictionCard;
