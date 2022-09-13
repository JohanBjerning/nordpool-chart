import './App.css';
import { useEffect, useState } from 'react';
import PriceChart from './PriceChart';

let api_url = "/netlify/functions/fetchData";

var handleError = function (err) {
  console.warn(err);
  return new Response(JSON.stringify({
      code: 400,
      message: 'Stupid network Error'
  }));
};

function App() {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      const res = await fetch(api_url, requestOptions).catch(handleError);
      const data = await res.json();
      setChartData(data.attributes);
    }
    getData();
  },[])  
  if(!chartData)
    return "Loading..."

  return (
    <div className="App">
        <PriceChart data={chartData} />
    </div>
  );
}

export default App;
