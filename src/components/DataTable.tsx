import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Table, Header, HeaderRow, Body, Row, HeaderCell, Cell 
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import MapElement from './Map';

interface Data {
    id: number;
    name: string;
    email: string;
    website: string;
}

const DataTable = () => {
    const [data, setData] = useState({nodes: []});
    const [geo, setGeo] = useState({lat: 24.8918, lng: 21.8984});

    const theme = useTheme({
        Table: `
            --data-table-library_grid-template-columns:  minmax(80px, 10%) minmax(200px, 25%) minmax(200px, 25%) minmax(150px, 25%) minmax(100px, 15%);
        `,
        BaseCell: `
            &:nth-of-type(1) {
              left: 0px;
              background-color: white;
            }
        `,
        Row: `
          cursor: pointer;
    
          &:hover .td {
            border-top: 1px solid orange;
            border-bottom: 1px solid orange;
          }
        `,
      });

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
            <Table 
            data={data}
            theme={theme}
            layout={{ custom: true, horizontalScroll: true }}>
            {(tableList: any) => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCell resize pinLeft>ID</HeaderCell>
                    <HeaderCell resize>Name</HeaderCell>
                    <HeaderCell resize>Email</HeaderCell>
                    <HeaderCell resize>Website</HeaderCell>
                    <HeaderCell resize>Action</HeaderCell>
                  </HeaderRow>
                </Header>

                <Body>
                  {tableList.map((item: Data) => {
                    return (
                      <Fragment key={item.id}>
                        <Row item={item} onClick={(item: any) => setGeo(item.address.geo)}>
                          <Cell pinLeft>{item.id}</Cell>
                          <Cell>{item.name}</Cell>
                          <Cell>{item.email}</Cell>
                          <Cell>{item.website}</Cell>
                          <Cell>
                            <span className="material-symbols-outlined text-success">edit</span>
                            <span className="material-symbols-outlined text-danger">delete</span>
                          </Cell>
                        </Row>
                      </Fragment>
                    );
                  })}
                </Body>
              </>
            )}
          </Table> 

          <div className="d-flex justify-content-center">
            <MapElement lat={geo.lat} lng={geo.lng} />
          </div>
        </section>
    );
};

export default DataTable;