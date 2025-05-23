// File: src/reUseComp/UpdateSection.jsx

import React from "react";

// Start of UpdateSection component
const UpdateSection = ({ isAdmin, isUpdate, setIsUpdate, data, FormComponent }) => {
  // Inline styles for the button
  const buttonStyle = {
    padding: "10px 18px",
    backgroundColor: isUpdate ? "#d9534f" : "#0275d8", // red for cancel, blue for update
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "10px",
  };

  // If user is not admin, don't render anything
  if (!isAdmin) return null;

  return (
    <div>
      {/* Start: Update Toggle Button */}
      <button style={buttonStyle} onClick={() => setIsUpdate(!isUpdate)}>
        {isUpdate ? "Cancel Update" : "Update Product"}
      </button>
      {/* End: Update Toggle Button */}

      {/* Start: Conditional Form Rendering */}
      {isUpdate && FormComponent && <FormComponent existingData={data} />}
      {/* End: Conditional Form Rendering */}
    </div>
  );
};
// End of UpdateSection component

export default UpdateSection;
