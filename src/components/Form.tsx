import { listStates } from '../data/index.ts';

interface DataState {
    name: string;
    key: string;
}

const Form = () => {
  return (
    <section className="row">
        <div className="col-12 col-lg-4 mb-3">
        <label htmlFor="name" className="form-label">Nombre*</label>
        <input type="text" className="form-control" name="name" />
        </div>
        <div className="col-sm-12 col-lg-4 mb-3">
        <label htmlFor="firstlastname" className="form-label">Primer Apellido*</label>
        <input type="text" className="form-control" name="firstlastname" />
        </div>
        <div className="col-sm-12 col-lg-4 mb-3">
        <label htmlFor="secondlastname" className="form-label">Segundo Apellido</label>
        <input type="text" className="form-control" name="secondlastname" />
        </div>

        <div className="col-sm-12 col-lg-6 mb-3">
        <label htmlFor="curp" className="form-label">CURP*</label>
        <input type="text" className="form-control" name="curp" />
        </div>
        <div className="col-sm-12 col-lg-6 mb-3">
        <label htmlFor="rfc" className="form-label">RFC (con homoclave)*</label>
        <input type="text" className="form-control" name="rfc" />
        </div>

        <div className="col-sm-12 col-lg-2 mb-3">
        <label htmlFor="postalcode" className="form-label">Código postal*</label>
        <input type="text" className="form-control" name="postalcode" />
        </div>
        <div className="col-sm-12 col-lg-10 mb-3">
        <label htmlFor="street" className="form-label">Calle*</label>
        <input type="text" className="form-control" name="street" />
        </div>

        <div className="col-sm-12 col-lg-2 mb-3">
        <label htmlFor="numberone" className="form-label">Número exterior*</label>
        <input type="text" className="form-control" name="numberone" />
        </div>
        <div className="col-sm-12 col-lg-2 mb-3">
        <label htmlFor="numbertwo" className="form-label">Número interior</label>
        <input type="text" className="form-control" name="numbertwo" />
        </div>
        <div className="col-sm-12 col-lg-8 mb-3">
        <label htmlFor="state" className="form-label">Estado*</label>
        <select className="form-select" name="state" defaultValue="default">
            <option value="default"  disabled>Selecciona una opción</option>
            {
            listStates.map( (state: DataState) => (
                <option key={state.key} value={state.key}>{state.name}</option>
            ))
            }
        </select>
        </div>

        <div className="col-sm-12 col-lg-6 mb-3">
        <label htmlFor="municipality" className="form-label">Delegación / Municipio*</label>
        <input type="text" className="form-control" name="municipality" />
        </div>
        <div className="col-sm-12 col-lg-6 mb-3">
        <label htmlFor="cologne" className="form-label">Colonia*</label>
        <input type="text" className="form-control" name="cologne" />
        </div>

        <div className="col-12 text-center mb-3">
        <button type="button" className="btn btn-primary">Guardar</button>
        </div>
          
      </section>
  )
}

export default Form;