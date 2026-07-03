import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader } from '@ui5/webcomponents-react';
import { RadialChart } from '@ui5/webcomponents-react-charts/RadialChart';
import { fetchDeliveryRate, fetchProcessingTimeMetrics } from '../services/capService';

const DeliveryRate = () => {
  const [deliveryRate, setDeliveryRate] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('delivery');

  const isDeliveryView = view === 'delivery';

  useEffect(() => {
    let isActive = true;

    Promise.all([fetchDeliveryRate(), fetchProcessingTimeMetrics()])
      .then(([deliveryRateValue, processingTimeValue]) => {
        if (!isActive) {
          return;
        }

        setDeliveryRate(Number(deliveryRateValue) || 0);
        setProcessingTime(Number(processingTimeValue) || 0);
      })
      .catch((err) => {
        console.error('Failed to load KPI metrics:', err);
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const subtitleText = loading
    ? 'Loading metrics...'
    : isDeliveryView
      ? 'On-time fulfillment rate'
      : 'Délai moyen de traitement';

  const toggleLabel = isDeliveryView ? 'Show Délai moyen' : 'Show delivery rate';
  const processingTimeValue = Number(processingTime.toFixed(2));

  return (
    <Card
      header={
        <CardHeader
          titleText="Delivery Performance"
          subtitleText={subtitleText}
          action={
            <Button
              design="Transparent"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setView(isDeliveryView ? 'processing' : 'delivery')}
              style={{
                borderRadius: '999px',
                fontWeight: 700,
                color: '#0f172a',
                background: 'rgba(15, 23, 42, 0.06)',
                border: '1px solid rgba(15, 23, 42, 0.08)',
              }}
            >
              {toggleLabel}
            </Button>
          }
        />
      }
      style={{
        width: '400px',
        margin: '-20px auto',
        padding: '16px',
        height: '450px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '240px' }}>
        {isDeliveryView ? (
          <RadialChart
            color="#f0ab00"
            displayValue={`${deliveryRate}%`}
            value={deliveryRate}
            maxValue={100}
            onClick={() => {}}
            onDataPointClick={() => {}}
            style={{ width: '100%', maxWidth: '450px', height: '320px', padding: '30px', }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '120px 20px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#b45309',padding: '0px' }}>
              Average processing time
            </div>
            <div style={{ marginTop: '14px', fontSize: '3.4rem', fontWeight: 800, lineHeight: 1, color: '#0f172a', letterSpacing: '-0.05em', }}>
              {loading ? '—' : processingTimeValue.toFixed(2)}
            </div>
            <div style={{ marginTop: '8px', fontSize: '1rem', fontWeight: 600, color: '#475569',  }}>
              days
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DeliveryRate;