import DeliveryRate from "./components/DeliveryRate"
import SaleChart from "./components/SalesChart"
import SalesPerCountry from "./components/SalesPerCountry"
import ShellBar from "./components/ShellBar"
import TopClients from "./components/TopClients"

function App() {
 

  return (
    <>
    <ShellBar />
    <SaleChart />
    <SalesPerCountry />
    <TopClients />
    <DeliveryRate />
    
    </>
  )
}

export default App