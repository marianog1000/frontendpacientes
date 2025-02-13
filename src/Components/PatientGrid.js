import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { getHealthHistories, deleteHealthHistory } from '../Services/api';
import '../Styles/PatientGrid.css';
//import jsPDF from 'jspdf';
//import 'jspdf-autotable';

Modal.setAppElement('#root'); // Set the root element for accessibility

const PatientGrid = () => {
    const [healthHistories, setHealthHistories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const recordsPerPage = 20;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHealthHistories();                
                setHealthHistories(data);
            } catch (error) {
                console.error('Error fetching health histories:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const filteredRecords = healthHistories.filter((history) =>
        history.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        history.nro_documento.toString().includes(searchTerm)
    );
    
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAdd = () => {     
        navigate('/add');
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleView = (id) => {
        navigate(`/view/${id}`);
    };

    const openModal = (id) => {
        setSelectedId(id);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedId(null);
        setModalIsOpen(false);
    };

    const handleDelete = async () => {
        try {
            await deleteHealthHistory(selectedId);
            setHealthHistories(healthHistories.filter(history => history.id !== selectedId));
            console.log(`Registro con ID: ${selectedId} eliminado`);
            setConfirmationMessage(`Registro con ID: ${selectedId} eliminado correctamente.`);
            setTimeout(() => {
                setConfirmationMessage('');
            }, 5000); 
            closeModal();
        } catch (error) {
            console.error('Error deleting health history:', error);
        }
    };

    // const handleExportPDF = (id) => {
    //     const history = healthHistories.find(history => history.id === id);
    //     if (!history) return;

    //     const doc = new jsPDF();
    //     doc.text('Historia Clínica', 20, 10);
    //     doc.autoTable({
    //         head: [['Campo', 'Valor']],
    //         body: [
    //             ['ID', history.id],
    //             ['Título', history.titulo],
    //             ['Nro. de Documento', history.nro_documento],
    //             ['Descripción', history.descripcion],
    //             // Agrega otros campos necesarios aquí
    //         ],
    //     });
    //     doc.save(`historia_clinica_${id}.pdf`);
    // };
    
    return (
        <div className="container mx-auto p-4">
            
            <h1 className="text-2xl font-bold mb-4">Pacientes</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por DNI o Título"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-grow p-2 border border-gray-300 rounded mr-2"
                />
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={handleAdd}
                >
                    Agregar
                </button>
            </div>

            
            {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}            

            <div class="container mx-auto p-4">            
            <ul class="responsive-table">
                <li class="table-header">
                <div class="col col-1">Legajo</div>
                <div class="col col-2">Nombre</div>
                <div class="col col-3">DNI</div>
                <div class="col col-4 col-wide">Acciones</div>
                </li>
                {currentRecords.map((history) => (
                    <li class="table-row" key={history.id}>
                    <div class="col col-1" data-label="Legajo">{history.id}</div>
                    <div class="col col-2" data-label="Titulo">{history.titulo}</div>
                    <div class="col col-3" data-label="Nro. de Documento">{history.nro_documento}</div>
                    <div class="col col-4 col-wide" data-label="Acciones">                    
                        <button 
                            className="rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            onClick={() => handleView(history.id)}
                        >Ver</button> 
                        <button 
                            className="rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" 
                            onClick={() => handleEdit(history.id)}
                        >Modificar</button>
                        <button 
                            className="rounded-md bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" 
                            onClick={() => openModal(history.id)}
                        >Eliminar</button>
                        {/* <button className="text-purple-500 hover:text-purple-700 ml-2" onClick={() => handleExportPDF(history.id)}>Exportar PDF</button> */}
                    </div> 
                    </li>
            ))}
            </ul>
            </div>

            <div className="pagination">
            
                <button 
                    onClick={handlePreviousPage} disabled={currentPage === 1}
                    class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Previous
                </button>
                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <span>Page {currentPage} of {totalPages}</span>
                </p>
                <button 
                    onClick={handleNextPage} disabled={currentPage === totalPages}
                    class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Next
                </button>
            
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm Delete"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Confirmar Eliminación</h2>
                <p>¿Estás seguro de que deseas eliminar esta historia clínica?</p>
                <button onClick={handleDelete}>Sí, eliminar</button>
                <button onClick={closeModal}>Cancelar</button>
            </Modal>
        </div>










// <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
//   <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
//     <div class="flex items-center justify-between gap-8 mb-8">
//       <div>
//         <h5
//           class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
//           Members list
//         </h5>
//         <p class="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
//           See information about all members
//         </p>
//       </div>
//       <div class="flex flex-col gap-2 shrink-0 sm:flex-row">
//         <button
//           class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//           type="button">
//           view all
//         </button>
//         <button
//           class="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//           type="button">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
//             stroke-width="2" class="w-4 h-4">
//             <path
//               d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
//             </path>
//           </svg>
//           Add member
//         </button>
//       </div>
//     </div>
//     <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
//       <div class="block w-full overflow-hidden md:w-max">
//         <nav>
//           <ul role="tablist" class="relative flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60">
//             <li role="tab"
//               class="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
//               data-value="all">
//               <div class="z-20 text-inherit">
//                 &nbsp;&nbsp;All&nbsp;&nbsp;
//               </div>
//               <div class="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>
//             </li>
//             <li role="tab"
//               class="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
//               data-value="monitored">
//               <div class="z-20 text-inherit">
//                 &nbsp;&nbsp;Monitored&nbsp;&nbsp;
//               </div>
//             </li>
//             <li role="tab"
//               class="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
//               data-value="unmonitored">
//               <div class="z-20 text-inherit">
//                 &nbsp;&nbsp;Unmonitored&nbsp;&nbsp;
//               </div>
//             </li>
//           </ul>
//         </nav>
//       </div>
//       <div class="w-full md:w-72">
//         <div class="relative h-10 w-full min-w-[200px]">
//           <div class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
//               stroke="currentColor" aria-hidden="true" class="w-5 h-5">
//               <path stroke-linecap="round" stroke-linejoin="round"
//                 d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
//             </svg>
//           </div>
//           <input
//             class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
//             placeholder=" " />
//           <label
//             class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
//             Search
//           </label>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div class="p-6 px-0 overflow-scroll">
//     <table class="w-full mt-4 text-left table-auto min-w-max">
//       <thead>
//         <tr>
//           <th
//             class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
//             <p
//               class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
//               Member
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
//                 stroke="currentColor" aria-hidden="true" class="w-4 h-4">
//                 <path stroke-linecap="round" stroke-linejoin="round"
//                   d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
//               </svg>
//             </p>
//           </th>
//           <th
//             class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
//             <p
//               class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
//               Function
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
//                 stroke="currentColor" aria-hidden="true" class="w-4 h-4">
//                 <path stroke-linecap="round" stroke-linejoin="round"
//                   d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
//               </svg>
//             </p>
//           </th>
//           <th
//             class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
//             <p
//               class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
//               Status
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
//                 stroke="currentColor" aria-hidden="true" class="w-4 h-4">
//                 <path stroke-linecap="round" stroke-linejoin="round"
//                   d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
//               </svg>
//             </p>
//           </th>
//           <th
//             class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
//             <p
//               class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
//               Employed
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
//                 stroke="currentColor" aria-hidden="true" class="w-4 h-4">
//                 <path stroke-linecap="round" stroke-linejoin="round"
//                   d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
//               </svg>
//             </p>
//           </th>
//           <th
//             class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
//             <p
//               class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
//             </p>
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td class="p-4 border-b border-blue-gray-50">
//             <div class="flex items-center gap-3">
//               <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
//                 alt="John Michael" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
//               <div class="flex flex-col">
//                 <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//                   John Michael
//                 </p>
//                 <p
//                   class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
//                   john@creative-tim.com
//                 </p>
//               </div>
//             </div>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <div class="flex flex-col">
//               <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//                 Manager
//               </p>
//               <p
//                 class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
//                 Organization
//               </p>
//             </div>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <div class="w-max">
//               <div
//                 class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
//                 <span class="">online</span>
//               </div>
//             </div>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//               23/04/18
//             </p>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <button
//               class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//               type="button">
//               <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
//                   class="w-4 h-4">
//                   <path
//                     d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
//                   </path>
//                 </svg>
//               </span>
//             </button>
//           </td>
//         </tr>
//         <tr>
//           <td class="p-4 border-b border-blue-gray-50">
//             <div class="flex items-center gap-3">
//               <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg"
//                 alt="Alexa Liras" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
//               <div class="flex flex-col">
//                 <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//                   Alexa Liras
//                 </p>
//                 <p
//                   class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
//                   alexa@creative-tim.com
//                 </p>
//               </div>
//             </div>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <div class="flex flex-col">
//               <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//                 Programator
//               </p>
//               <p
//                 class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
//                 Developer
//               </p>
//             </div>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <div class="w-max">
//               <div
//                 class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
//                 <span class="">offline</span>
//               </div>
//             </div>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//               23/04/18
//             </p>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <button
//               class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//               type="button">
//               <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
//                   class="w-4 h-4">
//                   <path
//                     d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
//                   </path>
//                 </svg>
//               </span>
//             </button>
//           </td>
//         </tr>
//         <tr>
//           <td class="p-4 border-b border-blue-gray-50">
//             <div class="flex items-center gap-3">
//               <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg"
//                 alt="Laurent Perrier"
//                 class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
//               <div class="flex flex-col">
//                 <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//                   Laurent Perrier
//                 </p>
//                 <p
//                   class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
//                   laurent@creative-tim.com
//                 </p>
//               </div>
//             </div>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <div class="flex flex-col">
//               <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//                 Executive
//               </p>
//               <p
//                 class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
//                 Projects
//               </p>
//             </div>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <div class="w-max">
//               <div
//                 class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
//                 <span class="">offline</span>
//               </div>
//             </div>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//               19/09/17
//             </p>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <button
//               class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//               type="button">
//               <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
//                   class="w-4 h-4">
//                   <path
//                     d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
//                   </path>
//                 </svg>
//               </span>
//             </button>
//           </td>
//         </tr>
//         <tr>
//           <td class="p-4 border-b border-blue-gray-50">
//             <div class="flex items-center gap-3">
//               <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg"
//                 alt="Michael Levi" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
//               <div class="flex flex-col">
//                 <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//                   Michael Levi
//                 </p>
//                 <p
//                   class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
//                   michael@creative-tim.com
//                 </p>
//               </div>
//             </div>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <div class="flex flex-col">
//               <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//                 Programator
//               </p>
//               <p
//                 class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
//                 Developer
//               </p>
//             </div>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <div class="w-max">
//               <div
//                 class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
//                 <span class="">online</span>
//               </div>
//             </div>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//               24/12/08
//             </p>
//           </td>
//           <td class="p-4 border-b border-blue-gray-50">
//             <button
//               class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//               type="button">
//               <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
//                   class="w-4 h-4">
//                   <path
//                     d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
//                   </path>
//                 </svg>
//               </span>
//             </button>
//           </td>
//         </tr>
//         <tr>
//           <td class="p-4">
//             <div class="flex items-center gap-3">
//               <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg"
//                 alt="Richard Gran" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
//               <div class="flex flex-col">
//                 <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//                   Richard Gran
//                 </p>
//                 <p
//                   class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
//                   richard@creative-tim.com
//                 </p>
//               </div>
//             </div>
//           </td>
//           <td class="p-4">
//             <div class="flex flex-col">
//               <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//                 Manager
//               </p>
//               <p
//                 class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
//                 Executive
//               </p>
//             </div>
//           </td>
//           <td class="p-4">
//             <div class="w-max">
//               <div
//                 class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
//                 <span class="">offline</span>
//               </div>
//             </div>
//           </td>
//           <td class="p-4">
//             <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//               04/10/21
//             </p>
//           </td>
//           <td class="p-4">
//             <button
//               class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//               type="button">
//               <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
//                   class="w-4 h-4">
//                   <path
//                     d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
//                   </path>
//                 </svg>
//               </span>
//             </button>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
//   <div class="flex items-center justify-between p-4 border-t border-blue-gray-50">
//     <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
//       Page 1 of 10
//     </p>
//     <div class="flex gap-2">
//       <button
//         class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//         type="button">
//         Previous
//       </button>
//       <button
//         class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//         type="button">
//         Next
//       </button>
//     </div>
//   </div>
// </div>


    );
};

export default PatientGrid;