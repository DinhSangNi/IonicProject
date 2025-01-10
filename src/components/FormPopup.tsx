import { Button, Input, Modal } from "antd";
import Form, { Rule } from "antd/es/form";

type FromValues = {
  firstName: string;
  lastName: string;
};

interface propValues {
  isAddNew: boolean;
  setIsAddNew: (p: boolean) => void;
}

const FormPopup: React.FC<propValues> = ({
  isAddNew,
  setIsAddNew,
}: propValues) => {
  const validateName: Rule[] = [
    {
      required: true,
      message: "Please input your username !",
    },
  ];

  const handleCancel = () => {
    setIsAddNew(false);
  };

  return (
    <Modal
      title="Add New Form Modal"
      visible={isAddNew}
      onCancel={handleCancel}
      footer={null} // Custom footer, remove default buttons
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={() => console.log("Hello")}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
      >
        <Form.Item label="FirstName" name="firstname" rules={validateName}>
          <Input />
        </Form.Item>
        <Form.Item label="LastName" name="lastname" rules={validateName}>
          <Input />
        </Form.Item>
      </Form>
      <Button onClick={handleCancel}>Close</Button>
    </Modal>
  );
};

export default FormPopup;
