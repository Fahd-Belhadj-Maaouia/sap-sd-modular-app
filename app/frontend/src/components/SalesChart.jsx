import React from 'react'
import {  ColumnChartWithTrend } from '@ui5/webcomponents-react-charts/ColumnChartWithTrend';
import { Card, CardHeader } from '@ui5/webcomponents-react';

const SalesChart = () => {
  return (
    <Card 
      header={<CardHeader titleText="Performance de ventes" subtitleText="Par période" />}
      style={{ maxWidth: '800px', margin: '20px auto', padding: '16px' }}
    >

    <ColumnChartWithTrend
  dataset={[
    {
      name: 'January',
      sessions: 300,
      users: 100,
      volume: 756
    },
    {
      name: 'February',
      sessions: 330,
      users: 230,
      volume: 880
    },
    {
      name: 'March',
      sessions: 404,
      users: 240,
      volume: 700
    },
    {
      name: 'April',
      sessions: 80,
      users: 280,
      volume: 604
    },
    {
      name: 'May',
      sessions: 300,
      users: 100,
      volume: 756
    },
    {
      name: 'June',
      sessions: 330,
      users: 230,
      volume: 880
    },
    {
      name: 'July',
      sessions: 470,
      users: 20,
      volume: 450
    },
    {
      name: 'August',
      sessions: 180,
      users: 220,
      volume: 104
    },
    {
      name: 'September',
      sessions: 360,
      users: 200,
      volume: 1000
    },
    {
      name: 'October',
      sessions: 500,
      users: 250,
      volume: 200
    },
    {
      name: 'November',
      sessions: 404,
      users: 240,
      volume: 700
    },
    {
      name: 'December',
      sessions: 80,
      users: 280,
      volume: 604
    }
  ]}
  dimensions={[
    {
      accessor: 'name',
      formatter: function pU(){}
    }
  ]}
  measures={[
    {
      accessor: 'users',
      label: 'Users',
      type: 'line'
    },
    {
      accessor: 'sessions',
      label: 'Active Sessions',
      type: 'bar'
    }
  ]}
  onClick={function pU(){}}
  onDataPointClick={function pU(){}}
  onLegendClick={function pU(){}}
  style={{
    height: '400px'
  }}
/>
</Card>
  )
}

export default SalesChart