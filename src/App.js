import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  selectIsAuthChecked,
  selectLoggedInUser,
} from "./features/auth/AuthSlice";
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
import Navbar2 from "./features/navigation/components/Navbar2";
import Footer from "./features/footer/Footer";
import ModalProvider from "./providers/ModalProvider.jsx";
import "./index.css";
import { ProductInfoSkeleton } from "./features/products/components/Skeletons.jsx";
import { ProductFetchSkeletonLoader } from "./features/products/components/ProductList2.jsx";

// Lazy load all pages
const Homepage2 = lazy(() => import("./pages/Homepage2.jsx"));
const Sweets = lazy(() => import("./pages/Sweets.jsx"));
const ProductDetails2 = lazy(() => import("./pages/ProductDetails2.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
const Branches = lazy(() => import("./pages/Branches.jsx"));
const OtpVerificationPage = lazy(() =>
  import("./pages/OtpVerificationPage.jsx")
);
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage.jsx"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage.jsx"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage.jsx"));
const ProductUpdatePage = lazy(() => import("./pages/ProductUpdatePage.jsx"));
const AddProductPage = lazy(() => import("./pages/AddProductPage.jsx"));
const AdminOrdersPage = lazy(() => import("./pages/AdminOrdersPage.jsx"));
const CartPage = lazy(() => import("./pages/CartPage.jsx"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage.jsx"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage.jsx"));
const UserOrdersPage = lazy(() => import("./pages/UserOrdersPage.jsx"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

// Protected Route Wrapper
function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}

// Layout Component
function Layout({ children }) {
  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col bg-primary">
        <Navbar2 />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ModalProvider>
  );
}

function App() {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const loggedInUser = useSelector(selectLoggedInUser);

  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  if (!isAuthChecked) return null;

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Homepage2 />
              </Suspense>
            }
          />
          <Route
            path="/sweets"
            element={
              <Suspense fallback={<ProductFetchSkeletonLoader />}>
                <Sweets />
              </Suspense>
            }
          />
          <Route
            path="/sweets/:id"
            element={
              <Suspense
                fallback={
                  <div class="px-5 py-5 md:py-10 lg:py-16 xl:py-24">
                    <ProductInfoSkeleton />
                  </div>
                }
              >
                <ProductDetails2 />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <AboutUs />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ContactUs />
              </Suspense>
            }
          />
          <Route
            path="/branches"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Branches />
              </Suspense>
            }
          />
          <Route
            path="/verify-otp"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <OtpVerificationPage />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ForgotPasswordPage />
              </Suspense>
            }
          />
          <Route
            path="/reset-password/:userId/:passwordResetToken"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ResetPasswordPage />
              </Suspense>
            }
          />

          {/* Admin Routes */}
          {loggedInUser?.isAdmin && (
            <>
              <Route
                path="/admin/dashboard"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute isAuthenticated={!!loggedInUser}>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/admin/product-update/:id"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute isAuthenticated={!!loggedInUser}>
                      <ProductUpdatePage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/admin/add-product"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute isAuthenticated={!!loggedInUser}>
                      <AddProductPage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute isAuthenticated={!!loggedInUser}>
                      <AdminOrdersPage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
            </>
          )}

          {/* User Routes */}
          <>
            <Route
              path="/cart"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ProtectedRoute isAuthenticated={!!loggedInUser}>
                    <CartPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ProtectedRoute isAuthenticated={!!loggedInUser}>
                    <UserProfilePage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/order-success/:id"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ProtectedRoute isAuthenticated={!!loggedInUser}>
                    <OrderSuccessPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/orders"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ProtectedRoute isAuthenticated={!!loggedInUser}>
                    <UserOrdersPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
          </>
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProtectedRoute isAuthenticated={!!loggedInUser}>
                  <CheckoutPage />
                </ProtectedRoute>
              </Suspense>
            }
          />

          {/* Catch-all Route */}
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
