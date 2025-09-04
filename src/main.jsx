import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import WishListContext from './context/wishListContext.jsx'
import BasketContext from './context/BasketContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <BasketContext>
            <WishListContext>
                <App /> 
            </WishListContext>
        </BasketContext>
    </BrowserRouter>
)
