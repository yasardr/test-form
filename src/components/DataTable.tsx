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
  const data = {nodes};

  const theme = useTheme(getTheme());

  const COLUMNS = [
    { label: "ID", renderCell: (item: Data) => item.id },
    { label: "Name", renderCell: (item: Data) => item.name },
    { label: "Email", renderCell: (item: Data) => item.email },
    { label: "Website", renderCell: (item: Data) => item.website },
    { label: "Actions", renderCell: (item: Data) => 'Edit/Clear' },
  ];

  return (
    <section className="row my-3">
      <CompactTable columns={COLUMNS} data={data} theme={theme} />
    </section>
  );
};

export default DataTable;