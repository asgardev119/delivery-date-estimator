import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import PincodeInput from "./components/PincodeInput";
import CountdownTimer from "./components/CountdownTimer";
import { calculateDeliveryDate } from "./utils/deliveryCalculations";
import { loadPincodes } from "./utils/loadPincodes";
import "./App.css";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setDeliveryInfo(null);
  };

  const handlePincodeSubmit = (pincode) => {
    if (selectedProduct) {
      const delivery = calculateDeliveryDate(pincode, selectedProduct);
      setDeliveryInfo(delivery);
    }
  };

  return (
    <div className=" bg-green h-52 w-full text-center p-10">

      {selectedProduct && (
        <div className="delivery-section ">
          {deliveryInfo && (
            <div className="delivery-info border-2 rounded-md mt-10 m-auto w-6/12 bg-green-600 ">
              <h3>{deliveryInfo.message}</h3>
              {deliveryInfo.date && (
                <p>
                  Estimated Delivery: {deliveryInfo.date.toLocaleDateString()}
                </p>
              )}
              {deliveryInfo.cutoffTime && (
                <CountdownTimer cutoffTime={deliveryInfo.cutoffTime} />
              )}
            </div>
          )}

          <h2>Selected Product: {selectedProduct.name}</h2>
          <PincodeInput onSubmit={handlePincodeSubmit} />
        </div>
      )}

<ProductList onSelectProduct={handleProductSelect} />

    </div>
  );
}

export default App;
