// 📁 src/components/productInfo/AccessoriesInfo.jsx

import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import styles from "../../stylecss/AccessoriesInfo.module.css"; // ✅ Correct Import
import OrderButton from "../reUseComp/OrderButton";
import BuyNowButton from "../reUseComp/BuyNowButton";
import AddToCartButton from "../reUseComp/AddToCartButton";
import UpdateSection from "../reUseComp/UpdateSection";

import Reviews from "../reUseComp/Reviews";
import AccessorieForm from "../../User/inputForms/AccessorieForm";

const AccessoriesInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchSingleProduct } = useContext(ProductContext);

  const [data, setData] = useState(null);
  const [isBuyNowDisabled, setIsBuyNowDisabled] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  // ✅ Accessory Fetch Function
  const fetchData = useCallback(async () => {
    try {
      const product = await fetchSingleProduct(id, "accessories");
      setData(product);
    } catch (err) {
      console.error("Accessory Fetch Error:", err);
    }
  }, [id, fetchSingleProduct]);

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    fetchData();
  }, [fetchData]);
  if (!data) return <p className={styles["accessory-loading"]}>Loading... {id}</p>;
  return (
    <div className={styles["accessory-container"]}>
      <img
        src={data.image_url}
        alt={data.title}
        className={styles["accessory-image"]}
      />

      {isAdmin && (

        <UpdateSection
          isAdmin={isAdmin}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          data={data}
          FormComponent={AccessorieForm} // ✅ yahan form as a prop diya
        />
      )}

      <h1 className={styles["accessory-title"]}>{data.title}</h1>
      <h2 className={styles["accessory-price"]}>
        ₨{data.price.toLocaleString()}
      </h2>
      <p className={styles["accessory-brand"]}>Brand: {data.brand}</p>
      <p className={styles["accessory-type"]}>Type: {data.accessoryType}</p>
      <p className={styles["accessory-category"]}>Category: {data.category}</p>


      <AddToCartButton
        data={data}
        setToastMsg={setToastMsg}
        category="Accessories"
      />

      <div className={styles["action-buttons"]}>
        <BuyNowButton
          data={data}
          setToastMsg={setToastMsg}
          setIsBuyNowDisabled={setIsBuyNowDisabled}
          navigate={navigate}
          isDisabled={isBuyNowDisabled}
          category="Accessories"
        />
        <OrderButton productId={data._id} title={data.title} />
      </div>

      <div>
        {/* Title ko center align karne ke liye class add ki */}
        <h3 className={styles["description-title"]}>Description</h3>

        {/* List ko left justify rakhne ke liye pehle wali class use ki */}
        <ul className={styles["accessory-description"]}>
          {data.description.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </div>


      <Reviews productId={id} category="Accessories" />
      {toastMsg && <div className="customToast">{toastMsg}</div>}
    </div>
  );
};

export default AccessoriesInfo;
