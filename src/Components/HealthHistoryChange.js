import React, { useEffect, useState } from 'react';
import { getHealthHistoryChanges } from '../Services/api'; 
import { useNavigate } from 'react-router-dom';


const HealthHistoryChange = () => {
    const [healthHistoryChanges, setHealthHistoryChanges] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const recordsPerPage = 20;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHealthHistoryChanges();
                setHealthHistoryChanges(data);
            } catch (error) {
                console.error('Error fetching health history changes:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const filteredRecords = healthHistoryChanges.filter((history) =>
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

    const handleView = (id) => {
        navigate(`/view/${id}`);
    };


    return (
<div className="container mx-auto p-4">
            
            <h1 className="text-2xl font-bold mb-4">Cambios en la Historia Clínica</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por DNI o Título"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-grow p-2 border border-gray-300 rounded mr-2"
                />
            </div>


            <div class="container">            
            <ul class="responsive-table">
                <li class="table-header">
                <div class="col col-1">ID</div>
                <div class="col col-2">HealthHistoryId</div>
                <div class="col col-3">Fecha</div>
                
                </li>
                {healthHistoryChanges.map((change) => (
                    <li class="table-row" key={change.id}>
                    <div class="col col-1" data-label="Id">{change.id}</div>
                    <div class="col col-2" data-label="HealthHistoryId">{change.HealthHistoryId}</div>
                    <div class="col col-3" data-label="Fecha">{change.fecha}</div>
                    <div class="col col-4" data-label="Acciones">                    
                        <button className="text-green-500 hover:text-green-700 ml-2" onClick={() => handleView(change.id)}>Ver</button>                        
                    </div> 
                    </li>
            ))}
            </ul>
            </div>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>










        // <div className="container mx-auto p-4">
        //     <h1 className="text-2xl font-bold mb-4">Cambios en la Historia Clínica</h1>
        //     <table className="min-w-full bg-white">
        //         <thead>
        //             <tr>
        //                 <th className="py-2 px-4 border-b">ID</th>                        
        //                 <th className="py-2 px-4 border-b">HealthHistoryId</th>
        //                 <th className="py-2 px-4 border-b">Fecha</th>
                        
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {healthHistoryChanges.map((change) => (
        //                 <tr key={change.id}>
        //                     <td className="py-2 px-4 border-b">{change.id}</td>
        //                     <td className="py-2 px-4 border-b">{change.HealthHistoryId}</td>
        //                     <td className="py-2 px-4 border-b">{change.date}</td>            
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
    );
};

export default HealthHistoryChange;