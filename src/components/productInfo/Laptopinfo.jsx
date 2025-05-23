// ✅ Required React and hooks
import React, { useContext, useEffect, useState, useCallback } from "react";

// ✅ ProductContext (going up 3 levels: from productInfo -> components -> src -> context)
import { ProductContext } from "../../context/ProductContext";

// ✅ React Router hooks
import { useParams, useNavigate } from "react-router-dom";

// ✅ CSS (correct import for CSS modules)
import styles from "../../stylecss/Laptopinfo.module.css";  // Corrected import path

// ✅ Reusable Component: Reviews
import Reviews from "../reUseComp/Reviews";

import BuyNowButton from "../reUseComp/BuyNowButton";
import AddToCartButton from "../reUseComp/AddToCartButton";
// ✅ Reusable Component: Order Button
import OrderButton from "../reUseComp/OrderButton";
import UpdateSection from "../reUseComp/UpdateSection";

import LaptopForm from "../../User/inputForms/LaptopForm";

const LaptopInfo = () => {
    const [isBuyNowDisabled, setIsBuyNowDisabled] = useState(false);
    const navigate = useNavigate();
    const [toastMsg, setToastMsg] = useState("");
    const { id } = useParams();
    const { fetchSingleProduct } = useContext(ProductContext);
    const [isUpdate, setIsUpdate] = useState(false);
    const [laptopData, setLaptopData] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Fetch laptop data based on ID
    const fetchLaptop = useCallback(async () => {
        if (id) {
            try {
                const data = await fetchSingleProduct(id, 'laptops'); // Assuming 'laptops' is the category
                if (data) {
                    setLaptopData(data);
                } else {
                    setLaptopData(null); // No data found
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                setLaptopData(null); // Set to null if there's an error
            }
        }
    }, [id, fetchSingleProduct]);

    useEffect(() => {
        setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
        fetchLaptop();
    }, [fetchLaptop]);

    if (!laptopData) return <p className={styles.loading}>Loading... {id}</p>;  // Corrected class name

    return (
        <div className={styles.laptopDetailsContainer}>  {/* Corrected class name */}
            <img className={styles.laptopImage} src={laptopData.image_url} alt={laptopData.title} />
            {isAdmin && (

                <UpdateSection
                    isAdmin={isAdmin}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate}
                    data={laptopData}
                    FormComponent={LaptopForm} // ✅ yahan form as a prop diya
                />
            )}
            <h1 className={styles.laptopTitle}>{laptopData.title}</h1>
            <h2 className={styles.laptopPrice}>₨{laptopData.price.toLocaleString()}</h2>

            <AddToCartButton
                data={laptopData}
                setToastMsg={setToastMsg}
                category="Laptops"
            />


            <div className={styles.actionButtons}>  {/* Corrected class name */}
                <BuyNowButton
                    data={laptopData}
                    setToastMsg={setToastMsg}
                    setIsBuyNowDisabled={setIsBuyNowDisabled}
                    navigate={navigate}
                    isDisabled={isBuyNowDisabled}
                    category="Laptops"
                />
                <OrderButton title={laptopData.title} productId={laptopData._id} />
            </div>

            <h3 className={styles.returnPolicy}>Returns & Exchanges Are Accepted</h3>  {/* Corrected class name */}
            <p className={styles.laptopDescription}>{laptopData.description}</p>  {/* Corrected class name */}

            <table className={styles.laptopSpecs}>  {/* Corrected class name */}
                <tbody>
                    {Object.entries({
                        Brand: laptopData.brand,
                        Model: laptopData.model,
                        "RAM Capacity": laptopData?.ram?.capacity || "Not Available",
                        "RAM Type": laptopData?.ram?.ramType || "Not Available",
                        "Processor Brand": laptopData?.processor?.brand || "Not Available",
                        "Processor Class": laptopData?.processor?.class || "Not Available",
                        "Processor Type": laptopData?.processor?.type || "Not Available",
                        "Processor Speed": laptopData?.processor?.speed || "Not Available",
                        "Processor Number": laptopData?.processor?.number || "Not Available",
                        "Storage Capacity": laptopData?.storage?.capacity || "Not Available",
                        "Storage Type": laptopData?.storage?.storageType || "Not Available",
                        "USB Ports": laptopData?.usbPorts?.total || "Not Available",
                        "Price": `₨${laptopData.price.toLocaleString()}`,
                    }).map(([key, value]) => (
                        <tr key={key}>
                            <td className={styles.specKey}>{key}</td>  {/* Corrected class name */}
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Reviews section */}
            <Reviews productId={id} category="Laptops" />

            {/* Display toast message */}
            {toastMsg && (
                <div className="customToast">
                    {toastMsg}
                </div>
            )}
        </div>
    );
};

export default LaptopInfo;
