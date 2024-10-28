import React, { useEffect, useState } from "react";
import Papa from "papaparse";

// Function to load pincodes

export const loadPincodes = async () => {
  const csvUrl =
    "https://api.allorigins.win/get?url=" +
    encodeURIComponent(
      "https://drive.google.com/uc?export=download&id=13dCfet4idppJZ4EUm8RrekaTJuDXeCZc"
    );
  return new Promise((resolve, reject) => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        const pincodesData = {};
        results.data.forEach((row) => {
          if (row.Pincode && row["Logistics Provider"] && row.TAT) {
            pincodesData[row.Pincode] = {
              provider: row["Logistics Provider"],
              tat: parseInt(row.TAT, 10),
            };
          }
        });
        // console.log("Pincodes Data:", pincodesData);
        resolve(pincodesData);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
// Function to load products
// const loadProducts = () => {
//   const csvUrl =
//     "https://drive.google.com/uc?export=download&id=1nihoMbdNu99DxoDhyzkIesN9odfN0INu";
//   return new Promise((resolve, reject) => {
//     Papa.parse(csvUrl, {
//       download: true,
//       header: true,
//       complete: (results) => {
//         resolve(results.data);
//       },
//       error: (error) => {
//         reject(error);
//       },
//     });
//   });
// };

// Function to load stocks
// const loadStocks = () => {
//   const csvUrl =
//     "https://drive.google.com/uc?export=download&id=1cigaq9_Ca2kKc2eHwiepdImKDSrF1DXm";
//   return new Promise((resolve, reject) => {
//     Papa.parse(csvUrl, {
//       download: true,
//       header: true,
//       complete: (results) => {
//         const stocks = {};
//         results.data.forEach((row) => {
//           stocks[row.productId] = {
//             stock: parseInt(row.stock, 10),
//           };
//         });
//         resolve(stocks);
//       },
//       error: (error) => {
//         reject(error);
//       },
//     });
//   });
// };
