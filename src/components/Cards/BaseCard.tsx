import "./BaseCard.scss";

interface BaseCardProps {
    children?: React.ReactNode;
    isRecommendation?: boolean;
}

const BaseCard = ({ children, isRecommendation }: BaseCardProps) => {
    return (
        <div className={`base-card ${isRecommendation && "isRecommendation"}`}>
            {children}
        </div>
    );
};

export default BaseCard;
