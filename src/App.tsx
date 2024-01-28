import Form from './components/Form';
import DataTable from './components/DataTable';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <div className="row text-center mb-3">
        <h1>Identificación</h1>
      </div>
      
      <Form />
      
      <DataTable />
    </div>
  )
}

export default App;
