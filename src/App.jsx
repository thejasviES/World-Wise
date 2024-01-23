import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Price from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider, useCities } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={<Homepage />}
            />
            <Route
              path="app"
              element={<AppLayout />}
            >
              <Route
                index
                element={
                  <Navigate
                    replace
                    to="cities"
                  />
                }
              ></Route>

              <Route
                path="cities"
                element={<CityList></CityList>}
              ></Route>
              <Route
                path="cities/:id"
                element={<City></City>}
              ></Route>
              <Route
                path="countries"
                element={<CountryList />}
              ></Route>
              <Route
                path="form"
                element={<Form />}
              ></Route>
            </Route>

            <Route
              path="product"
              element={<Product />}
            />
            <Route
              path="pricing"
              element={<Price />}
            />
            <Route
              path="login"
              element={<Login />}
            />
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
