import React from "react";
import "./HomePage.scss";
import PredictionForm from "./components/PredictionForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { formatNumber } from "../../utils/formatNumber";

const HomePage: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "http://192.168.23.171:8008/gold-price/latest",
                );
                setData(response.data);
            } catch (err) {
                setError("Failed to fetch data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <section className="homepage">
            <p className="tagline font-24 desktop-only">
                Ingin mulai{" "}
                <span className="fw-900" style={{ color: "#FFF5CD" }}>
                    INVESTASI
                </span>{" "}
                tapi bingung harus ke mana?
            </p>

            <p className="subtext font-32 desktop-only">
                Cukup isi <strong>nominal investasi</strong> dan{" "}
                <strong>jangka waktu</strong>, kami berikan{" "}
                <span className="highlight">rekomendasi</span> yang tepat dan
                mudah dipahami!
            </p>

            <div className="input-section">
                <PredictionForm />
                <img
                    src="/icons/illustration-home.png"
                    alt="Ilustrasi investasi"
                    className="homepage-illustration desktop-only"
                />
            </div>

            <h3 className="section-title with-line">
                Tentang Produk Investasi
            </h3>

            <div className="product-cards">
                <div className="product-card emas">
                    <h4>Tabungan E-Mas</h4>
                    <p>
                        Fasilitas menabung berbasis rekening dengan akad
                        Wadiah/Titipan dengan saldo berupa gram emas. Emas dapat
                        disimpan, dicetak, dan dijual kembali
                    </p>
                    <p>
                        Minimal pembelian emas untuk Tabungan E-Mas mulai dari
                        0.05 gram
                    </p>
                    <img
                        src="/icons/star-decor.png"
                        alt="bintang"
                        className="icon-decor star desktop-only"
                    />

                    <div className="price-row">
                        <div className="price-block">
                            <small>Harga beli (/gram)</small>
                            <br />
                            <strong>
                                Rp
                                {loading ? (
                                    <>
                                        <p>loading..</p>
                                    </>
                                ) : (
                                    formatNumber(data?.price ?? 0)
                                )}
                            </strong>
                        </div>

                        <div className="separator" />
                        <div className="price-block">
                            <small>Harga jual (/gram)</small>
                            <br />
                            <strong>
                                Rp
                                {loading ? (
                                    <>
                                        <p>loading..</p>
                                    </>
                                ) : (
                                    formatNumber(data?.buyback_price ?? 0)
                                )}
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="product-card deposito">
                    <h4>Deposito</h4>
                    <p>
                        Fasilitas investasi jangka waktu tertentu dengan akad
                        Mudharabah Muthlaqah.
                    </p>
                    <img
                        src="/icons/graph-decor.png"
                        alt="grafik"
                        className="icon-decor graph desktop-only"
                    />
                    <ul className="custom-list">
                        <li>
                            <img src="/icons/checkmark.png" alt="check" />
                            Mulai dari Rp2 Juta
                        </li>
                        <li>
                            <img src="/icons/checkmark.png" alt="check" />
                            Nisbah bagi hasil yang kompetitif
                        </li>
                        <li>
                            <img src="/icons/checkmark.png" alt="check" />
                            Jangka waktu mulai dari 1, 3, 6, sampai 12 bulan
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default HomePage;
