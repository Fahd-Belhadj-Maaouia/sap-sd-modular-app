import axios from 'axios';

const BASE_URL = 'http://localhost:4004/odata/v4/sales'; 

// For your SalesPerCountry component
export const fetchSalesByCountry = async () => {
  const response = await axios.get(
    `${BASE_URL}/SalesByCountry?$apply=groupby((country),aggregate($count as appearanceCount))`
  );
  return response.data.value; 
};

// For your TopClients component
export const fetchTopClients = async () => {
  const response = await axios.get(`${BASE_URL}/SalesByCustomer`);
  return response.data.value;
};

// For your SaleChart component (assuming it maps to Commandes/Orders)
export const fetchSalesChartData = async () => {
  const response = await axios.get(`${BASE_URL}/RevenueByPeriod`);
  return response.data.value;
};

export const fetchDeliveryRate = async () => {
  try {
    
    const response = await axios.get(`${BASE_URL}/getDeliveryRate()`);
    
    // OData v4 functions wrap their scalar return values inside a 'value' key
    return response.data.value; 
  } catch (error) {
    console.error("Error invoking getDeliveryRate:", error);
    throw error;
  }
};
export const fetchProcessingTimeMetrics = async () => {
  try {
    
    const response = await axios.get(`${BASE_URL}/getAverageProcessingTime()`);
    
    // OData v4 functions wrap their scalar return values inside a 'value' key
    return response.data.value; 
  } catch (error) {
    console.error("Error invoking getDeliveryRate:", error);
    throw error;
  }
};