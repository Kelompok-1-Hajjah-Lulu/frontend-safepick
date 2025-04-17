import PlusIcon from "../../assets/icons/plus-icon.svg";

import "./Badge.scss";

interface BadgeProps {
    text: number;
    color: string;
}

const Badge = ({ text, color }: BadgeProps) => {
    return (
        <div className={`custom-badge ${color}`}>
            <img className="custom-badge-icon" src={PlusIcon} alt="Plus Icon" />
            {text}%
        </div>
    );
};

export default Badge;
