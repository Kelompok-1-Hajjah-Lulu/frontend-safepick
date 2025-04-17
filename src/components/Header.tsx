import Logo from "../assets/logo.webp";
import "./Header.scss";

const Header: React.FC = () => {
    return (
        <div className="header-wrapper">
            <section className="header" style={{ zIndex: 10 }}>
                <a href="/">
                    <img src={Logo} alt="Logo" />
                </a>
                <div className="slogan">
                    <p className="font-48">
                        Mulai <strong>Aman</strong>,
                    </p>
                    <p
                        className="font-48"
                        style={{ marginLeft: "4ch", marginTop: "-4%" }}
                    >
                        Cuan <strong>Maksimal</strong>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Header;
