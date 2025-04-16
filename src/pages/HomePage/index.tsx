import React from "react";
import "./HomePage.scss";


const HomePage: React.FC = () => {
    return (
        <section className="homepage">
            <p className="tagline">
                Baru mau mulai investasi tapi bingung harus ke mana?
            </p>

            <p className="subtext">
                Cukup isi <strong>nominal investasi</strong> dan <strong>jangka waktu</strong>, kami kasih <span className="highlight">rekomendasi</span> yang tepat, jelas, dan mudah dipahami!
            </p>

            <div className="input-section">
                <div className="label-row">
                    <label>Nominal Investasi</label>
                    <label>Tenor</label>
                </div>

                <div className="input-row">
                    <input
                        type="text"
                        placeholder="Input nominal yang ingin diinvestasikan"
                    />
                    <select>
                        <option>Pilih Jangka Waktu</option>
                        <option value="1">1 Bulan</option>
                        <option value="3">3 Bulan</option>
                        <option value="6">6 Bulan</option>
                        <option value="12">12 Bulan</option>
                    </select>
                </div>

                <button className="btn-predict">Prediksi Keuntungan</button>
            </div>

            <h3 className="section-title with-line">Tentang Produk Investasi</h3>

            <div className="product-cards">
            <div className="product-card emas">
                <img src="/icons/star-decor.png" alt="bintang" className="icon-decor star" />

                <h4>Tabungan E-Mas</h4>
                <p>
                Fasilitas menabung berbasis rekening dengan akad Wadiah/Titipan dengan saldo berupa gram emas.
                Emas dapat disimpan, dicetak, dan dijual kembali
                </p>
                <p>Minimal pembelian emas untuk Tabungan E-Mas mulai dari 0.1 gram</p>

                <div className="price-row">
                
                <div className="price-block">
                    <p><small>Harga beli (/gram)</small></p>
                    <p><strong>Rp1.877.000</strong></p>
                </div>

                <div className="separator" />

                <div className="price-block">
                    <p><small>Harga jual (/gram)</small></p>
                    <p><strong>Rp1.783.000</strong></p>
                    </div>
                </div>
            </div>
            
            <div className="product-card deposito">
                <img src="/icons/graph-decor.png" alt="grafik" className="icon-decor graph" />

                <h4>Deposito</h4>
                <p>Fasilitas investasi jangka waktu tertentu dengan akad Mudharabah Muthlaqah.</p>
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
