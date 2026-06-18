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
  // processingDays is pre-calculated in database (avoids YYYYMMDD parsing in Node.js)
  // Database handles calculation → no NaN from Invalid Date
  // Uses AVG() in SQL → doesn't load all rows into memory (better for HANA scale)
  srv.on('getAverageProcessingTime', async (req) => {
    try {
      const { ProcessingTimeMetrics } = srv.entities;
      
      // Let database calculate average of processingDays field
      const [row] = await SELECT.from(ProcessingTimeMetrics).columns(
        `avg(processingDays) as avgDays`
      );
      
      const avgDays = row?.avgDays || 0;
      return Math.round(avgDays * 100) / 100;
    } catch (err) {
      console.error('Error calculating average processing time:', err.message);
      return 0;
    }
  });

};