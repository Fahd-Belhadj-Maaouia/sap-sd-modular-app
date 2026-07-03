const cds = require('@sap/cds');

function daysBetween(startDate, endDate) {
  if (!startDate || !endDate) return null;

  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;

  return Math.round((end - start) / 86400000);
}

async function loadProcessingMetrics() {
  const db = cds.db || await cds.connect.to('db');

  const [deliveries, deliveryItems, orders] = await Promise.all([
    db.run(SELECT.from('sap.pfe.sd.LIKP').columns('_id', 'VBELN', 'WADAT_IST')),
    db.run(SELECT.from('sap.pfe.sd.LIPS').columns('VBELN', 'VGBEL')),
    db.run(SELECT.from('sap.pfe.sd.VBAK').columns('VBELN', 'AUDAT')),
  ]);

  const orderDateByNumber = new Map();
  for (const order of orders) {
    if (order?.VBELN && order?.AUDAT) {
      orderDateByNumber.set(order.VBELN, order.AUDAT);
    }
  }

  const orderNumberByDelivery = new Map();
  for (const item of deliveryItems) {
    if (item?.VBELN && item?.VGBEL && !orderNumberByDelivery.has(item.VBELN)) {
      orderNumberByDelivery.set(item.VBELN, item.VGBEL);
    }
  }

  const metrics = [];
  for (const delivery of deliveries) {
    if (!delivery?._id || !delivery?.VBELN || !delivery?.WADAT_IST) continue;

    const orderNumber = orderNumberByDelivery.get(delivery.VBELN);
    const orderDate = orderDateByNumber.get(orderNumber);
    const processingDays = daysBetween(orderDate, delivery.WADAT_IST);

    if (processingDays == null) continue;

    metrics.push({
      _id: delivery._id,
      orderDate,
      actualDeliveryDate: delivery.WADAT_IST,
      processingDays,
    });
  }

  return metrics;
}

module.exports = (srv) => {

  // KPI 3: Delivery Rate (with try/catch for consistency)
  srv.on('getDeliveryRate', async () => {
    try {
      const { Deliveries } = srv.entities;
      const [row] = await SELECT.from(Deliveries).columns(
        `sum(case when WADAT_IST is not null then 1 else 0 end) as completed`,
        `sum(case when WADAT_IST is not null and WADAT_IST <= LFDAT then 1 else 0 end) as onTime`
      );
      const completed = row?.completed || 0;
      return completed ? Math.round((row.onTime / completed) * 10000) / 100 : 0;
    } catch (err) {
      console.error('Error calculating delivery rate:', err.message);
      return 0;
    }
  });

  // KPI 5: Average Processing Time
  // Processing days are computed in Node.js so the logic works on SQLite and HANA.
  srv.on('READ', 'ProcessingTimeMetrics', async (req) => {
    try {
      return await loadProcessingMetrics();
    } catch (err) {
      console.error('Error loading processing time metrics:', err.message);
      return [];
    }
  });

  srv.on('getAverageProcessingTime', async (req) => {
    try {
      const metrics = await loadProcessingMetrics();
      if (!metrics.length) return 0;

      const totalDays = metrics.reduce((sum, metric) => sum + metric.processingDays, 0);
      return Math.round((totalDays / metrics.length) * 100) / 100;
    } catch (err) {
      console.error('Error calculating average processing time:', err.message);
      return 0;
    }
  });

};