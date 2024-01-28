import { useEffect, useState } from 'react';
import axios from 'axios';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { nodes } from '../data';

interface Data {
    id: number;
    name: string;
    email: string;
    website: string;
}

const DataTable = () => {
    const [data, setData] = useState({nodes: []}); 

    const theme = useTheme(getTheme());

    const COLUMNS = [
        { label: "ID", renderCell: (item: Data) => item.id },
        { label: "Name", renderCell: (item: Data) => item.name },
        { label: "Email", renderCell: (item: Data) => item.email },
        { label: "Website", renderCell: (item: Data) => item.website },
        { label: "Actions", renderCell: (item: Data) => 'Edit/Clear' },
    ];

    const doGet = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            if (res.status === 200 && res.data) {
                setData({nodes: res.data});
            } else {
                console.log('Oops algo salió mal!');
            }
        } catch (error: any) {
            console.log(error); 
        }
    }

    useEffect(() => {
        doGet();
    }, [])

    return (
        <section className="row my-3">
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
        </section>
    );
};

export default DataTable;