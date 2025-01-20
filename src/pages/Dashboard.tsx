import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
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
import './Dashboard.css';
import FormPopup from '../components/FormPopup';
import ModalDetails from '../components/ModalDetails';
import Table, { ColumnsType } from 'antd/es/table';
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
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [page, setPage] = useState<number>(1);

    const [isAddNew, setIsAddNew] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [data, setData] = useState<DataType>();
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loadingData, setLoadingData] = useState<boolean>(false);

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

    const fetchDataPagination = async (page: number): Promise<void> => {
        setLoadingData(true);
        try {
            const limit: number = 10;
            const queryString = `page=${page}&limit=${limit}`;
            const results = await fetch(
                `${import.meta.env.VITE_BE_BASE_URL}?${queryString}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (results.ok) {
                const rs = await results.json();
                if (rs.length < limit) {
                    setHasMore(false);
                }
                setDataSource((prev) => [...prev, ...rs]);
                setLoadingData(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoadingData(false);
        }
    };

    const handleCreate = async (info: Partial<DataType>): Promise<void> => {
        try {
            const result = await fetch(import.meta.env.VITE_BE_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
            });
            if (result.ok) {
                const cloneDataSource = [...dataSource, await result.json()];
                setDataSource(cloneDataSource);
                setIsAddNew(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteStudent = async (id: string): Promise<void> => {
        try {
            const result = await fetch(
                `${import.meta.env.VITE_BE_BASE_URL}/${id}`,
                {
                    method: 'DELETE',
                }
            );

            if (result) {
                setDataSource(handleReplaceData(await result.json()));
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
            const result = await fetch(
                `${import.meta.env.VITE_BE_BASE_URL}/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...info, lastUpdate: dayjs() }),
                }
            );
            if (result) {
                const rs = await result.json();
                const index = dataSource.findIndex((item) => item.id === rs.id);
                dataSource[index] = await rs;
                setIsEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoadingData = (e: CustomEvent): void => {
        setPage((prev) => prev + 1);
        fetchDataPagination(page + 1);
        (e.target as HTMLIonInfiniteScrollElement).complete();
    };

    const handleReplaceData = (data: DataType): DataType[] => {
        return dataSource.filter((item) => item.id != data.id);
    };

    const handleChangeLanguage = (lng: string): void => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    useEffect(() => {
        fetchDataPagination(page);
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
                />
                <IonInfiniteScroll
                    threshold="150px"
                    onIonInfinite={handleLoadingData}
                    disabled={!hasMore || loadingData}
                >
                    <IonInfiniteScrollContent
                        loadingSpinner="bubbles"
                        loadingText={t('loadingMoreData')}
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
