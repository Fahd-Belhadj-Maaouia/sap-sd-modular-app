import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from '@ui5/webcomponents-react';
import { RadialChart } from '@ui5/webcomponents-react-charts/RadialChart';
import { fetchDeliveryRate } from '../services/capService'; // Adjust path if your service folder is elsewhere

const DeliveryRate = () => {
  // 1. Initialize state for the live rate and loading status
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(true);

  // 2. Fetch the data when the component mounts
  useEffect(() => {
    fetchDeliveryRate()
      .then((value) => {
        // Ensure we got a valid number; fallback to 0 if null/undefined
        setRate(value ?? 0); 
      })
      .catch((err) => {
        console.error("Failed to load delivery rate:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Card
      header={
        <CardHeader 
          titleText="Delivery Performance" 
          subtitleText={loading ? "Loading rate..." : "On-time fulfillment rate"} 
        />
      }
      style={{ width: '400px', margin: '-20px auto', padding: '16px'}}
    >
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <RadialChart
          color="#f0ab00"
          // 3. Bind the state dynamically to the UI5 properties
          displayValue={`${rate}%`}
          value={rate}
          maxValue={100}
          onClick={function pU(){}}
          onDataPointClick={function pU(){}}
        />
      </div>
    </Card>
  );
};

export default DeliveryRate;