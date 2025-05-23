// 📁 src/components/productInfo/SmartwatchInfo.jsx
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import styles from "../../stylecss/SmartwatchInfo.module.css"; // Using CSS Modules here
import BuyNowButton from "../reUseComp/BuyNowButton";
import AddToCartButton from "../reUseComp/AddToCartButton";
import OrderButton from "../reUseComp/OrderButton";
import UpdateSection from "../reUseComp/UpdateSection";

import Reviews from "../reUseComp/Reviews";
import SmartwatchForm from "../../User/inputForms/SmartwatchForm";

const SmartwatchInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchSingleProduct } = useContext(ProductContext);

  const [data, setData] = useState(null);
  const [isBuyNowDisabled, setIsBuyNowDisabled] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  // ✅ Data Fetch
  const fetchData = useCallback(async () => {
    try {
      const product = await fetchSingleProduct(id, "smartwatches");
      setData(product);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }, [id, fetchSingleProduct]);

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    fetchData();
  }, [fetchData]);


  if (!data) return <p className={styles.smartwatchLoading}>Loading... {id}</p>; // Use styles from CSS Module

  return (
    <div className={styles.smartwatchContainer}>
      <img src={data.image_url} alt={data.title} className={styles.smartwatchImage} />
      {isAdmin && (
        <UpdateSection
          isAdmin={isAdmin}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          data={data}
          FormComponent={SmartwatchForm} // ✅ yahan form as a prop diya
        />
      )}
      <h1 className={styles.smartwatchTitle}>{data.title}</h1>
      <h2 className={styles.smartwatchPrice}>₨{data.price.toLocaleString()}</h2>


      <AddToCartButton
        data={data}
        setToastMsg={setToastMsg}
        category="Smartwatches"
      />


      <div className={styles.actionButtons}>
        <BuyNowButton
          data={data}
          setToastMsg={setToastMsg}
          setIsBuyNowDisabled={setIsBuyNowDisabled}
          navigate={navigate}
          isDisabled={isBuyNowDisabled}
          category="Smartwatches"
        />
        <OrderButton productId={data._id} title={data.title} />
      </div>

      <p className={styles.smartwatchDescription}>{data?.description || "No Description Available"}</p>

      <table className={styles.smartwatchSpecs}>
        <tbody>
          {Object.entries(data.specifications || {}).map(([key, value]) => (
            <tr key={key}>
              <td className={styles.specKey}>{key}</td>
              <td>{value || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Reviews productId={id} category="Smartwatches" />

      {toastMsg && <div className="customToast">{toastMsg}</div>}
    </div>
  );
};

export default SmartwatchInfo;
