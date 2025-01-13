import { IonIcon } from '@ionic/react';
import { Button, Input, Modal } from 'antd';
import Form, { Rule } from 'antd/es/form';
import { checkmarkDoneOutline } from 'ionicons/icons';
import { useState } from 'react';
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
    const firstNameValidationRules: Rule[] = [
        {
            required: true,
            message: 'Please input your first name !',
        },
    ];

    const lastNameValidationRules: Rule[] = [
        {
            required: true,
            message: 'Please input your last name !',
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
                    ? 'Add New Form Modal'
                    : 'Edit Form Modal'
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
                    label="FirstName"
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
                    label="LastName"
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
                    {type === TypeValues.Add ? `Create New ` : `Save Changes`}
                    <IonIcon icon={checkmarkDoneOutline} />
                </Button>
            </Form>
        </Modal>
    );
};

export default FormPopup;
