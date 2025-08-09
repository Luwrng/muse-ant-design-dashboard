import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account/Account";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPass from "./pages/forgotpassword/ForgotPass";
import Main from "./components/layout/Main";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthCheck from "./components/AuthCheck";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import ServicesPackage from "./pages/servicespackage/ServicesPackage";
import Transaction from "./pages/Transaction";
import ReportList from "./pages/ReportList";
import ProductCategory from "./pages/ProductCategory";
import GardenerPosts from "./pages/GardenerPosts";
import GardenerVerification from "./pages/GardenerVerification";
import Contracts from "./pages/Contracts";
import Orders from "./pages/Orders";
import Revenue from "./pages/Revenue";
import Services from "./pages/services/Services";
import Packages_add from "./pages/servicespackage/Package_add";
import NotificationPage from "./pages/Notification";
import StatisticsPage from "./pages/StatisticsPage";
import ActivePackageCustomers from "./pages/ActivePackageCustomers";
//Gardener import
import GardenerMain from "./components/gardenerlayout/GardenerMain";
import GardenerLandingPage from "./pages/GardenerPage/Landing/LandingPage";
import GardenerProductPage from "./pages/GardenerPage/Product/ProductPage";
import GOrderPage from "./pages/GardenerPage/OrderManagement/Order/GOrderPage";
import GPostPage from "./pages/GardenerPage/PostPage/GPostPage";
import GAppointmentPage from "./pages/GardenerPage/Appointment/GAppointmentPage";
import GServicePackage from "./pages/GardenerPage/ServicePackage/GServicePackage";
import GChatPage from "./pages/GardenerPage/Chatting/GChatPage";
import GProfilePage from "./pages/GardenerPage/Profile/GProfilePage";
import GDashboard from "./pages/GardenerPage/Dashboard/GDashboard";
import GPackageOrderHistory from "./pages/GardenerPage/PackageOrderHistory/GPackageOrderHistory";
import GReportPage from "./pages/GardenerPage/Report/GReportPage";
import SubscriptionTabs from "./pages/GardenerPage/SubscriptionHistory/SubscriptionTabs";

//Payment
import PaymentResult from "./pages/GardenerPage/PaymentResult/PaymentResult";
import SuccessPaymentResult from "./pages/GardenerPage/PaymentResult/SuccessPaymentResult";
import FailPaymentResult from "./pages/GardenerPage/PaymentResult/FailPaymentResult";

//Auth
import SignUpPage from "./pages/authentication/SignUpPage";
import AuthService from "./pages/services/AuthService";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const isOnUnAuthPage =
      window.location.pathname === "/sign-up" ||
      window.location.pathname === "/sign-in" ||
      window.location.pathname === "/";

    if (!isOnUnAuthPage && AuthService.isTokenExpired()) {
      AuthService.logout();
    }
  }, []);

  return (
    <div className="App">
      <AuthCheck>
        <Switch>
          {/* Auth routes */}
          <Route path="/sign-up" exact component={SignUpPage} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/forgot-password" exact component={ForgotPass} />

          {/* General routes */}
          <Route path="/" exact component={GardenerLandingPage} />

          {/* Gardener routes */}
          <ProtectedRoute
            path="/gardener/service-package"
            component={GServicePackage}
            allowedRoles={["gardener", "retailer"]}
          />
          <ProtectedRoute
            path="/gardener/payment-result"
            component={PaymentResult}
            allowedRoles={["gardener", "retailer"]}
          />

          {/* Payment Result Routes */}
          <Route
            path="/gardener/payment/success"
            component={SuccessPaymentResult}
          />
          <Route path="/gardener/payment/fail" component={FailPaymentResult} />

          <Route
            path="/gardener"
            render={() => (
              <GardenerMain>
                <Switch>
                  dashboard
                  <ProtectedRoute
                    path="/gardener/product"
                    component={GardenerProductPage}
                    allowedRoles={["gardener", "retailer"]}
                  />
                  <ProtectedRoute
                    path="/gardener/order"
                    component={GOrderPage}
                    allowedRoles={["gardener", "retailer"]}
                  />
                  {/* <ProtectedRoute
                    path="/gardener/product-category"
                    component={GProductCategory}
                    // allowedRoles={["gardener", "retailer"]}
                  /> */}
                  <ProtectedRoute
                    path="/gardener/post"
                    component={GPostPage}
                    allowedRoles={["gardener", "retailer"]}
                  />
                  <ProtectedRoute
                    path="/gardener/appointment"
                    component={GAppointmentPage}
                    allowedRoles={["gardener", "retailer"]}
                  />
                  <ProtectedRoute
                    path="/gardener/message"
                    component={GChatPage}
                    allowedRoles={["gardener", "retailer"]}
                  />
                  <ProtectedRoute
                    path="/gardener/profile"
                    component={GProfilePage}
                    allowedRoles={["gardener", "retailer"]}
                  />
                  <ProtectedRoute
                    path="/gardener/dashboard"
                    component={GDashboard}
                    allowedRoles={["gardener", "retailer"]}
                  />
                  <ProtectedRoute
                    path="/gardener/package-payment"
                    component={SubscriptionTabs}
                    allowedRoles={["gardener", "retailer"]}
                  />
                  {/* <ProtectedRoute
                    path="/gardener/subscription-history"
                    component={SubscriptionTabs}
                    allowedRoles={["gardener", "retailer"]}
                  /> */}
                  <Route path="/gardener/report" component={GReportPage} />
                </Switch>
              </GardenerMain>
            )}
          ></Route>

          {/* Admin routes */}
          <Main>
            <ProtectedRoute
              exact
              path="/dashboard"
              component={Home}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/account"
              component={Account}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              path="/services"
              component={Services}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/package"
              component={ServicesPackage}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/transaction"
              component={Transaction}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/reports-list"
              component={ReportList}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/productcategory"
              component={ProductCategory}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/gardener-posts"
              component={GardenerPosts}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/gardener-verification"
              component={GardenerVerification}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              path="/statistics"
              component={StatisticsPage}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/servicespackage/Packages_add"
              component={Packages_add}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/notifications"
              component={NotificationPage}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/subscription-contracts"
              component={Contracts}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/subscription-orders"
              component={Orders}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/revenue"
              component={Revenue}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/rtl"
              component={Rtl}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
              allowedRoles={["admin"]}
            />
            <ProtectedRoute
              exact
              path="/active-package-customers"
              component={ActivePackageCustomers}
              allowedRoles={["admin"]}
            />

            <Redirect from="*" to="/dashboard" />
          </Main>
          <Redirect from="*" to="/" />
        </Switch>
      </AuthCheck>
    </div>
  );
}

export default App;
