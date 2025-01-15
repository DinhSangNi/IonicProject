import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
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
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { TypeValues } from '../components/FormPopup';
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
    // const [pagination, setPagination] = useState<TablePaginationConfig>({
    //     current: 1,
    //     pageSize: 10,
    //     total: 0,
    // });
    const [page, setPage] = useState<number>(1);

    const [isAddNew, setIsAddNew] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [data, setData] = useState<DataType>();
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loadingData, setLoadingData] = useState<boolean>(false);
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
            title: 'Firsrt Name',
            dataIndex: 'firstName',
            key: 'firstName',
            align: 'center',
            //   sortOrder: "ascend",
        },
        {
            title: 'Last Name',
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
        setLoadingData(true);
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
                    setHasMore(false);
                }
                // setDataSource(results);
                setDataSource((prev) => [...prev, ...results]);
                setLoadingData(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoadingData(false);
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
    // const handleNextPage = (): void => {
    //     if (hasMore) {
    //         setPage((prev) => prev + 1);
    //     }
    // };

    // const handldPreviousPage = (): void => {
    //     if (page > 0) {
    //         setPage((prev) => prev - 1);
    //     }
    // };

    const handleLoadingData = (e: CustomEvent): void => {
        setPage((prev) => prev + 1);
        fetchDataPagination(page + 1);
        (e.target as HTMLIonInfiniteScrollElement).complete();
        console.log('hello');
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
                <IonInfiniteScroll
                    threshold="150px"
                    onIonInfinite={handleLoadingData}
                    disabled={!hasMore || loadingData}
                >
                    <IonInfiniteScrollContent
                        loadingSpinner="bubbles"
                        loadingText="Loading more data..."
                    />
                </IonInfiniteScroll>

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
