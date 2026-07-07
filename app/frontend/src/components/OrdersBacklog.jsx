import React, { useEffect, useMemo, useState } from 'react'
import { AnalyticalTable } from '@ui5/webcomponents-react/AnalyticalTable';
import { Card, CardHeader } from '@ui5/webcomponents-react';
import { fetchOrderBacklog } from '../services/capService';

const OrdersBacklog = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    fetchOrderBacklog()
      .then((data) => {
        if (!isActive) {
          return;
        }

        setRows(data || []);
      })
      .catch((error) => {
        console.error('Error loading order backlog data:', error);
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

  const columns = useMemo(
    () => [
      {
        Header: 'Order ID',
        accessor: 'orderId'
      },
      {
        Header: 'Order Date',
        accessor: 'orderDate'
      },
      {
        Header: 'Customer',
        accessor: 'customerId'
      },
      {
        Header: 'Net Value',
        accessor: 'netValue',
        hAlign: 'End'
      },
      {
        Header: 'Currency',
        accessor: 'currency'
      },
    ],
    []
  );

  const displayRows = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        netValue: Number(row.netValue) || 0
      })),
    [rows]
  );

  return (
    <Card
      header={
        <CardHeader
          titleText="Orders Backlog"
        />
      }
      style={{ maxWidth: '1435px', margin: '10px auto', padding: '16px' }}
    >
      <AnalyticalTable
        columns={columns}
        data={displayRows}
        highlightField="status"
        loading={loading}
        onAutoResize={function pU() {}}
        onColumnsReorder={function pU() {}}
        onFilter={function pU() {}}
        onGroup={function pU() {}}
        onLoadMore={function pU() {}}
        onRowClick={function pU() {}}
        onRowContextMenu={function pU() {}}
        onRowExpandChange={function pU() {}}
        onRowSelect={function pU() {}}
        onSort={function pU() {}}
        subRowsKey="subRows"
        visibleRows={10}
      />
    </Card>
  )
}

export default OrdersBacklog