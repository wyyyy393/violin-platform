import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import PublishProduct from './pages/PublishProduct';
import { Information } from './pages/Information';
import { QA } from './pages/QA';
import UserCenter from './pages/UserCenter';
import { SellerCenter } from './pages/SellerCenter';
import { Services } from './pages/Services';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/publish" element={<PublishProduct />} />
            <Route path="/information" element={<Information />} />
            <Route path="/information/:id" element={<Information />} />
            <Route path="/qa" element={<QA />} />
            <Route path="/qa/:id" element={<QA />} />
            <Route path="/user" element={<UserCenter />} />
            <Route path="/seller" element={<SellerCenter />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
