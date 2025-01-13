import { IonIcon } from "@ionic/react";
import { Button, Input, Modal } from "antd";
import Form, { Rule } from "antd/es/form";
import { checkmarkDoneOutline, recording } from "ionicons/icons";
import { useState } from "react";

type FromValues = {
  firstName: string | undefined;
  lastName: string | undefined;
};

interface propValues {
  data?: { id?: string; firstName?: string; lastName?: string };
  type: "add" | "edit";
  isOpen: boolean;
  setIsOpen: (p: boolean) => void;
  callback: (info: any, id: any) => void;
}

const FormPopup: React.FC<propValues> = ({
  data,
  type,
  isOpen,
  setIsOpen,
  callback,
}: propValues) => {
  const [info, setInfo] = useState<FromValues>({
    firstName: data?.firstName,
    lastName: data?.lastName,
  });
  const validateName: Rule[] = [
    {
      required: true,
      message: "Please input your username !",
    },
  ];

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleInfoChange = (e: any) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal
      title={type === "add" ? "Add New Form Modal" : "Edit Form Modal"}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={() => callback(info, data?.id)}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="vertical"
        style={{ alignItems: "center" }}
      >
        <Form.Item label="FirstName" name="firstname" rules={validateName}>
          <Input
            name="firstName"
            value={info.firstName}
            onChange={handleInfoChange}
          />
        </Form.Item>
        <Form.Item label="LastName" name="lastname" rules={validateName}>
          <Input
            name="lastName"
            value={info.lastName}
            onChange={handleInfoChange}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Create New
          <IonIcon icon={checkmarkDoneOutline} />
        </Button>
      </Form>
    </Modal>
  );
};

export default FormPopup;
