// 📁 src/components/productInfo/ChromebookInfo.jsx

import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import styles from "../../stylecss/ChromebookInfo.module.css"; // ✅ Corrected Import
import BuyNowButton from "../reUseComp/BuyNowButton";
import AddToCartButton from "../reUseComp/AddToCartButton";
import OrderButton from "../reUseComp/OrderButton";
import UpdateSection from "../reUseComp/UpdateSection";

import Reviews from "../reUseComp/Reviews";
import ChromebookForm from "../../User/inputForms/ChromebookForm";

const ChromebookInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchSingleProduct } = useContext(ProductContext);
  const [data, setData] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [isBuyNowDisabled, setIsBuyNowDisabled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const product = await fetchSingleProduct(id, "chromebooks");
      setData(product);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }, [id, fetchSingleProduct]);

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    fetchData();
  }, [fetchData]);


  if (!data) return <p className={styles.loading}>Loading... {id}</p>;

  return (
    <div className={styles["chromebook-container"]}>


      <img src={data.image_url} alt={data.title} className={styles["product-image"]} />
      {/* ✅ Admin Update Button */}
      {isAdmin && (

        <UpdateSection
          isAdmin={isAdmin}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          data={data}
          FormComponent={ChromebookForm} // ✅ yahan form as a prop diya
        />

      )}
      <h1 className={styles["product-title"]}>{data.title}</h1>
      <h2 className={styles["product-price"]}>₨{data.price.toLocaleString()}</h2>


      <AddToCartButton
        data={data}
        setToastMsg={setToastMsg}
        category="Chromebooks"
      />


      <div className={styles["action-buttons"]}>
        <BuyNowButton
          data={data}
          setToastMsg={setToastMsg}
          setIsBuyNowDisabled={setIsBuyNowDisabled}
          navigate={navigate}
          isDisabled={isBuyNowDisabled}
          category="Chromebooks"
        />
        <OrderButton productId={data._id} title={data.title} />
      </div>

      <p className={styles["product-description"]}>
        {data?.description || "No Description Available"}
      </p>

      <table className={styles["product-specs"]}>
        <tbody>
          {Object.entries(data.specifications || {}).map(([key, value]) => (
            <tr key={key}>
              <td className={styles["spec-key"]}>{key}</td>
              <td>{value || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Reviews productId={id} category="Chromebooks" />

      {toastMsg && <div className="customToast">{toastMsg}</div>}
    </div>
  );
};

export default ChromebookInfo;
