import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ExchangeDetails() {
    const { id } = useParams();
    const [exchangeDetails, setExchangeDetails] = useState(null);

    useEffect(() => {
        fetchExchangeDetails();
    }, [id]);

    const fetchExchangeDetails = async () => {
        try {
            const response = await axios.get(`https://api.coincap.io/v2/exchanges/${id}`);
            setExchangeDetails(response.data.data);
        } catch (error) {
            console.error('Error fetching exchange details:', error);
        }
    };

    if (!exchangeDetails) {
        return <div className="flex justify-center items-center h-screen"><div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div></div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-4">{exchangeDetails.name}</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <p className="font-semibold">ID:</p>
                    <p>{exchangeDetails.exchangeId}</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <p className="font-semibold">Rank:</p>
                    <p>{exchangeDetails.rank}</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <p className="font-semibold">Percentage of Total Volume:</p>
                    <p>{exchangeDetails.percentTotalVolume}%</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <p className="font-semibold">Volume (USD):</p>
                    <p>{exchangeDetails.volumeUsd}</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <p className="font-semibold">Trading Pairs:</p>
                    <p>{exchangeDetails.tradingPairs}</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <p className="font-semibold">Socket:</p>
                    <p>{exchangeDetails.socket ? 'Enabled' : 'Disabled'}</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg col-span-2">
                    <p className="font-semibold">Exchange URL:</p>
                    <a href={exchangeDetails.exchangeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{exchangeDetails.exchangeUrl}</a>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg col-span-2">
                    <p className="font-semibold">Last Updated:</p>
                    <p>{new Date(exchangeDetails.updated).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}

export default ExchangeDetails;