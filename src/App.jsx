import './App.css'
import { GlobalProvider } from './contexts/GlobalContext';
import MainRoutes from './routes/routes';

function App() {
  return (
    <GlobalProvider>
      <MainRoutes/>
    </GlobalProvider>
  )
}

export default App
