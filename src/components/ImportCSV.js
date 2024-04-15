import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { Bar } from 'react-chartjs-2';

const CsvReaderComponent = () => {
  const [csvData, setCsvData] = useState([]);

  const handleCsvData = (data) => {
    setCsvData(data);
  };

  const calculateSentimentAverage = () => {
    let posSum = 0, neuSum = 0, negSum = 0;
    let count = 0;

    csvData.forEach((row) => {
      const posVal = parseFloat(row.pos);
      const neuVal = parseFloat(row.neu);
      const negVal = parseFloat(row.neg);

      if (!isNaN(posVal)) {
        posSum += posVal;
      }
      if (!isNaN(neuVal)) {
        neuSum += neuVal;
      }
      if (!isNaN(negVal)) {
        negSum += negVal;
      }
      count++;
    });

    return {
      pos: posSum / count,
      neu: neuSum / count,
      neg: negSum / count
    };
  };

  const chartData = {
    labels: ['Pos', 'Neu', 'Neg'],
    datasets: [
      {
        label: 'Sentiment Average',
        data: Object.values(calculateSentimentAverage()),
        backgroundColor: ['green', 'gray', 'red'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sentiment Average',
      },
    },
  };

  return (
    <div>
      <CSVReader onFileLoaded={handleCsvData} parserOptions={{ header: true }} />
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default CsvReaderComponent;