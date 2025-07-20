
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account/Account";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
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
import GProductCategory from "./pages/GardenerPage/ProductCategory/GProductCategory";
import GPostPage from "./pages/GardenerPage/PostPage/GPostPage";
import GAppointmentPage from "./pages/GardenerPage/Appointment/GAppointmentPage";
import GServicePackage from "./pages/GardenerPage/ServicePackage/GServicePackage";
import GChatPage from "./pages/GardenerPage/Chatting/GChatPage";
import GProfilePage from "./pages/GardenerPage/Profile/GProfilePage";
import GDashboard from "./pages/GardenerPage/Dashboard/GDashboard";
import PaymentResult from "./pages/GardenerPage/PaymentResult/PaymentResult";
import GPackageOrderHistory from "./pages/GardenerPage/PackageOrderHistory/GPackageOrderHistory";
import GSubscriptionHistory from "./pages/GardenerPage/SubscriptionHistory/GSubscriptionHistory";

//Auth
import SignUpPage from "./pages/authentication/SignUpPage";

function App() {
  return (
    <div className="App">
      <Switch>
        {/* Auth routes */}
        <Route path="/sign-up" exact component={SignUpPage} />
        <Route path="/sign-in" exact component={SignIn} />

        {/* General routes */}
        <Route path="/landing" component={GardenerLandingPage} />

        {/* Gardener routes */}
        <Route path="/gardener/service-package" component={GServicePackage} />
        <Route path="/gardener/payment-result" component={PaymentResult} />
      
        <Route
          path="/gardener"
          render={() => (
            <GardenerMain>
              <Switch>
                <Route
                  path="/gardener/product"
                  component={GardenerProductPage}
                />
                <Route path="/gardener/order" component={GOrderPage} />
                <Route
                  path="/gardener/product-category"
                  component={GProductCategory}
                />
                <Route path="/gardener/post" component={GPostPage} />
                <Route
                  path="/gardener/appointment"
                  component={GAppointmentPage}
                />
                <Route path="/gardener/message" component={GChatPage} />
                <Route path="/gardener/profile" component={GProfilePage} />
                <Route path="/gardener/dashboard" component={GDashboard} />
                <Route path="/gardener/package-payment" component={GPackageOrderHistory} />
                <Route path="/gardener/subscription-history" component={GSubscriptionHistory} />
              </Switch>
            </GardenerMain>
          )}
        ></Route>

        {/* Admin routes */}
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/account" component={Account} />
          <Route path="/services" component={Services} />
          <Route exact path="/package" component={ServicesPackage} />
          <Route exact path="/transaction" component={Transaction} />
          <Route exact path="/reports-list" component={ReportList} />
          <Route exact path="/productcategory" component={ProductCategory} />
          <Route exact path="/gardener-posts" component={GardenerPosts} />
          <Route
            exact
            path="/gardener-verification"
            component={GardenerVerification}
          />
          <Route path="/statistics" component={StatisticsPage} />
          <Route
            exact
            path="/servicespackage/Packages_add"
            component={Packages_add}
          />
          <Route exact path="/notifications" component={NotificationPage} />
          <Route exact path="/subscription-contracts" component={Contracts} />
          <Route exact path="/subscription-orders" component={Orders} />
          <Route exact path="/revenue" component={Revenue} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />
          <Route
            exact
            path="/active-package-customers"
            component={ActivePackageCustomers}
          />

          <Redirect from="*" to="/dashboard" />
        </Main>
        <Redirect from="*" to="/landing" />
      </Switch>
    </div>
  );
}

export default App;
