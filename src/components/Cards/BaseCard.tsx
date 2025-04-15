import "./BaseCard.scss";

interface BaseCardProps {
    children?: React.ReactNode;
}

const BaseCard = ({ children }: BaseCardProps) => {
    return <div className="base-card">{children}</div>;
};

export default BaseCard;
