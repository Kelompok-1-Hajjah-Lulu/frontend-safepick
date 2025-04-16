import RecommendationBadge from "../Badges/RecommendationBadge";
import "./BaseCard.scss";

interface BaseCardProps {
    children?: React.ReactNode;
    isRecommendation?: boolean;
}

const BaseCard = ({ children, isRecommendation }: BaseCardProps) => {
    return (
        <div className={`base-card ${isRecommendation && "isRecommendation"}`}>
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
