import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioDashboard from './components/PortfolioDashboard';
import CustomPortfolioInput from './components/CustomPortfolioInput';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center mb-4">DeFi TokenSense (Beta Version)</h1>
        <Routes>
          <Route path="/" element={<PortfolioDashboard />} />
          <Route path="/custom" element={<CustomPortfolioInput />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;