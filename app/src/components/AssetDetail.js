import React, { Component } from "react";
import { Line } from "react-chartjs-2";


class AssetDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            asset: null, 
            chartData: {}
        }
    }

    componentDidMount(){
        fetch('https://api.coincap.io/v2/assets/bitcoin')
            .then(response => response.json())
            .then(res => this.setState({asset: res.data})) 
            .catch(error => console.error('Error fetching data:', error));

        this.fetchChartData(); 
    }


    fetchChartData = () => {
        fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=d1")
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch historical data');
            }
            return response.json();
          })
          .then(data => {
            console.log("Data received:", data); // Log the data received from the API
            if (!data || !Array.isArray(data.data)) {
              throw new Error('Invalid data structure');
            }
    
            // Map over the data to create arrays for prices and timestamps
            const prices = data.data.map(item => item.priceUsd);
            const timestamps = data.data.map(item => new Date(item.time)); // Convert timestamps to Date objects
    
            // Update the state with the chart data
            this.setState({
              chartData: {
                labels: timestamps,
                datasets: [
                  {
                    label: "Bitcoin Price (USD)",
                    data: prices,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1
                  }
                ]
              }
            });
          })
          .catch(error => console.error("Error fetching chart data:", error));
    };
    
    
    render(){
        const { asset, chartData } = this.state;

        return(
            <div className="Asset">
                {asset && chartData && ( 
                    <div className=" bg-blue-100 w-full h-screen px-40 pt-11">
                        
                            <div class="col-span-12" id="user">
                                <div class="grid gap-2 grid-cols-1 lg:grid-cols-1">
                                    <div class="bg-white p-4 shadow-lg rounded-lg">
                                        <h1 class="font-bold text-base">Table detailx</h1>
                                        <div class="mt-4">
                                            <div class="flex flex-col">
                                                <div class="-my-2 overflow-x-auto">
                                                    <div class="py-2 align-middle inline-block min-w-full">
                                                        <div
                                                            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                                                            <table class="min-w-full divide-y divide-gray-200">
                                                                <thead>
                                                                    <tr>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">rank</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">id</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">symbol</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">name</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">supply</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">maxSupply</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">marketCapUsd</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">volumeUsd24Hr</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">priceUsd</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">changePercent24Hr</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">vwap24Hr</span>
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody class="bg-white divide-y divide-gray-200">
                                                                    <tr>
                                                                        <td
                                                                            class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                            <p> {asset.id} </p>  
                                                                        </td>
                                                                        <td
                                                                            class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                            <p> {asset.rank} </p>
                                                                        </td>
                                                                        <td
                                                                            class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                            <div class="flex text-green-500">
                                                                                <p> {asset.symbol} </p>
                                                                            </div>
                                                                        </td>
                                                                        <td
                                                                            class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                            <p> {asset.name} </p> 
                                                                        </td>
                                                                        <td
                                                                            class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                            <p> {asset.supply} </p> 
                                                                        </td>
                                                                        <td
                                                                            class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                            <p> {asset.maxSupply} </p> 
                                                                        </td>
                                                                        <td
                                                                            class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                            <p> {asset.marketCapUsd} </p> 
                                                                        </td>
                                                                        <td
                                                                            class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                            <p> {asset.volumeUsd24Hr} </p> 
                                                                        </td>
                                                                        <td
                                                                            class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                            <p> {asset.priceUsd} </p> 
                                                                        </td>
                                                                        <td
                                                                            class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                            <p> {asset.changePercent24Hr} </p> 
                                                                        </td>
                                                                        <td
                                                                            class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                            <p> {asset.vwap24Hr} </p> 
                                                                        </td>
                                                                        
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <Line
                              data={this.state.chartData}
                              options={{
                                scales: {
                                  x: {
                                    type: 'time', // Specify the type of scale for the x-axis
                                    time: {
                                      tooltipFormat: 'll', // Format for the tooltip
                                    },
                                    title: {
                                      display: true,
                                      text: 'Time', // Label for the x-axis
                                    },
                                  },
                                  y: {
                                    title: {
                                      display: true,
                                      text: 'Price (USD)', // Label for the y-axis
                                    },
                                  },
                                },
                                plugins: {
                                  legend: {
                                    display: true,
                                    position: 'bottom',
                                  },
                                },
                                interaction: {
                                  mode: 'index',
                                  intersect: false,
                                },
                                responsive: true,
                              }}
                            />
                        
                    </div>
                )}

                
            </div>
        );
    };
}

export default AssetDetail; 
