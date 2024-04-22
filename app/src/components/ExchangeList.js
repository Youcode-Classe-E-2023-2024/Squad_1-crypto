import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

function Exchanges() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchExchanges();
    }, []);

    const fetchExchanges = async () => {
        try {
            const response = await axios.get('https://api.coincap.io/v2/exchanges');
            setData(response.data.data);
            console.log(response.data.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const columns = [
        { name: 'Rank', selector: row => row.rank, sortable: true },
        { name: 'ID', selector: row => row.exchangeId, sortable: true }, 
        { name: 'Name', selector: row => row.name, sortable: true }, 
        { name: 'Trading Pairs', selector: row => row.tradingPairs, sortable: true }, 
        { name: 'Updated', selector: row => new Date(row.updated).toLocaleString(), sortable: true }, 
    ];

    const filteredData = data.filter(item =>
        item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );  

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className='flex justify-between py-1'>
                <h2 className="text-2xl mb-4">Exchanges</h2>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                />
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                customStyles={{
                    headRow: { style: { backgroundColor: '#F2F2F2', fontWeight: 'bold' } },
                    headCells: { style: { paddingLeft: '8px', paddingRight: '8px' } },
                    rows: { style: { fontSize: '14px' } },
                }}
            />
        </div>
    );
}

export default Exchanges;
