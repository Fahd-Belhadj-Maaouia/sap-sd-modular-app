module.exports = (srv) => {
  srv.on('getDeliveryRate', async (req) => {
    const { Deliveries } = srv.entities;
    const allDeliveries = await SELECT.from(Deliveries);

    if (allDeliveries.length === 0) return 0;

     const completedDeliveries = allDeliveries.filter(d => d.WADAT_IST !== null);

    const onTime = allDeliveries.filter(d => d.WADAT_IST <= d.LFDAT);

    const rate = (onTime.length / completedDeliveries.length) * 100;
    return Math.round(rate * 100) / 100;
  });

  srv.on('getAvgDeliveryDelay', async (req) => {});
};