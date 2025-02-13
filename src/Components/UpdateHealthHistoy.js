import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHealthHistoryById, updateHealthHistory } from '../Services/api';

const UpdateHealthHistory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [history, setHistory] = useState({
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

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHealthHistoryById(id);
                setHistory(data);
            } catch (error) {
                console.error('Error fetching health history:', error);
            }
        };

        fetchHistory();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHistory({ ...history, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateHealthHistory(id, history);
            console.log('Registro actualizado:', history);
            navigate('/patients');
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    const handleCancel = () => {
         navigate(-1); // Volver a la página anterior
   };

    return (
        <div>
            <h1>Editar Registro</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input type="text" name="titulo" value={history.titulo} onChange={handleChange} />
                </label>
                <br />
                <label>
                    DNI:
                    <input type="text" name="nro_documento" value={history.nro_documento} onChange={handleChange}  />
                </label>
                <br />
                <label>
                   Tipo de Consulta:
                    <input type="text" name="tipo_consulta" value={history.tipo_consulta} onChange={handleChange}  />
                </label>
                <br />
                <label>
                   Fecha_ingreso:
                    <input type="date" name="fecha_ingreso" value={history.fecha_ingreso} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Obra Social:
                    <input type="text" name="obra_social" value={history.obra_social} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Afiliado Nro:
                    <input type="text" name="afiliado_nro" value={history.afiliado_nro} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Edad:
                    <input type="text" name="edad" value={history.edad} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Fecha de Nacimiento:
                    <input type="date" name="fecha_de_nacimiento" value={history.fecha_de_nacimiento} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Estado Civil:
                    <input type="text" name="estado_civil" value={history.estado_civil} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Ocupacion Actual:
                    <input type="text" name="ocupacion_actual" value={history.ocupacion_actual} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Ocupaciones Previas:
                    <input type="text" name="ocupaciones_previas" value={history.ocupaciones_previas} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Domicilio:
                    <input type="text" name="domicilio" value={history.domicilio} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Telefono:
                    <input type="text" name="telefono" value={history.telefono} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Familiar Responsable Legal:
                    <input type="text" name="familiar_responsable_legal" value={history.familiar_responsable_legal} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Parentesco:
                    <input type="text" name="parentesco" value={history.parentesco} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Domicilio Parentesco:
                    <input type="text" name="domicilio_parentesco" value={history.domicilio_parentesco} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Telefono Parentesco:
                    <input type="text" name="telefono_parentesco" value={history.telefono_parentesco} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Motivo de Consulta:
                    <textarea name="motivo_de_consulta" cols="40" rows="10" value={history.motivo_de_consulta} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                  Enfermedad Actual:                    
                    <textarea name="enfermedad_actual" cols="40" rows="10" value={history.enfermedad_actual} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                  Enfermedades_concurrentes:
                    <textarea name="enfermedades_concurrentes" cols="40" rows="10" value={history.enfermedades_concurrentes} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                  Antecedentes_clinicos_y_quirurgicos:
                    <textarea name="antecedentes_clinicos_y_quirurgicos" cols="40" rows="10" value={history.antecedentes_clinicos_y_quirurgicos} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                  Tratamientos Psiquiatricos Psicologicos Previos:                    
                    <textarea name="tratamientos_psiquiatricospsicologicos_previos" cols="40" rows="10" value={history.tratamientos_psiquiatricospsicologicos_previos} onChange={handleChange}></textarea>
                 </label>
                <br />
                <label>
                  Está tomando alguna medicación:                    
                    <textarea name="esta_tomando_alguna_medicacion" cols="40" rows="10" value={history.esta_tomando_alguna_medicacion} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                  Aspecto Psiquico:                    
                    <textarea name="aspecto_psiquico" cols="40" rows="10" value={history.aspecto_psiquico} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                  Actitud Psiquica:                    
                    <textarea name="actitud_psiquica" cols="40" rows="10" value={history.actitud_psiquica} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                  Actividad:                    
                    <textarea name="actividad" cols="40" rows="10" value={history.actividad} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                  Orientación:                    
                    <textarea name="orientacion" cols="40" rows="10" value={history.orientacion} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                  Conciencia:
                    <input type="text" name="conciencia" value={history.conciencia} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Memoria:
                    <input type="text" name="memoria" value={history.memoria} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Atención:
                    <input type="text" name="atencion" value={history.atencion} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Ideacion:
                    <input type="text" name="ideacion" value={history.ideacion} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Curso del Pensamiento:
                    <input type="text" name="curso_del_pensamiento" value={history.curso_del_pensamiento} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Contenido del Pensamiento:
                    <input type="text" name="contenido_del_Pensamiento" value={history.contenido_del_Pensamiento} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Sensopersepción:
                    <input type="text" name="sensopersepcion" value={history.sensopersepcion} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Afectividad:
                    <input type="text" name="afectividad" value={history.afectividad} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Inteligencia:
                    <input type="text" name="inteligencia" value={history.inteligencia} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Juicio:
                    <input type="text" name="juicio" value={history.juicio} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Control de Esfinteres:
                    <input type="text" name="control_esfinteres" value={history.control_esfinteres} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Lenguaje:
                    <input type="text" name="lenguaje" value={history.lenguaje} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Sueño:
                    <input type="text" name="sueno" value={history.sueno} onChange={handleChange}  />
                </label>
                <br />
                <label>
                  Diagnostico cie10 dsm iv:                    
                    <textarea name="diagnostico_cie10_dsm_iv" cols="40" rows="10" value={history.diagnostico_cie10_dsm_iv} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                  Antecedentes personales personalidad previa escolaridad:                    
                    <textarea name="antecedentes_personales_personalidad_previa_escolaridad" cols="40" rows="10" value={history.antecedentes_personales_personalidad_previa_escolaridad} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                  Grupo familiar actual antecedentes familiares vivienda:                    
                    <textarea name="grupo_familiar_actual_antecedentes_familiares_vivienda" cols="40" rows="10" value={history.grupo_familiar_actual_antecedentes_familiares_vivienda} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                  Evolucion:                    
                    <textarea name="evolucion" cols="40" rows="10" value={history.evolucion} onChange={handleChange}></textarea>
                </label>
                <br />
                
                <button type="submit">Actualizar</button>
                <button type="button" onClick={handleCancel}>Cancelar</button>      
            </form>
        </div>
    );
};

export default UpdateHealthHistory;