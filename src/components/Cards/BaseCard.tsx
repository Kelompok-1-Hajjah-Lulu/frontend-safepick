import RecommendationBadge from "../Badges/RecommendationBadge";
import "./BaseCard.scss";

interface BaseCardProps {
    children?: React.ReactNode;
    isRecommendation?: boolean;
    style?: React.CSSProperties;
}

const BaseCard = ({ children, isRecommendation, style }: BaseCardProps) => {
    return (
        <div
            className={`base-card ${isRecommendation && "isRecommendation"}`}
            style={style}
        >
            {isRecommendation && (
                <div className="rekomendasi-badge-wrapper">
                    <RecommendationBadge />
                </div>
            )}
            {children}
        </div>
    );
};

export default BaseCard;
