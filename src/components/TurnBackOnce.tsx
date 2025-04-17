import { useNavigate } from "react-router-dom";
import ArrowBack from "../assets/icons/arrow-back.svg";

interface TurnBackOnceProps {
    navigateTo?: string | number;
}
const TurnBackOnce = ({ navigateTo = -1 }: TurnBackOnceProps) => {
    const navigate = useNavigate();
    return (
        <img
            src={ArrowBack}
            alt="ArrowBack"
            onClick={() =>
                typeof navigateTo === "number"
                    ? navigate(navigateTo)
                    : navigate(navigateTo.toString())
            }
            style={{ cursor: "pointer", width: "24px", height: "24px" }}
        />
    );
};

export default TurnBackOnce;
