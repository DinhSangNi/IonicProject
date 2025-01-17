import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import {
    addCircleSharp,
    closeCircleSharp,
    eyeSharp,
    pencilSharp,
} from 'ionicons/icons';
import { Table, TablePaginationConfig } from 'antd';
import './Dashboard.css';
import FormPopup from '../components/FormPopup';
import ModalDetails from '../components/ModalDetails';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { TypeValues } from '../components/FormPopup';
import { useTranslation } from 'react-i18next';
import { locales } from '../i18n/i18n';
export type DataType = {
    id: string;
    firstName: string;
    lastName: string;
    avartar: string;
    lastUpdate: Date;
};

const Dashboard: React.FC = () => {
    const [dataSource, setDataSource] = useState<DataType[]>();
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [isAddNew, setIsAddNew] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [data, setData] = useState<DataType>();
    const { t, i18n } = useTranslation();

    const currentLanguage = locales[i18n.language as keyof typeof locales];

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: t('firstName'),
            dataIndex: 'firstName',
            key: 'firstName',
            align: 'center',
            //   sortOrder: "ascend",
        },
        {
            title: t('lastName'),
            dataIndex: 'lastName',
            key: 'lastName',
            align: 'center',
        },
        {
            title: t('lastUpdate'),
            dataIndex: 'lastUpdate',
            key: 'lastUpdate',
            align: 'center',
            defaultSortOrder: 'descend',
            sorter: (a: DataType, b: DataType) => {
                return dayjs(a.lastUpdate).unix() - dayjs(b.lastUpdate).unix();
            },
            render: (text: string) => {
                return text.split('T')[0];
            },
        },
        {
            title: t('action'),
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_: unknown, record: DataType) => (
                <>
                    <IonButton
                        color="secondary"
                        size="small"
                        onClick={() => {
                            setData(record);
                            setIsShow(true);
                        }}
                    >
                        <IonIcon icon={eyeSharp} slot="icon-only" />
                    </IonButton>
                    <IonButton
                        color="warning"
                        size="small"
                        onClick={() => {
                            setData(record);
                            setIsEdit(true);
                        }}
                    >
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
    const fetchData = async (): Promise<void> => {
        try {
            const res = await fetch(
                'https://6780920885151f714b0717a5.mockapi.io/api/v1/students'
            );
            const rs: DataType[] = await res.json();
            setDataSource(rs);
            setPagination((prev) => ({ ...prev, total: rs.length }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleTableChange = (pagination: TablePaginationConfig): void => {
        setPagination({
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
        });
    };

    const handleDeleteStudent = async (id: string): Promise<void> => {
        try {
            const rs = await fetch(
                `https://6780920885151f714b0717a5.mockapi.io/api/v1/students/${id}`,
                {
                    method: 'DELETE',
                }
            );
            if (rs.status === 200) {
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreate = async (info: Partial<DataType>): Promise<void> => {
        try {
            const rs = await fetch(
                `https://6780920885151f714b0717a5.mockapi.io/api/v1/students`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(info),
                }
            );
            if (rs.status === 201) {
                fetchData();
                setIsAddNew(false);
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (
        info: Partial<DataType>,
        id: string | undefined
    ): Promise<void> => {
        try {
            const rs = await fetch(
                `https://6780920885151f714b0717a5.mockapi.io/api/v1/students/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...info, lastUpdate: dayjs() }),
                }
            );
            if (rs.status === 200) {
                fetchData();
                setIsEdit(false);
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeLanguage = (lng: string): void => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>CRUD {t('dashboard')}</IonTitle>
                    <IonSelect
                        className="ion-margin-end"
                        slot="end"
                        value={currentLanguage}
                        placeholder={currentLanguage}
                        onIonChange={(e) =>
                            handleChangeLanguage(e.detail.value)
                        }
                    >
                        <IonSelectOption value="vi">VietNamese</IonSelectOption>
                        <IonSelectOption value="en">English</IonSelectOption>
                    </IonSelect>
                    <IonButton
                        slot="end"
                        type="button"
                        onClick={() => setIsAddNew(!isAddNew)}
                    >
                        {t('addNew')}
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
                        pageSizeOptions: ['5', '10', '20'],
                    }}
                    onChange={handleTableChange}
                />
            </IonContent>
            <FormPopup
                type={TypeValues.Add}
                isOpen={isAddNew}
                setIsOpen={setIsAddNew}
                callback={handleCreate}
            />

            <FormPopup
                currentData={data}
                type={TypeValues.Edit}
                isOpen={isEdit}
                setIsOpen={setIsEdit}
                callback={handleEdit}
            />
            <ModalDetails data={data} isOpen={isShow} setIsOpen={setIsShow} />
        </IonPage>
    );
};

export default Dashboard;
