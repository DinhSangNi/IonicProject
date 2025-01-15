import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import {
    addCircleSharp,
    closeCircleSharp,
    eyeSharp,
    pencilSharp,
} from 'ionicons/icons';

import './Dashboard.css';
import FormPopup from '../components/FormPopup';
import ModalDetails from '../components/ModalDetails';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { TypeValues } from '../components/FormPopup';
import { Table } from 'antd';
import ApiService from '../services/apiService';

export type DataType = {
    id: string;
    firstName: string;
    lastName: string;
    avartar: string;
    lastUpdate: Date;
};

const Dashboard: React.FC = () => {
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [isAddNew, setIsAddNew] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [data, setData] = useState<DataType>();
    const [page, setPage] = useState<number>(1);
    const apiService = new ApiService(
        'https://6780920885151f714b0717a5.mockapi.io/api/v1/students'
    );

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            align: 'center',
            //   sortOrder: "ascend",
        },
        {
            title: ' Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            align: 'center',
        },
        {
            title: 'Last Update',
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
            title: 'Action',
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

    const fetchDataPagination = async (page: number): Promise<void> => {
        try {
            const limit: number = 10;
            const results: DataType[] =
                await apiService.getStudentsWithPagination<DataType[]>(
                    'GET',
                    page,
                    limit
                );
            if (results) {
                if (results.length < limit) {
                }
                setDataSource(results);
            }
        } catch (e) {
            console.log(e);
        }
    };

    // const handleTableChange = (pagination: TablePaginationConfig): void => {
    //     setPagination({
    //         current: pagination.current,
    //         pageSize: pagination.pageSize,
    //         total: pagination.total,
    //     });
    // };

    const handleCreate = async (info: Partial<DataType>): Promise<void> => {
        try {
            const result = await apiService.addStudent<DataType>('POST', info);
            if (result) {
                const cloneDataSource = [...dataSource, result];
                setDataSource(cloneDataSource);
                setIsAddNew(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteStudent = async (id: string): Promise<void> => {
        try {
            const result: DataType = await apiService.deleteStudent(
                'DELETE',
                id
            );
            if (result) {
                setDataSource(handleReplaceData(result));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (
        info: Partial<DataType>,
        id?: string
    ): Promise<void> => {
        try {
            const result: DataType = await apiService.editStudent(
                'PUT',
                info,
                id
            );
            if (result) {
                dataSource[+result.id] = result;
                setIsEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleReplaceData = (data: DataType): DataType[] => {
        return dataSource.filter((item) => item.id != data.id);
    };

    useEffect(() => {
        fetchDataPagination(page);
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
