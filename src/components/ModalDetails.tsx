import { Modal } from 'antd';
import './ModalDetail.css';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const handleCancel = () => {
        setIsOpen(false);
    };
    return (
        <Modal
            title={t('detailedInformation')}
            open={isOpen}
            onCancel={handleCancel}
            footer={null} // Custom footer, remove default buttons
        >
            <table className="modal-table">
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>{data?.id}</td>
                    </tr>
                    <tr>
                        <td>{t('firstName')}</td>
                        <td>{data?.firstName}</td>
                    </tr>
                    <tr>
                        <td>{t('lastName')}</td>
                        <td>{data?.lastName}</td>
                    </tr>
                </tbody>
            </table>
        </Modal>
    );
};

export default ModalDetails;
