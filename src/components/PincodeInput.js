import React, { useState } from "react";

const PincodeInput = ({ onSubmit }) => {
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pincode);
  };

  return (
    <form
      onSubmit={handleSubmit}
      class="text-sm font-medium text-gray-900 flex  justify-center  m-auto  border-b-orange-950"
    >
      <div>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter six digit Pincode"
          maxLength="6"
          required
          id="first_name"
          class="bg-gray-50 border
         border-gray-300 text-gray-900 text-sm rounded-lg
           py-2 m-auto w-80"
        />
      </div>

      <button
        type="submit"
        class="p-2 border rounded-md bg-black text-gray-50 "
      >
        Check Delivery
      </button>
    </form>
  );
};

export default PincodeInput;
