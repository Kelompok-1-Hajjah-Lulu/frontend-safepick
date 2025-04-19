import { Button, Checkbox, Form, Input, message, Modal, Select } from "antd";
import "./ModalFormPengajuan.scss";
import axios from "axios";
import { useState } from "react";

interface ModalFormPengajuanProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const { Option } = Select;

const formFields = [
    {
        sectionTitle: "Data Diri",
        fields: [
            {
                label: "Nama Lengkap",
                name: "full_name",
                placeholder: "John Doe",
                rules: [
                    { required: true, message: "Nama lengkap wajib diisi" },
                ],
                inputType: "text",
                options: [],
            },
            {
                label: "No HP",
                name: "nomor_hp",
                placeholder: "+628xxxxx",
                rules: [
                    { required: true, message: "No HP wajib diisi" },
                    {
                        pattern: /^\+62\d{8,}$/,
                        message: "Gunakan format +62 diikuti minimal 8 angka",
                    },
                ],
                inputType: "text",
                options: [],
            },
            {
                label: "E-Mail",
                name: "email",
                placeholder: "john.doe@mail.com",
                rules: [
                    { required: true, message: "E-Mail wajib diisi" },
                    { type: "email", message: "Format email tidak valid" },
                ],
                inputType: "text",
                options: [],
            },
        ],
    },
    {
        sectionTitle: "Alamat",
        fields: [
            {
                label: "Kecamatan",
                name: "kecamatan",
                placeholder: "Mampang Prapatan",
                rules: [{ required: true, message: "Kecamatan wajib diisi" }],
                inputType: "text",
                options: [],
            },
            {
                label: "Kota",
                name: "kota",
                placeholder: "Jakarta Selatan",
                rules: [{ required: true, message: "Kecamatan wajib diisi" }],
                inputType: "text",
                options: [],
            },
            {
                label: "Provinsi",
                name: "provinsi",
                placeholder: "Jakarta",
                rules: [{ required: true, message: "Kecamatan wajib diisi" }],
                inputType: "text",
                options: [],
            },
        ],
    },
    {
        sectionTitle: "Produk Investasi",
        fields: [
            {
                label: "Tipe Produk",
                name: "tipe_produk",
                placeholder: "Pilih Tipe Produk",
                rules: [{ required: true, message: "Tipe Produk wajib diisi" }],
                inputType: "option",
                options: [
                    { value: "tabunganEmas", label: "Tabungan Emas" },
                    { value: "deposito", label: "Deposito" },
                ],
            },
            {
                label: "Nominal Investasi",
                name: "nominal",
                placeholder: "Rp102.404.021",
                rules: [{ required: true, message: "Tenor wajib diisi" }],
                inputType: "text",
                options: [],
            },
            {
                label: "Jangka Waktu",
                name: "jangka_waktu",
                placeholder: "Pilih Jangka Waktu",
                rules: [
                    { required: true, message: "Jangka Waktu wajib diisi" },
                ],
                inputType: "option",
                options: [
                    { value: "1", label: "1 Bulan" },
                    { value: "3", label: "3 Bulan" },
                    { value: "6", label: "6 Bulan" },
                    { value: "12", label: "12 Bulan" },
                ],
            },
        ],
    },
];

// TODO add snackbar

const ModalFormPengajuan = ({
    isModalOpen,
    setIsModalOpen,
}: ModalFormPengajuanProps) => {
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values: any) => {
        const { tnc, ...restValues } = values;
        try {
            const response = await axios.post(
                "http://192.168.23.171:8080/application-form",
                restValues,
            );
            setLoading(true);
            form.resetFields();
            messageApi.success(response?.data?.message);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                title={
                    <span className="font-48" style={{ color: "#00898B" }}>
                        Formulir Pengajuan
                    </span>
                }
                open={isModalOpen}
                footer={null}
                onCancel={() => {
                    handleCancel();
                    form.resetFields();
                }}
                width={"80vw"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    className="form-pengajuan"
                    onFinish={onFinish}
                >
                    {formFields.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            <p className="font-24 fw-600">
                                {section.sectionTitle}
                            </p>
                            <div className="divider"></div>
                            <div className="flex-form">
                                {section.fields.map((field, fieldIndex) => (
                                    <div
                                        className="input-wrapper"
                                        key={fieldIndex}
                                    >
                                        <Form.Item
                                            label={
                                                <p className="font-18">
                                                    {field.label}
                                                </p>
                                            }
                                            name={field.name}
                                            rules={field.rules as any}
                                        >
                                            {field.inputType === "option" ? (
                                                <Select placeholder="Pilih jenis kelamin">
                                                    {field.options?.map(
                                                        (
                                                            option,
                                                            optionIndex,
                                                        ) => (
                                                            <Option
                                                                key={
                                                                    optionIndex
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </Option>
                                                        ),
                                                    )}
                                                </Select>
                                            ) : (
                                                <Input
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                />
                                            )}
                                        </Form.Item>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <Form.Item
                        name="tnc"
                        rules={[
                            {
                                required: true,
                                message: "Wajib dicentang",
                            },
                        ]}
                    >
                        <Checkbox.Group
                            options={[
                                "Saya menyetujui bahwa data yang saya isi dalam formulir ini dapat digunakan oleh pihak bank untuk keperluan verifikasi dan layanan terkait",
                            ]}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="custom-button green"
                            loading={loading}
                        >
                            Ajukan
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalFormPengajuan;
