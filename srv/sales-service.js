module.exports = (srv) => {
  
  // KPI Existant
  srv.on('getDeliveryRate', async () => {
    const { Deliveries } = srv.entities;
    const [row] = await SELECT.from(Deliveries).columns(
      `sum(case when WADAT_IST is not null then 1 else 0 end) as completed`,
      `sum(case when WADAT_IST is not null and WADAT_IST <= LFDAT then 1 else 0 end) as onTime`
    );
    const completed = row?.completed || 0;
    return completed ? Math.round((row.onTime / completed) * 10000) / 100 : 0;
  });

  // KPI5 : Délai moyen de traitement
  srv.on('getAverageProcessingTime', async (req) => {
    try {
      const { ProcessingTimeMetrics } = srv.entities;
      
      // Fetch date pairs (works with any database: SQLite, HANA, PostgreSQL, MySQL)
      const rows = await SELECT.from(ProcessingTimeMetrics).columns(c => {
        c('orderDate');
        c('actualDeliveryDate');
      });
      
      if (!rows || rows.length === 0) return 0;

      // Calculate processing days - efficient reduce, no loops
      const totalDays = rows.reduce((sum, row) => {
        const orderDate = new Date(row.orderDate);
        const deliveryDate = new Date(row.actualDeliveryDate);
        const diffMs = deliveryDate - orderDate;
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        return sum + diffDays;
      }, 0);

      const average = totalDays / rows.length;
      
      // Return rounded to 2 decimal places
      return Math.round(average * 100) / 100;
    } catch (err) {
      // Log error and return 0 as fallback
      console.error('Error calculating average processing time:', err.message);
      return 0;
    }
  });

};