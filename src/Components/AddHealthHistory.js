import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHealthHistory } from '../Services/api';
import { Tabs, Tab } from 'react-bootstrap';
import {enfermedades_concurrentes, sensopersepcion, afectividad, sueno} from '../Constants/Config.js'


const AddHealthHistory = () => {
    const [newHistory, setNewHistory] = useState({
        titulo: '',
        nro_documento: '',
        actitud_psiquica: '',
        actividad: '',
        afectividad: '',
        afiliado_nro: '',
        antecedentes_clinicos_y_quirurgicos: '',
        antecedentes_personales_personalidad_previa_escolaridad: '',
        aspecto_psiquico: '',
        atencion: '',
        conciencia: '',
        contenido_del_Pensamiento: '',
        control_esfinteres: '',
        curso_del_pensamiento: '',
        diagnostico_cie10_dsm_iv: '',
        domicilio: '',
        domicilio_parentesco: '',
        edad: '',
        enfermedad_actual: '',
        enfermedades_concurrentes: '',
        esta_tomando_alguna_medicacion: '',
        estado_civil: '',
        evolucion: '',
        familiar_responsable_legal: '',
        fecha_ingreso: '',
        grupo_familiar_actual_antecedentes_familiares_vivienda: '',
        ideacion: '',
        inteligencia: '',
        juicio: '',
        lenguaje: '',
        memoria: '',
        motivo_de_consulta: '',
        nombre: '',
        obra_social: '',
        ocupacion_actual: '',
        ocupaciones_previas: '',
        orientacion: '',
        parentesco: '',
        sensopersepcion: '',
        sueno: '',
        telefono: '',
        telefono_parentesco: '',
        tipo_consulta: '',
        tratamientos_psiquiatricospsicologicos_previos: ''        
    });
    const [selectedButton, setSelectedButton] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (type === "checkbox") {

        setNewHistory((prev) => {

          let propertyToUpdate = null;

          if (enfermedades_concurrentes.includes(name)) {
            propertyToUpdate = "enfermedades_concurrentes";
          } else if (sensopersepcion.includes(name)) {
            propertyToUpdate = "sensopersepcion";
          } else if (afectividad.includes(name)) {
            propertyToUpdate = "afectividad";
          } else if (sueno.includes(name)) {
            propertyToUpdate = "sueno";
          }

          if (!propertyToUpdate) return prev;

           let currentValue = prev[propertyToUpdate] || ""; 
           let updatedArray = currentValue ? currentValue.split(",") : [];

           console.log(`Before Update: ${propertyToUpdate} ->`, updatedArray);

            if (checked) {
              if (!updatedArray.some((item) => item === name)) {
                updatedArray.push(name);
              }
            } else {
              updatedArray = updatedArray.filter((item) => item !== name);
            }
            console.log(`After Update: ${propertyToUpdate} ->`, updatedArray);          
          
          return {
            ...prev,
            [propertyToUpdate]: updatedArray.length > 0 ? updatedArray.join(",") : "",
          };
          
        });
      } else {
        
        setNewHistory((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addedHistory = await addHealthHistory(newHistory);
            console.log('Nuevo registro agregado:', addedHistory);
            navigate('/patients'); 
        } catch (error) {
            console.error('Error adding new record:', error);
        }
    };    

    const handleCancel = () => {
        navigate(-1);
    };

    const handleButtonClick = (tipo) => {
      setNewHistory({ ...newHistory, tipo_consulta: tipo });
      setSelectedButton(tipo);
    };

    return (
        <div>
         <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Nueva Historia Clínica</h1>

            <form onSubmit={handleSubmit}>

            <Tabs defaultActiveKey="general" id="health-history-tabs" className="mb-3">
            <Tab eventKey="datos_personales" title="Datos Personales">
                <div className="flex flex-wrap">


                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="base-input" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Tipo de Consulta</label>

                        <button 
                          type="button"
                          className={`rounded-md py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 ${selectedButton === 'Urgencia' ? 'bg-blue-500 text-white' : 'bg-white-500 text-black'}`}
                          onClick={() => handleButtonClick('Urgencia')}
                        >Urgencia</button> 
                        <button        
                          type="button"           
                          className={`rounded-md py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 ${selectedButton === 'Programada' ? 'bg-blue-500 text-white' : 'bg-white-500 text-black'}`}
                          onClick={() => handleButtonClick('Programada')}
                        >Programada</button> 
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap">
                  <div className="w-full p-2">
                      <div className="mb-5">
                          <label 
                            htmlFor="base-input" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Nombre</label>
                          <input 
                            type="text" 
                            name="titulo" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={newHistory.titulo} onChange={handleChange} required />                            
                      </div>
                  </div> 

                  <div className="w-full md:w-1/2 p-2">
                      <div className="mb-5">
                          <label 
                            htmlFor="base-input" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Nro. de Documento</label>
                          <input 
                            type="text" 
                            name="nro_documento" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={newHistory.nro_documento} onChange={handleChange} />                            
                      </div>
                  </div>


                  <div className="w-full md:w-1/2 p-2">
                       <div className="mb-5">
                          <label 
                            htmlFor="base-input" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Fecha de Ingreso</label>


                          <input 
                            type="date" 
                            name="fecha_ingreso" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={newHistory.fecha_ingreso} onChange={handleChange} 
                          />
                      </div> 
                  </div>

                  <div className="w-full md:w-1/2 p-2">
                      <div className="mb-5">
                          <label 
                            htmlFor="base-input" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Obra Social</label>
                          <input 
                            type="text" 
                            name="obra_social" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={newHistory.obra_social} onChange={handleChange} />                            
                      </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                      <div className="mb-5">
                          <label 
                            htmlFor="base-input" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Edad</label>
                          <input 
                            type="text" 
                            name="edad" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={newHistory.edad} onChange={handleChange} />                            
                      </div>                  

                  </div>


                  <div className="w-full md:w-1/2 p-2">

                      <div className="mb-5">
                          <label 
                            htmlFor="base-input" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Afiliado Nro.</label>
                          <input 
                            type="text" 
                            name="afiliado_nro" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={newHistory.afiliado_nro} onChange={handleChange} />                            
                      </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">   
                      <div className="mb-5">
                          <label 
                            htmlFor="base-input" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Fecha de Nacimiento</label>
                          <input 
                            type="date" 
                            name="fecha_de_nacimiento" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={newHistory.fecha_de_nacimiento} onChange={handleChange} />                            
                      </div>
                  </div>

                  <div className="w-full md:w-1/2 p-2">

                      <div className="mb-5">
                          <label 
                            htmlFor="base-input" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Estado Civil</label>
                          <select 
                            id="estado_civil" 
                            name="estado_civil"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newHistory.estado_civil || ""}
                            onChange={handleChange}
                          >
                            <option value="">Seleccione</option>
                            <option value="SOLTERO">Soltero</option>
                            <option value="CASADO">Casado</option>
                            <option value="DIVORCIADO">Divorciado</option>
                            <option value="CONCUBINO">Concubino</option>
                            <option value="VIUDO">Viudo</option>
                          </select>
                      </div>
                  </div>

                  <div className="w-full p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="base-input" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Ocupación Actual</label>
                        <input 
                          type="text" 
                          name="ocupacion_actual" 
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          value={newHistory.ocupacion_actual} onChange={handleChange} />                            
                    </div>
                    <div className="mb-5">
                        <label 
                          htmlFor="base-input" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Ocupaciones Previas</label>
                        <input 
                          type="text" 
                          name="ocupaciones_previas" 
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          value={newHistory.ocupaciones_previas} onChange={handleChange} />                            
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Domicilio</label>
                      <input 
                        type="text" 
                        name="domicilio" 
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={newHistory.domicilio} onChange={handleChange} />                            
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="base-input" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Teléfono</label>
                        <input 
                          type="text" 
                          name="telefono" 
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          value={newHistory.telefono} onChange={handleChange} />                            
                    </div>
                  </div>
                
                  <div className="w-full p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="base-input" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Familiar Responsable Legal</label>
                        <input 
                          type="text" 
                          name="familiar_responsable_legal" 
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          value={newHistory.familiar_responsable_legal} onChange={handleChange} />                            
                    </div>
                    <div className="mb-5">
                        <label 
                          htmlFor="base-input" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Parentesco</label>
                        <input 
                          type="text" 
                          name="parentesco" 
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          value={newHistory.parentesco} onChange={handleChange} />                            
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Domicilio Parentesco</label>
                      <input 
                        type="text" 
                        name="domicilio_parentesco" 
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={newHistory.domicilio_parentesco} onChange={handleChange} />                            
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="base-input" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Teléfono Parentesco</label>
                        <input 
                          type="text" 
                          name="telefono_parentesco" 
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          value={newHistory.telefono_parentesco} onChange={handleChange} />                            
                    </div>
                  </div>
                </div>


            </Tab>
            <Tab eventKey="antecedentes_examen_fisico" title="Antecedentes y Examen Físico">


              <div className="w-full p-2">
                <div className="mb-5">
                    <label 
                      htmlFor="base-input" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Motivo de Consulta</label>
                    <textarea 
                      name="motivo_de_consulta" 
                      cols="40" 
                      rows="5" 
                      value={newHistory.motivo_de_consulta} 
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                    </textarea>

                </div>
                <div className="mb-5">
                    <label 
                      htmlFor="base-input" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Enfermedad Actual</label>
                    <textarea 
                      name="enfermedad_actual" 
                      cols="40" 
                      rows="5" 
                      value={newHistory.enfermedad_actual} 
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    ></textarea>
                </div>


                <div className="mb-5">
                    <label 
                      htmlFor="base-input" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Enfermedades Concurrentes</label>


                    <div className="flex flex-wrap">                    
                        {enfermedades_concurrentes.map((enfermedad) => (
                          <div key={enfermedad} className="flex items-center mr-4 mb-2">
                            <input
                              id={`${enfermedad.toLowerCase()}_checkbox`}
                              type="checkbox"
                              name={enfermedad}                              
                              checked={newHistory.enfermedades_concurrentes
                                ? newHistory.enfermedades_concurrentes.split(",").includes(enfermedad)
                                : false
                              }
                              onChange={handleChange}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />                            
                            <label
                              htmlFor={`${enfermedad.toLowerCase()}_checkbox`}
                              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {enfermedad}
                            </label>
                          </div>
                        ))}
                      </div>
                </div>

                <div className="mb-5">
                    <label 
                      htmlFor="base-input" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Antecedentes Clínicos y Quirúrgicos</label>
                    <input 
                          type="text" 
                          name="antecedentes_clinicos_y_quirurgicos" 
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          value={newHistory.antecedentes_clinicos_y_quirurgicos} onChange={handleChange} /> 
                </div>

                <div className="mb-5">
                    <label 
                      htmlFor="base-input" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Tratamiento Psicologicos y Psiquiatricos Previos</label>
                    <input 
                      type="text" 
                      name="tratamientos_psiquiatricospsicologicos_previos" 
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      value={newHistory.tratamientos_psiquiatricospsicologicos_previos} onChange={handleChange} /> 
                </div>
                <div className="mb-5">
                    <label 
                      htmlFor="base-input" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >¿Está tomando alguna medicación?</label>
                    <input 
                      type="text" 
                      name="esta_tomando_alguna_medicacion" 
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      value={newHistory.esta_tomando_alguna_medicacion} onChange={handleChange} /> 
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                    <label 
                      htmlFor="base-input" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Aspecto Psiquico</label>

                    <select 
                      id="aspecto_psiquico" 
                      name="aspecto_psiquico" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={newHistory.aspecto_psiquico} 
                      onChange={handleChange}
                    >
                      <option value="">Seleccione</option>
                      <option value="NORMAL">Normal</option>
                      <option value="EXCITADO">Excitado</option>
                      <option value="DEPRIMIDO">Deprimido</option>
                      <option value="INDIFERENTE">Indiferente</option>
                      <option value="OBNUBILADO">Obnubilado</option>
                      <option value="FUERA_DE_CONTEXTO">Fuera de Contexto</option>
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Actitud Psiquica</label>

                      <select 
                        id="actitud_psiquica" 
                        name="actitud_psiquica" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.actitud_psiquica} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="POSITIVA">Positiva</option>
                        <option value="NEGATIVA">Negativa</option>
                        <option value="NO_PARTICIPA">No Participa</option>
                        <option value="RECELOSA">Recelosa</option>
                        <option value="PENOSA">Penosa</option>
                        <option value="INQUIETUD">Inquietud</option>
                        <option value="DESORDENADA">Desordenada</option>
                        <option value="AGRESIVA">Agresiva</option>
                      </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Actividad</label>

                      <select 
                        id="actividad" 
                        name="actividad" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.actividad} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="NORMAL">Normal</option>
                        <option value="HIPERBULIA_PRODUCTIVA">Hiperbulia Productiva</option>
                        <option value="HIPERBULIA_IMPRODUCTIVA">Hiperbulia Improductiva</option>
                        <option value="HIPOBULIA">Hipobulia</option>
                        <option value="ABULIA">Abulia</option>
                        <option value="FUGAS">Fugas</option>
                        <option value="POSTRACION">Postración</option>                        
                      </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Orientación</label>

                      <select 
                        id="orientacion" 
                        name="orientacion" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.orientacion} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="NORMAL">Normal</option>
                        <option value="DESORIENTACION_AUTOPSIQUICA">Desorientación Autopsíquica</option>
                        <option value="DESORIENTACION_ALOPSIQUICA">Desorientación Alopsíquica</option>
                        <option value="DESORIENTACION_GLOBAL">Desorientación Global</option>
                        <option value="CONTINUA">Continua</option>
                        <option value="EPISODICA">Episódica</option>
                        
                      </select>                      
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Conciencia</label>

                      <select 
                        id="conciencia" 
                        name="conciencia" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.conciencia} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="CONOCE_ENFERMEDAD_Y_SITUACION">Conoce Enfermedad y Situación</option>
                        <option value="NO_CONOCE_ENFERMEDAD">No Conoce Enfermedad</option>
                        <option value="NO_CONOCE_SITUACION">No Conoce Situación</option>
                        <option value="SIN_CONCIENCIA_REALIDAD">Sin conciencia de la Realidad Circundante</option>
                        <option value="OBNUBILADO">Obnubilado</option>
                        <option value="PRECOMA">Precoma</option>
                        <option value="COMA">Coma</option>
                        
                      </select>
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Memoria</label>

                      <select 
                        id="memoria" 
                        name="memoria" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.memoria} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="NORMAL">Normal</option>
                        <option value="HIPOMNESIA_ANTEROGRADA">Hipomnesia Anterógrada</option>
                        <option value="HIPOMNESIA_RETROGRADA">Hipomnesia Retrógrada</option>
                        <option value="AMNESIA_LACUNARIA">Amnesia Lacunaria</option>
                        <option value="AMNESIA_GLOBAL">Amnesia Global</option>
                        <option value="ILUSIONES_Y_ALUCINACIONES">Ilusiones y Alucinaciones de la Memoria</option>
                        <option value="FALSOS_RECONOCIMIENTOS">Falsos Reconocimientos</option>
                        <option value="MITOMANIA_Y_FABULACION">Mitomanía y Fabulación</option>
                        <option value="PARMNESIAS">Paramnesias</option>
                        <option value="REGRESIONES">Regresiones</option>
                        
                      </select>              
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Atención</label>

                      <select 
                        id="atencion" 
                        name="atencion" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.atencion} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="NORMAL">Normal</option>
                        <option value="HIPOPROSEXIA_VOUNTARIA">Hipoprosexia voluntaria</option>
                        <option value="PARAPROXESIA">Paraproxesia</option>
                        <option value="HIPERPROXESIA">Hiperproxesia</option>
                        <option value="DISPERSION_ATENCION">Dispersión de la atención</option>
                        <option value="APROPEXIA">Apropexia</option>
                      </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Ideación</label>

                      <select 
                        id="ideacion" 
                        name="ideacion" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.ideacion} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="NORMAL">Normal</option>
                        <option value="ESCEPTICA">Escéptica</option>
                        <option value="PESIMISTA">Pesimista</option>
                        <option value="DECEPCIONADA">Decepcionada</option>
                        <option value="ABANDONO">Abandono_ruina_recriminacion</option>
                        <option value="GRANDEZA">Grandeza(posibles)</option>
                        <option value="MEGALOMANIA">Megalomanía(imposibles)</option>
                        <option value="PERSECUTORIAS">Persecutorias</option>
                        <option value="REFERENCIA">Referencia</option>
                        <option value="OBSESIVAS">Obsesivas-fijas</option>
                        <option value="DELIRANTES">Delirantes</option>
                        
                      </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Curso del Pensamiento</label>

                      <select 
                        id="curso_del_pensamiento" 
                        name="curso_del_pensamiento" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.curso_del_pensamiento} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="NORMAL">Normal</option>
                        <option value="ACELERADO">Acelerado</option>
                        <option value="RETARDADO">Retardado</option>
                        <option value="INTERCEPTADO">Interceptado</option>
                        <option value="DISGREGADO">Disgregado</option>
                      </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Contenido del Pensamiento</label>

                      <select 
                        id="contenido_del_pensamiento" 
                        name="contenido_del_pensamiento" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.contenido_del_pensamiento} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="COHERENTE">Coherente</option>
                        <option value="INCOHERENTE">Incoherente</option>
                        <option value="EXPANSIVO">Expansivo</option>
                        <option value="DEPRESIVO">Depresivo</option>
                        <option value="AUTOELIMINACION">Contenidos de Autoeliminación</option>
                        <option value="DELIRANTE">Delirante</option>
                      </select>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                  <label 
                    htmlFor="base-input" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Sensopersepción</label>

                  <div className="flex flex-wrap">                    
                      {sensopersepcion.map((enfermedad) => (
                        <div key={enfermedad} className="flex items-center mr-4 mb-2">
                          <input
                            id={`${enfermedad.toLowerCase()}_checkbox`}
                            type="checkbox"
                            name={enfermedad}
                            checked={newHistory.sensopersepcion
                              ? newHistory.sensopersepcion.split(",").includes(enfermedad)
                              : false
                            }
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />                            
                          <label
                            htmlFor={`${enfermedad.toLowerCase()}_checkbox`}
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {enfermedad}
                          </label>
                        </div>
                      ))}
                    </div>
              </div>

              <div className="mb-5">
                  <label 
                    htmlFor="base-input" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Afectividad</label>

                    <div className="flex flex-wrap">
                      {afectividad.map((enfermedad) => (
                        <div key={enfermedad} className="flex items-center mr-4 mb-2">
                          <input
                            id={`${enfermedad.toLowerCase()}_checkbox`}
                            type="checkbox"
                            name={enfermedad}                              
                            checked={newHistory.afectividad
                              ? newHistory.afectividad.split(",").includes(enfermedad)
                              : false
                            }
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />                            
                          <label
                            htmlFor={`${enfermedad.toLowerCase()}_checkbox`}
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {enfermedad}
                          </label>
                        </div>
                      ))}
                    </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Inteligencia</label>

                      <select 
                        id="inteligencia" 
                        name="inteligencia" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.inteligencia} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="NORMAL">Normal</option>
                        <option value="INFERIOR">Inferior</option>
                        <option value="MARCADO_DEFICIT">Marcado Deficit</option>
                        
                      </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Juicio</label>

                      <select 
                        id="juicio" 
                        name="juicio" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.juicio} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="NORMAL">Normal</option>
                        <option value="INSUFICIENTE">Insuficiente</option>
                        <option value="DEBILITADO">Debilitado</option>
                        <option value="SUSPENDIDO">Suspendido</option>
                        <option value="CATATIMICO">Catatímico</option>
                        <option value="DESVIACIONES">Desviaciones</option>
                        <option value="PERVERSIONES">Perversiones</option>                        
                      </select>
                  </div>
                </div>
              </div>


              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Control de Esfinteres</label>

                      <select 
                        id="control_esfinteres" 
                        name="control_esfinteres" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.control_esfinteres} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="NORMAL">Normal</option>
                        <option value="VESICAL">Incontinencia Vesical</option>
                        <option value="RECTAL">Incontinencia Rectal</option>
                        <option value="VESICO_RECTAL">Incontinencia Vésico-Rectal</option>
                        
                      </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Lenguaje</label>

                      <select 
                        id="lenguaje" 
                        name="lenguaje" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newHistory.lenguaje} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="NORMAL">Normal</option>
                        <option value="MUTISMO">Mutismo</option>
                        <option value="MUSITACION">Musitación</option>
                        <option value="DISARTRIA">Disartria</option>
                        <option value="TAQUILALIA">Taquilalia</option>
                        <option value="BRADILALIA">Bradilalia</option>
                        <option value="VERBIGERACION">Verbigeración</option>
                        <option value="DISFEMIA">Disfemia</option>
                        <option value="ALTERACIONES_SEMANTICAS">Alteraciones Semánticas</option>
                        <option value="NEOLOGISMOS">Neologismos</option>
                        <option value="JERGONAFASIA">Jergonafasia</option>
                      </select>
                  </div>
                </div>
              </div>


              <div className="mb-5">
                <label 
                  htmlFor="base-input" 
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Sueño</label>

                  <div className="flex flex-wrap">
                    {sueno.map((enfermedad) => (
                      <div key={enfermedad} className="flex items-center mr-4 mb-2">
                        <input
                          id={`${enfermedad.toLowerCase()}_checkbox`}
                          type="checkbox"
                          name={enfermedad}                              
                          checked={newHistory.sueno
                            ? newHistory.sueno.split(",").includes(enfermedad)
                            : false
                          }
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />                            
                        <label
                          htmlFor={`${enfermedad.toLowerCase()}_checkbox`}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {enfermedad}
                        </label>
                      </div>
                    ))}
                  </div>
              </div>


            </Tab>
            <Tab eventKey="diagnostico_tratamiento" title="Diagnóstico y Tratamiento">


              <div className="w-full p-2">
                <div className="mb-5">
                    <label 
                      htmlFor="base-input" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Diagnostico CIE10 DSM IV</label>
                    <textarea 
                      name="diagnostico_cie10_dsm_iv" 
                      cols="40" 
                      rows="5" 
                      value={newHistory.diagnostico_cie10_dsm_iv} 
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                    </textarea>

                </div>
              </div>

              <div className="w-full p-2">
                <div className="mb-5">
                    <label 
                      htmlFor="base-input" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Antecedentes personales personalidad previa escolaridad</label>
                    <textarea 
                      name="antecedentes_personales_personalidad_previa_escolaridad" 
                      cols="40" 
                      rows="5" 
                      value={newHistory.antecedentes_personales_personalidad_previa_escolaridad} 
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                    </textarea>

                </div>
              </div>

              <div className="w-full p-2">
                <div className="mb-5">
                    <label 
                      htmlFor="base-input" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Grupo familiar actual antecedentes familiares vivienda</label>
                    <textarea 
                      name="grupo_familiar_actual_antecedentes_familiares_vivienda" 
                      cols="40" 
                      rows="5" 
                      value={newHistory.grupo_familiar_actual_antecedentes_familiares_vivienda} 
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                    </textarea>

                </div>
              </div>
              <div className="w-full p-2">
                <div className="mb-5">
                    <label 
                      htmlFor="base-input" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Evolución</label>
                    <textarea 
                      name="evolucion" 
                      cols="40" 
                      rows="5" 
                      value={newHistory.evolucion} 
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                    </textarea>

                </div>
              </div>

                    <button 
                      type="submit"                      
                      className="rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                    >Agregar</button>
                    <button 
                      type="button" 
                      className="rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                      onClick={handleCancel}
                    >Cancelar</button>
            </Tab>
            </Tabs>
            </form>
        </div>
      </div>  
    );
};

export default AddHealthHistory;