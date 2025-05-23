// ✅ React imports
import React, { useContext, useEffect, useState, useCallback, useRef } from "react";

// ✅ Product Context (2 folders back to reach /context)
import { ProductContext } from "../../context/ProductContext";

// ✅ React Router
import { useParams, useNavigate } from "react-router-dom";

// ✅ CSS file for Mobile Info
import styles from "../../stylecss/Mobilinfo.module.css";  // Updated import

// ✅ Admin panel Mobile Form
import MobileForm from "../../User/inputForms/MobileForm";

// ✅ Reusable Reviews component
import Reviews from "../reUseComp/Reviews";
import UpdateSection from "../reUseComp/UpdateSection";

import BuyNowButton from "../reUseComp/BuyNowButton";
import AddToCartButton from "../reUseComp/AddToCartButton";
// ✅ Reusable Order Button
import OrderButton from "../reUseComp/OrderButton";

const Mobilinfo = () => {
  const [isBuyNowDisabled, setIsBuyNowDisabled] = useState(false);

  const navigate = useNavigate(); // Initialize the navigation function
  const [toastMsg, setToastMsg] = useState("");

  const { id } = useParams();
  const { fetchSingleProduct } = useContext(ProductContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [mobileData, setMobileData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const propUpdateDataRef = useRef({});

  const fetchMobile = useCallback(async () => {
    if (id) {
      const data = await fetchSingleProduct(id, 'mobiles');
      setMobileData(data);
      propUpdateDataRef.current = {
        id: data._id,
        title: data.title,
        description: data.description,
        brand: data.brand,
        model: data.model,
        ram_storage: data.ram_storage,
        battery: data.battery,
        display: data.display,
        camera: data.camera,
        processor: data.processor,
        price: data.price,
        image_url: data.image_url,
      };
    }
  }, [id, fetchSingleProduct]);

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    fetchMobile();
  }, [fetchMobile]);
  if (!mobileData) return <p className="loading">Loading... {id}</p>;

  return (
    <div className={styles.mobileDetailsContainer}>
      <img className={styles.mobileImage} src={mobileData.image_url} alt={mobileData.title} />
      {isAdmin && (
       
            <UpdateSection
      isAdmin={isAdmin}
      isUpdate={isUpdate}
      setIsUpdate={setIsUpdate}
      data={propUpdateDataRef.current}
      FormComponent={MobileForm} // ✅ yahan form as a prop diya
    />
      )}
      <h1 className={styles.mobileTitle}>{mobileData.title}</h1>
      <h2 className={styles.mobilePrice}>₨{mobileData.price.toLocaleString()}</h2>

  
         <AddToCartButton
          data={mobileData}
          setToastMsg={setToastMsg}
          category="Mobiles"
        />
     

      <div className={styles.actionButtons}>
          <BuyNowButton
          data={mobileData}
          setToastMsg={setToastMsg}
          setIsBuyNowDisabled={setIsBuyNowDisabled}
          navigate={navigate}
          isDisabled={isBuyNowDisabled}
          category="Mobiles"
        />
        <OrderButton title={mobileData.title} productId={mobileData._id} />
      </div>

      <h3 className={styles.returnPolicy}>Returns & Exchanges Are Accepted</h3>

      <p className={styles.mobileDescription}>{mobileData.description}</p>

      <table className={styles.mobileSpecs}>
        <tbody>
          {Object.entries({
            Brand: mobileData.brand,
            Model: mobileData.model,
            Battery: mobileData.battery,
            Camera: mobileData.camera,
            Display: mobileData.display,
            Processor: mobileData.processor,
            "RAM & Storage": mobileData.ram_storage,
          }).map(([key, value]) => (
            <tr key={key}>
              <td className={styles.specKey}>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add a review section */}
      <Reviews productId={id} category="Mobiles" />

      {/* Display toast message */}
      {toastMsg && (
        <div className="customToast toast-info">
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default Mobilinfo;
