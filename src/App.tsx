import { Form } from './components/Form';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <div className="row text-center mb-3">
        <h1>Identificación</h1>
      </div>
      
      <Form />

      {/* Table */}
      <section>
          {/* ID, Name, Email, Website, Action (edit, clear) */}
      </section>
    </div>
  )
}

export default App;
