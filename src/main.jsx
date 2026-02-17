import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { UserProvider } from './components/contexts/user.context.jsx'
import './index.scss'
import { ProductProvider } from './components/contexts/products.context.jsx'
import { CartProvider } from './components/contexts/cart.context.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <App />
         </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
