import dayjs from "dayjs";
import { DataType } from "../pages/Dashboard";

class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async getStudentsWithPagination<T>(method: string, page: number, limit: number): Promise<T> {

        const queryString = `page=${page}&limit=${limit}`;
        const rs = await fetch(`${this.baseUrl}?${queryString}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if ( !rs.ok ) {
            throw new Error("Faild get student !");
        }
        
        return await rs.json();
    }

    public async addStudent<T>(method: string, body: Partial<DataType>): Promise<T> {
        const rs = await fetch(`${this.baseUrl}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...body, lastUpdate: dayjs()}),
        });

        if (!rs.ok) {
            throw new Error('Failed add student !');
        }
        return await rs.json();
    }

    public async editStudent<T>(
        method: string,
        body: Partial<DataType>,
        id?: string,
    ): Promise<T> {
        const rs = await fetch(`${this.baseUrl}/${id}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...body, lastUpdate: dayjs()}),
        });

        if (!rs.ok) {
            throw new Error('Failed edit student !');
        }
        return await rs.json();
    }

    public async deleteStudent<T>(method: string, id: string): Promise<T> {
        const rs = await fetch(`${this.baseUrl}/${id}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!rs.ok) {
            throw new Error('Failed delete student !');
        }
        return await rs.json();
    }

    public async viewStudent<T>(method: string, id: string): Promise<T> {
        const rs = await fetch(`${this.baseUrl}/${id}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!rs.ok) {
            throw new Error('Failed delete student !');
        }
        return await rs.json();
    }
}

export default ApiService;
