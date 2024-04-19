import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table';
import axios from 'axios';


function Markets() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMarkets();
    }, []);

    const fetchMarkets = async () => {
        try {
            const response = await axios.get('https://api.coincap.io/v2/markets');
            setData(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const columns = [
        {
            name: 'ID',
            selector: 'exchangeId',
            sortable: true,
        },
        {
            name: 'Rank',
            selector: 'rank',
            sortable: true,
        },
        // Define other columns similarly
    ];

    const filteredData = data.filter((item) =>
        item.baseSymbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className='flex justify-between py-1'>
                <h2 className="text-2xl mb-4">Markets</h2>
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
                title="Market Data"
                columns={columns}
                data={filteredData}
                pagination
            />
        </div>
    );
}

export default Markets;
