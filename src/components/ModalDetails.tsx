import { Modal } from 'antd';


type PropValues = {
    data?: { id?: string; firstName?: string; lastName?: string };
    isOpen: boolean;
    setIsOpen: (p: boolean) => void;
};

const ModalDetails: React.FC<PropValues> = ({
    data,
    isOpen,
    setIsOpen,
}: PropValues) => {
    const handleCancel = () => {
        setIsOpen(false);
    };
    return (
        <Modal

            title={'Detailed Information'}

            open={isOpen}
            onCancel={handleCancel}
            footer={null} // Custom footer, remove default buttons
        >
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>

                    <tr style={{ display: "flex", gap: "20px" }}>
                        <td>ID</td>
                        <td>{data?.id}</td>
                    </tr>
                    <tr style={{ display: "flex", gap: "20px" }}>
                        <td>First Name</td>
                        <td>{data?.firstName}</td>
                    </tr>
                    <tr style={{ display: "flex", gap: "20px" }}>

                        <td>Last Name</td>
                        <td>{data?.lastName}</td>
                    </tr>
                </tbody>
            </table>
        </Modal>
    );
};

export default ModalDetails;
