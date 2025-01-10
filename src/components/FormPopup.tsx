import { IonIcon } from "@ionic/react";
import { Button, Input, Modal } from "antd";
import Form, { Rule } from "antd/es/form";
import { checkmarkDoneOutline } from "ionicons/icons";
import { useState } from "react";

type FromValues = {
  firstName: string;
  lastName: string;
};

interface propValues {
  isAddNew: boolean;
  setIsAddNew: (p: boolean) => void;
  handleSubmit: (info: any) => void;
}

const FormPopup: React.FC<propValues> = ({
  isAddNew,
  setIsAddNew,
  handleSubmit,
}: propValues) => {
  const [info, setInfo] = useState<FromValues>({
    firstName: "",
    lastName: "",
  });
  const validateName: Rule[] = [
    {
      required: true,
      message: "Please input your username !",
    },
  ];

  const handleCancel = () => {
    setIsAddNew(false);
  };

  const handleInfoChange = (e: any) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal
      title="Add New Form Modal"
      open={isAddNew}
      onCancel={handleCancel}
      footer={null} // Custom footer, remove default buttons
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={() => handleSubmit(info)}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="vertical"
        style={{ alignItems: "center" }}
      >
        <Form.Item label="FirstName" name="firstname" rules={validateName}>
          <Input name="firstName" onChange={handleInfoChange} />
        </Form.Item>
        <Form.Item label="LastName" name="lastname" rules={validateName}>
          <Input name="lastName" onChange={handleInfoChange} />
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
