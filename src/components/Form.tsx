import { ChangeEvent, FormEvent, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { listStates } from '../data/index.ts';

const letters = ['name', 'firstlastname', 'secondlastname', 'state', 'municipality', 'cologne'];
const numbers = ['postalcode', 'numberone'];
const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$/;
const rfcRegex = /^[A-Z&Ññ]{3,4}\d{6}[A-Z0-9]{3}$/;
const letersRegex = /^[a-zA-Z]+$/;
const numbersRegex = /^[0-9]{1,5}$/;
const alphanumericRegex = /^[a-zA-Z0-9]{1,10}$/;

interface DataState {
    name: string;
    key: string;
}

// const initialFormData = {
// 	name: '',
//   firstlastname: '',
//   secondlastname: '',
//   curp: '',
//   rfc: '',
//   postalcode: '',
//   street: '',
//   numberone: '',
//   numbertwo: '',
//   state: '',
//   municipality: '',
//   cologne: '',
// };
const initialFormData = {
	name: 'a',
  firstlastname: 'a',
  secondlastname: '',
  curp: 'AABS981109HMRLBS14',
  rfc: 'ASPL9511098G3',
  postalcode: '50670',
  street: 'a',
  numberone: '1',
  numbertwo: '2',
  state: 'ZAC',
  municipality: 'a',
  cologne: 'a',
};

const Form = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmitForm = async (e: FormEvent) => {
		e.preventDefault();
		const { name, firstlastname, secondlastname, curp, rfc, postalcode,  
            street, numberone, numbertwo, state, municipality, cologne } = formData;

		if (!curpRegex.test(curp) || !rfcRegex.test(rfc) || postalcode.length < 5) {
			Swal.fire({
				title: 'Error!',
				text: `Existen campos por validar.`,
				icon: 'error',
				confirmButtonText: 'Aceptar'
			});  
      const field = postalcode.length < 5 ? 'postalcode' : (curpRegex.test(curp) ? 'rfc' : 'curp');
      const element = document.getElementById(field);
      element?.classList.add('is-invalid');
			return;
		}

    Swal.fire({
      text: 'Campos validados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      didOpen: () => {
        Swal.showLoading();
      }
    });

		try {
			const params = {
        infoUsuario: {
          Nombre: name,
          PrimerApellido: firstlastname,
          SegundoApellido: secondlastname,
          CURP: curp,
          RFC: rfc
        },
        Domicilio: {
          Calle: street,
          CodigoPostal: postalcode,
          NumExterior: numberone,
          NumInterior: numbertwo,
          Estado: state,
          Delegacion: municipality,
          Colonia: cologne
        }
      };

			const res = await axios.post('http://httpbin.org/post', params);
      
			if (res.status === 200 && res.statusText === 'OK') {
        setTimeout(() => {
          Swal.fire({
            title: 'Felicidades!',
            text: 'Datos guardados correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          setFormData(initialFormData);
        }, 1500);
			} else {
				Swal.fire({
					title: 'Oops algo salió mal!',
					text: 'Vuelve a intentarlo.',
					icon: 'info',
					confirmButtonText: 'Aceptar'
				});
			}
		} catch (error: any) {
			console.log(error);
			Swal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				confirmButtonText: 'Aceptar'
			});  
		}
	}

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		let val = value;
    const element = document.getElementById(name);
    element?.classList.remove('is-invalid');
		if (letters.includes(name) && !letersRegex.test(value)) val = val.slice(0, -1);
		if (numbers.includes(name) && !numbersRegex.test(value)) val = val.slice(0, -1);
		if (name === 'numbertwo' && !alphanumericRegex.test(value)) val = val.slice(0, -1);
		if (name === 'curp' || name === 'rfc') val = val.toUpperCase();
		setFormData({ ...formData, [name]: val });
	};

  return (
    <form className="row" onSubmit={handleSubmitForm}>
        <div className="col-12 col-lg-4 mb-3">
            <label htmlFor="name" className="form-label">Nombre*</label>
            <input type="text" className="form-control" name="name" id="name" value={formData.name} onChange={handleInputChange} required/>
          </div>
          <div className="col-sm-12 col-lg-4 mb-3">
            <label htmlFor="firstlastname" className="form-label">Primer Apellido*</label>
            <input type="text" className="form-control" name="firstlastname" id="firstlastname" value={formData.firstlastname} onChange={handleInputChange} required/>
          </div>
        <div className="col-sm-12 col-lg-4 mb-3">
          <label htmlFor="secondlastname" className="form-label">Segundo Apellido</label>
          <input type="text" className="form-control" name="secondlastname" id="secondlastname" value={formData.secondlastname} onChange={handleInputChange} />
        </div>

        <div className="col-sm-12 col-lg-6 mb-3">
          <label htmlFor="curp" className="form-label">CURP*</label>
          <input type="text" className="form-control" name="curp" id="curp" value={formData.curp} onChange={handleInputChange} required/>
          <div className="invalid-feedback">
            18 caracteres
          </div>
        </div>
        <div className="col-sm-12 col-lg-6 mb-3">
          <label htmlFor="rfc" className="form-label">RFC (con homoclave)*</label>
          <input type="text" className="form-control" name="rfc" id="rfc" value={formData.rfc} onChange={handleInputChange} required/>
          <div className="invalid-feedback">
            13 caracteres
          </div>
        </div>

        <div className="col-sm-12 col-lg-2 mb-3">
          <label htmlFor="postalcode" className="form-label">Código postal*</label>
          <input type="text" className="form-control" name="postalcode" id="postalcode" value={formData.postalcode} onChange={handleInputChange} required/>
          <div className="invalid-feedback">
            Cinco dígitos
          </div>
        </div>
        <div className="col-sm-12 col-lg-10 mb-3">
          <label htmlFor="street" className="form-label">Calle*</label>
          <input type="text" className="form-control" name="street" id="street" value={formData.street} onChange={handleInputChange} required/>
        </div>

        <div className="col-sm-12 col-lg-2 mb-3">
          <label htmlFor="numberone" className="form-label">Número exterior*</label>
          <input type="text" className="form-control" name="numberone" id="numberone" value={formData.numberone} onChange={handleInputChange} required/>
        </div>
        <div className="col-sm-12 col-lg-2 mb-3">
          <label htmlFor="numbertwo" className="form-label">Número interior</label>
          <input type="text" className="form-control" name="numbertwo" id="numbertwo" value={formData.numbertwo} onChange={handleInputChange} />
        </div>
        <div className="col-sm-12 col-lg-8 mb-3">
          <label htmlFor="state" className="form-label">Estado*</label>
          <select className="form-select" name="state" id="state" value={formData.state} onChange={handleInputChange} required>
              <option value=""  disabled>Selecciona una opción</option>
              {
                listStates.map( (state: DataState) => (
                    <option key={state.key} value={state.key}>{state.name}</option>
                ))
              }
          </select>
        </div>

        <div className="col-sm-12 col-lg-6 mb-3">
          <label htmlFor="municipality" className="form-label">Delegación / Municipio*</label>
          <input type="text" className="form-control" name="municipality" id="municipality" value={formData.municipality} onChange={handleInputChange} required/>
        </div>
        <div className="col-sm-12 col-lg-6 mb-3">
          <label htmlFor="cologne" className="form-label">Colonia*</label>
          <input type="text" className="form-control" name="cologne" id="cologne" value={formData.cologne} onChange={handleInputChange} required/>
        </div>

        <div className="col-12 text-center mb-3">
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
          
      </form>
  )
}

export default Form;