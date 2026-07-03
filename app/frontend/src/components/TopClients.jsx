import React, { useEffect, useMemo, useState } from 'react';
import { BarChart } from '@ui5/webcomponents-react-charts/BarChart';
import { Card, CardHeader } from '@ui5/webcomponents-react';
import { fetchTopClients } from '../services/capService';

const TopClients = () => {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopClients()
      .then((data) => {
        setRawData(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading top clients data:', err);
        setLoading(false);
      });
  }, []);

  const processedData = useMemo(() => {
    const groups = {};

    rawData.forEach((item) => {
      if (!item.customerName || !String(item.customerName).trim()) {
        return;
      }

      const customerId = item.customerId || 'N/A';
      const customerName = String(item.customerName).trim();
      const key = customerId;

      if (!groups[key]) {
        groups[key] = {
          customerName,
          orderVolume: 0,
          revenue: 0
        };
      }

      groups[key].orderVolume += 1;
      groups[key].revenue += Number(item.netValue) || 0;
    });

    return Object.values(groups)
      .sort((a, b) => {
        if (b.orderVolume !== a.orderVolume) {
          return b.orderVolume - a.orderVolume;
        }

        return b.revenue - a.revenue;
      })
      .slice(0, 12)
      .map((entry, index) => ({
        ...entry,
        revenueScaled: entry.revenue / 1000,
        rankedClient: `${String(index + 1).padStart(2, '0')} - ${entry.customerName}`
      }));
  }, [rawData]);

  const chartDimensions = useMemo(
    () => [
      {
        accessor: 'rankedClient'
      }
    ],
    []
  );

  const chartMeasures = useMemo(
    () => [
      {
        accessor: 'orderVolume',
        label: 'Volume de commandes'
      },
      {
        accessor: 'revenueScaled',
        label: 'CA (x1000)'
      }
    ],
    []
  );

  const chartStyle = useMemo(() => ({ height: '400px' }), []);

  return (
    <Card
      header={<CardHeader titleText="Top clients" subtitleText="Par volume de commandes et chiffre d'affaires" />}
      style={{ maxWidth: '1000px', margin: '20px auto', padding: '16px' }}
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

export default TopClients;