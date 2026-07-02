import React, { useState, useEffect } from 'react';
import {  PieChart } from '@ui5/webcomponents-react-charts/PieChart';
import { Card, CardHeader } from '@ui5/webcomponents-react';
import { fetchSalesByCountry } from '../services/capService';

const SalesPerCountry = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const rawData = await fetchSalesByCountry(); // Returns array of {country, appearanceCount}
        
        // 1. Sort descending by appearanceCount so biggest countries are first
        const sortedData = [...rawData].sort((a, b) => b.appearanceCount - a.appearanceCount);
        
        if (sortedData.length <= 10) {
          setChartData(sortedData);
        } else {
          // 2. Extract the top 9 countries
          const topfour = sortedData.slice(0, 5);
          
          // 3. Take all the remaining countries and sum their appearance counts
          const remainingCountries = sortedData.slice(5);
          const othersCount = remainingCountries.reduce((sum, item) => sum + item.appearanceCount, 0);
          
          // 4. Combine top 9 with the aggregated "Others" object
          const processedData = [
            ...topfour,
            { country: 'Autres', appearanceCount: othersCount }
          ];
          
          setChartData(processedData);
        }
      } catch (error) {
        console.error("Error fetching country sales distribution:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <Card 
      header={
        <CardHeader 
          titleText="Ventes" 
          subtitleText={loading ? "Chargement..." : "Top 9 Pays & Autres"} 
        />
      }
      style={{ maxWidth: '600px', margin: '20px auto', padding: '16px' }}
    >
      <PieChart
        dataset={chartData}
        dimension={{
          accessor: 'country'
        }}
        measure={{
          accessor: 'appearanceCount',
          title: 'Nombre de commandes'
        }}
      />
    </Card>
  );
};

export default SalesPerCountry;