import { ThemeProvider } from "@ui5/webcomponents-react";
import DeliveryRate from "./components/DeliveryRate"
import OrdersBacklog from "./components/OrdersBacklog"
import SaleChart from "./components/SalesChart"
import SalesPerCountry from "./components/SalesPerCountry"
import ShellBar from "./components/ShellBar"
import TopClients from "./components/TopClients"


function App() {
 

  return (
    <>
    <ThemeProvider>
    <ShellBar />
    <SaleChart />
    <SalesPerCountry />
    <TopClients />
    <DeliveryRate />
    <OrdersBacklog />
    </ThemeProvider>
    </>
  )
}

export default App