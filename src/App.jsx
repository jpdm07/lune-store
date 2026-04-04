import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { OrdersProvider } from './context/OrdersContext'
import { ReturnsProvider } from './context/ReturnsContext'
import { AddressesProvider } from './context/AddressesContext'
import { CheckoutProvider } from './context/CheckoutContext'
import MainLayout from './components/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Collections from './pages/Collections'
import About from './pages/About'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import ReturnPolicy from './pages/ReturnPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Cart from './pages/Cart'
import CheckoutShipping from './pages/CheckoutShipping'
import CheckoutPayment from './pages/CheckoutPayment'
import CheckoutConfirmation from './pages/CheckoutConfirmation'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import NotFound from './pages/NotFound'
import AccountLayout from './pages/account/AccountLayout'
import Overview from './pages/account/Overview'
import Orders from './pages/account/Orders'
import OrderDetail from './pages/account/OrderDetail'
import ReturnsAccount from './pages/account/ReturnsAccount'
import WishlistAccount from './pages/account/WishlistAccount'
import Addresses from './pages/account/Addresses'
import Profile from './pages/account/Profile'
import Password from './pages/account/Password'

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrdersProvider>
              <ReturnsProvider>
                <AddressesProvider>
                  <CheckoutProvider>
                    <BrowserRouter basename="/lune-store">
                      <Routes>
                        <Route element={<MainLayout />}>
                          <Route path="/" element={<Home />} />
                          <Route path="/shop" element={<Shop />} />
                          <Route path="/shop/:slug" element={<ProductDetail />} />
                          <Route path="/collections" element={<Collections />} />
                          <Route path="/about" element={<About />} />
                        <Route path="/reviews" element={<Reviews />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/faq" element={<FAQ />} />
                          <Route path="/returns" element={<ReturnPolicy />} />
                          <Route path="/shipping" element={<ShippingPolicy />} />
                          <Route path="/privacy" element={<PrivacyPolicy />} />
                          <Route path="/terms" element={<TermsOfService />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout/shipping" element={<CheckoutShipping />} />
                          <Route path="/checkout/payment" element={<CheckoutPayment />} />
                          <Route path="/checkout/confirmation" element={<CheckoutConfirmation />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/forgot-password" element={<ForgotPassword />} />
                          <Route
                            path="/account"
                            element={
                              <ProtectedRoute>
                                <AccountLayout />
                              </ProtectedRoute>
                            }
                          >
                            <Route index element={<Overview />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="orders/:id" element={<OrderDetail />} />
                            <Route path="returns" element={<ReturnsAccount />} />
                            <Route path="wishlist" element={<WishlistAccount />} />
                            <Route path="addresses" element={<Addresses />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="password" element={<Password />} />
                          </Route>
                          <Route path="*" element={<NotFound />} />
                        </Route>
                      </Routes>
                    </BrowserRouter>
                  </CheckoutProvider>
                </AddressesProvider>
              </ReturnsProvider>
            </OrdersProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
