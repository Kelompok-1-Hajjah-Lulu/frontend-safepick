import PlusIcon from "../../assets/icons/plus-icon.svg";
import MinusIcon from "../../assets/icons/minus-icon.svg";

import "./Badge.scss";

interface BadgeProps {
    text: number | undefined;
    color: string;
}
const Badge = ({ text, color }: BadgeProps) => {
    let icon: string = "";
    let badgeColor = color;
    if (text !== undefined) {
        if (text < 0) {
            icon = MinusIcon;
            badgeColor = "red";
        } else {
            icon = PlusIcon;
            badgeColor = "green";
        }
    }
    return (
        <div className={`custom-badge ${badgeColor}`}>
            <img className="custom-badge-icon" src={icon} alt="Icon" />
            {text}%
        </div>
    );
};

export default Badge;
