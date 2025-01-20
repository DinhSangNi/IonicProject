import { IonIcon } from '@ionic/react';
import { Button, Input, Modal } from 'antd';
import Form, { Rule } from 'antd/es/form';
import { checkmarkDoneOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataType } from '../pages/Dashboard';

type FormValues = {
    firstName: string | undefined;
    lastName: string | undefined;
};

export enum TypeValues {
    Add = 'add',
    Edit = 'edit',
}

type Props = {
    currentData?: DataType;
    type: TypeValues;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    callback: (
        info: Partial<DataType>,
        id: string | undefined
    ) => Promise<void>;
};

const FormPopup: React.FC<Props> = ({
    currentData,
    type,
    isOpen,
    setIsOpen,
    callback,
}: Props) => {
    const [info, setInfo] = useState<FormValues>({
        firstName: currentData?.firstName,
        lastName: currentData?.lastName,
    });
    const { t } = useTranslation();
    const firstNameValidationRules: Rule[] = [
        {
            required: true,
            message: t('firstNameRuleMessage'),
        },
    ];

    const lastNameValidationRules: Rule[] = [
        {
            required: true,
            message: t('lastNameRuleMessage'),
        },
    ];

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <Modal
            title={
                type === TypeValues.Add
                    ? t('addNewFormModal')
                    : t('editFormModal')
            }
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={() => callback(info, currentData?.id)}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                layout="vertical"
                style={{ alignItems: 'center' }}
            >
                <Form.Item
                    label={t('firstName')}
                    name="firstName"
                    rules={firstNameValidationRules}
                >
                    <Input
                        name="firstName"
                        value={info.firstName}
                        onChange={handleInfoChange}
                    />
                </Form.Item>
                <Form.Item
                    label={t('lastName')}
                    name="lastName"
                    rules={lastNameValidationRules}
                >
                    <Input
                        name="lastName"
                        value={info.lastName}
                        onChange={handleInfoChange}
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    {type === TypeValues.Add ? t('addNew') : t('saveChanges')}
                    <IonIcon icon={checkmarkDoneOutline} />
                </Button>
            </Form>
        </Modal>
    );
};

export default FormPopup;
