import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  addCircleSharp,
  closeCircleSharp,
  eyeSharp,
  pencilSharp,
} from "ionicons/icons";
import { Table } from "antd";
import "./Dashboard.css";
import FormPopup from "../components/FormPopup";

// interface DataType {
//   id: string;
//   firstName: string;
//   lastName: string;
//   action: string;
//   lastUpdate: Date;
// }

const Dashboard: React.FC = () => {
  const [dataSource, setDataSource] = useState();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isAddNew, setIsAddNew] = useState<boolean>(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
    },
    {
      title: "Last Update",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      align: "center",
      render: (text: any) => {
        return text.split("T")[0];
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <>
          <IonButton color="secondary" size="small">
            <IonIcon icon={eyeSharp} slot="icon-only" />
          </IonButton>
          <IonButton color="warning" size="small">
            <IonIcon icon={pencilSharp} slot="icon-only" />
          </IonButton>
          <IonButton
            color="danger"
            size="small"
            onClick={() => {
              return handleDeleteStudent(record.id);
            }}
          >
            <IonIcon icon={closeCircleSharp} slot="icon-only" />
          </IonButton>
        </>
      ),
    },
  ];
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://6780920885151f714b0717a5.mockapi.io/api/v1/students"
      );
      const rs = await res.json();
      setDataSource(rs);
      setPagination((prev) => ({ ...prev, total: rs.length }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableChange = (pagination: any) => {
    console.log("pagination: ", pagination);
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total,
    });
  };

  const handleDeleteStudent = async (id: any) => {
    try {
      const rs = await fetch(
        `https://6780920885151f714b0717a5.mockapi.io/api/v1/students/${id}`,
        {
          method: "DELETE",
        }
      );
      if (rs.status === 200) {
        console.log("Successfully Delete.");
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (info: any) => {
    try {
      const rs = await fetch(
        `https://6780920885151f714b0717a5.mockapi.io/api/v1/students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );
      if (rs.status === 201) {
        console.log("created");
        fetchData();
        setIsAddNew(false);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CRUD Dashboard</IonTitle>
          <IonButton
            slot="end"
            type="button"
            onClick={() => setIsAddNew(!isAddNew)}
          >
            Add New
            <IonIcon icon={addCircleSharp} slot="start" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Table
          columns={columns}
          dataSource={dataSource}
          className="ion-margin-top"
          pagination={{
            current: pagination.current,
            total: pagination.total,
            pageSize: pagination.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
          }}
          onChange={handleTableChange}
        />
      </IonContent>
      <FormPopup
        isAddNew={isAddNew}
        setIsAddNew={setIsAddNew}
        handleSubmit={handleSubmit}
      />
    </IonPage>
  );
};

export default Dashboard;
