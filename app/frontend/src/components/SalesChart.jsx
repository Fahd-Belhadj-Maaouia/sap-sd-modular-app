import React, { useState, useEffect, useMemo } from 'react';
import { BarChart } from '@ui5/webcomponents-react-charts/BarChart';
import { Card, CardHeader } from '@ui5/webcomponents-react';
import { fetchSalesChartData } from '../services/capService';



const SalesChart = () => {

  const [periodType, setPeriodType] = useState('month'); // State to track 'month' or 'quarter'
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);



  // 1. Fetch data on component mount
  useEffect(() => {
    fetchSalesChartData()
      .then((data) => {
        setRawData(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading sales chart data:", err);
        setLoading(false);
      });
  }, []);



  // 2. Process data dynamically based on the selected period

  const processedData = useMemo(() => {

    const groups = {};

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



    rawData.forEach((item) => {

      const monthNumber = item.month?.slice(5, 7);

      const quarterNumber = item.quarter?.replace('Q', '');

      const key = periodType === 'month'

        ? monthNumber

        : quarterNumber;

      const label = periodType === 'month'

        ? monthLabels[Number(monthNumber) - 1] ?? monthNumber

        : `Q${quarterNumber}`;



      if (!groups[key]) {

        groups[key] = {

          periodName: label,

          sortOrder: Number(key) || 0,

          totalSales: 0,

          customerCount: 0,

          seenIds: new Set()

        };

      }



      groups[key].totalSales += Number(item.totalNetValue) || 0;



      if (!groups[key].seenIds.has(item._id)) {

        groups[key].seenIds.add(item._id);

        groups[key].customerCount += 1;

      }

    });



    return Object.values(groups)

      .map(({ seenIds, ...entry }) => entry)

      .sort((a, b) => a.sortOrder - b.sortOrder);

  }, [rawData, periodType]);



  const chartDimensions = useMemo(

    () => [

      {

        accessor: 'periodName'

      }

    ],

    []

  );



  const chartMeasures = useMemo(

    () => [

      {

        accessor: 'totalSales',

        label: 'Ventes',

      },

      {

        accessor: 'customerCount',

        label: 'Nombre de Clients',

      }

    ],

    []

  );



  const chartStyle = useMemo(() => ({ height: '400px' }), []);



  return (

    <Card

      header={

        <CardHeader

          titleText="Performance de ventes"

          subtitleText={periodType === 'month' ? "Par Mois" : "Par Quarter"}

          action={

            <select

              value={periodType}

              onChange={(e) => setPeriodType(e.target.value)}

              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}

            >

              <option value="quarter">Par Quarter</option>

              <option value="month">Par Mois</option>

            </select>

          }

        />

      }

      style={{ maxWidth: '800px', margin: '20px auto', padding: '16px' }}

    >

      {loading ? (

        <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <span>Chargement...</span>

        </div>

      ) : (

        <BarChart

          dataset={processedData}

          dimensions={chartDimensions}

          measures={chartMeasures}

          style={chartStyle}

        />

      )}

    </Card>

  );

};



export default SalesChart;