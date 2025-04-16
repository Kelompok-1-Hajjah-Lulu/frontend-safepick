import { useNavigate } from "react-router-dom";
import ArrowBack from "../assets/icons/arrow-back.svg";

const TurnBackOnce = () => {
    const navigate = useNavigate();
    return (
        <img
            src={ArrowBack}
            alt="ArrowBack"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer", width: "24px", height: "24px" }}
        />
    );
};

export default TurnBackOnce;
