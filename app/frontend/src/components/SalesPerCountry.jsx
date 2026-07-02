import React from 'react'
import {  PieChart } from '@ui5/webcomponents-react-charts/PieChart';
import { Card, CardHeader } from '@ui5/webcomponents-react';

const SalesPerCountry = () => {
  return (
    <Card 
          header={<CardHeader titleText="Ventes" subtitleText="Par pays" />}
          style={{ maxWidth: '600px', margin: '20px auto', padding: '16px' }}
        >
        <PieChart
  dataset={[
    {
      name: 'January',
      users: 100
    },
    {
      name: 'February',
      users: 230
    },
    {
      name: 'March',
      users: 240
    },
    {
      name: 'April',
      users: 280
    },
    {
      name: 'May',
      users: 100
    },
    {
      name: 'June',
      users: 230
    },
    {
      name: 'July',
      users: 20
    },
    {
      name: 'August',
      users: 220
    },
    {
      name: 'September',
      users: 200
    },
    {
      name: 'October',
      users: 250
    },
    {
      name: 'November',
      users: 240
    },
    {
      name: 'December',
      users: 280
    }
  ]}
  dimension={{
    accessor: 'name'
  }}
  measure={{
    accessor: 'users'
  }}
  onClick={function pU(){}}
  onDataPointClick={function pU(){}}
  onLegendClick={function pU(){}}
/>
    </Card>
  )
}

export default SalesPerCountry