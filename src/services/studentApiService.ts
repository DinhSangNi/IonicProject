import dayjs from "dayjs";

class StudentApiService {
    private static instance: StudentApiService;
    private baseUrl: string = import.meta.env.VITE_BE_BASE_URL;
    private headers = {
        'Content-Type': 'application/json',
    };

    private constructor() {}

    public static getInstance() {
        if(!StudentApiService.instance) {
            StudentApiService.instance = new StudentApiService();
        }

        return StudentApiService.instance;
    }

    public async getStudentsWithPagination<DataType>( page: number, limit: number): Promise<DataType> {

        const queryString = `page=${page}&limit=${limit}`;
        const rs = await fetch(`${this.baseUrl}?${queryString}`, {
            method: "GET",
            headers: this.headers,
        });

        if ( !rs.ok ) {
            throw new Error("Faild get student !");
        }
        
        return await rs.json();
    }

    public async addStudent<DataType>( body: Partial<DataType>): Promise<DataType> {
        const rs = await fetch(`${this.baseUrl}`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({...body, lastUpdate: dayjs()}),
        });

        if (!rs.ok) {
            throw new Error('Failed add student !');
        }
        return await rs.json();
    }

    public async editStudent<DataType>(
        
        body: Partial<DataType>,
        id?: string,
    ): Promise<DataType> {
        const rs = await fetch(`${this.baseUrl}/${id}`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify({...body, lastUpdate: dayjs()}),
        });

        if (!rs.ok) {
            throw new Error('Failed edit student !');
        }
        return await rs.json();
    }

    public async deleteStudent<DataType>( id: string): Promise<DataType> {
        const rs = await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE",
            headers: this.headers,
        });

        if (!rs.ok) {
            throw new Error('Failed delete student !');
        }
        return await rs.json();
    }

    public async viewStudent<DataType>( id: string): Promise<DataType> {
        const rs = await fetch(`${this.baseUrl}/${id}`, {
            method: "GET",
            headers: this.headers,
        });

        if (!rs.ok) {
            throw new Error('Failed delete student !');
        }
        return await rs.json();
    }
}

export default StudentApiService;
