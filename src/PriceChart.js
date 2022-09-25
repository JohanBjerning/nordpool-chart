import React, { Children } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import happy from './images/happy.png';
import neutral from './images/neutral.png';
import sad from './images/sad.png';

const GetSmiley = (cost) => {
  let image = neutral;

  if (cost > 1.9) {
   image = sad;
  }
  else if (cost < 1) {
    image = happy;
  }
  return image;
}

const CustomizedDot = (props) => {
  const { cx, cy, value } = props;
  const image = GetSmiley(value);

  return (
    <image xlinkHref={image} alt="Mood" x={cx - 10} y={cy - 10} width={20} height={20} />
  );
};

export default function PriceChart({data, fullSize = false}) {
  const chartData = [];
  let current_price;
  const max = data.max;

  const today = data.today;
  const tomorrow = data.tomorrow;

  const nowHour = new Date().getHours();

  today.forEach((element, index) => {
    if(nowHour === index)
      current_price = element;

    index > nowHour - 1 && chartData.push(
      {
        name: `${index}:00`,
        cost: element
      }
    )
  });
  data.tomorrow_valid && tomorrow.forEach((element, index) => {
    chartData.push(
      {
        name: index < 10 ? `0${index}:00` : `${index}:00`,
        cost: element
      }
    )
  });

  return (
    <div className="App" style={{height: fullSize ? '100vh': '', backgroundColor: fullSize ? '#000' : 'unset'}}>
    <div style={{position: 'absolute', right: '50px', top: '30px', fontSize: '22px', color: '#fff'}}>
      Nuvarande pris: {current_price} Kr/kWh <span style={{margin: "10px 10px"}}>
      <img style={{marginBottom: '-10px'}} src={GetSmiley(current_price)} alt="Mood" width={40} /></span>
    </div>
    <ResponsiveContainer width="100%" height="100%">      
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
         <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"  tick={{ fill: 'white' }}  />
        <YAxis  domain={[0, (max)]} tick={{ fill: 'white' }}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cost" name="kr/kWh" stroke="#000" strokeWidth={0} dot={<CustomizedDot />} >
          </Line>
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
}