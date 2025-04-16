import WarningCircleIcon from "../../assets/icons/warning-circle.svg";
import "./WarningCard.scss";

const WarningCard = () => {
    return (
        <div className="warning-card">
            <img src={WarningCircleIcon} alt="WarningCircleIcon" />
            <div className="flex flex-col">
                <h1 className="font-24 fw-600">Perhatian</h1>
                <p className="font-16 fw-400">
                    Rekomendasi dari{" "}
                    <span className="gold fw-800">SAFEPICK</span> bersifat{" "}
                    <span className="fw-600">prediksi</span> dan tidak menjamin
                    hasil pasti. Keputusan dan{" "}
                    <span className="fw-600">risiko</span>
                    investasi sepenuhnya{" "}
                    <span className="fw-600">
                        menjadi tanggung jawab pengguna.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default WarningCard;
