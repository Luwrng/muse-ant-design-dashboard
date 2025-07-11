/* eslint-disable react/jsx-no-comment-textnodes */
/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
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
import Services_add from "./pages/services/Services_add";
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

//Auth
import SignUpPage from "./pages/authentication/SignUpPage";

function App() {
  return (
    <div className="App">
      <Switch>
        {/* Auth routes */}
        <Route path="/sign-up" exact component={SignUpPage} />
        <Route path="/sign-in" exact component={SignIn} />

        {/* Gardener routes */}
        <Route path="/gardener/landing" component={GardenerLandingPage} />
        <Route path="/gardener/service-package" component={GServicePackage} />
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
          <Route exact path="/services/Services_add" component={Services_add} />
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
        </Main>
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </div>
  );
}

export default App;
