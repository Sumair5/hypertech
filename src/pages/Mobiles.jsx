import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductList from "../components/reUseComp/ProductList";
import { toast } from 'react-hot-toast';

const Mobiles = () => {
  const { fetchProducts } = useContext(ProductContext);
  const { brand } = useParams();
  const navigate = useNavigate();
  const [mobileData, setMobileData] = React.useState([]);

  // 🧠 Static content
  const heading = "Available Mobiles";
  const ParagraphTitle = "Mobile Phones Prices In Pakistan";
  const paragraph1 = "Wide range of PTA approved and non-approved mobiles. The collection includes keypad feature phones as well as smartphones from top global brands. Shop online with hyper tech at the lowest prices. Original pictures of used mobiles.";
  const paragraph2 = "Nokia, Samsung, Huawei, Blackberry, iPhone, Sony, Motorola, LG, Oppo";

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts('mobiles') // Fetch mobile data when the component mounts 
      .then((data) => {
        setMobileData(data);
      })
      .catch((error) => {
        toast.error("Failed to load mobile data."); // Show error toast 
      });
  }, [fetchProducts]);

  // 🔗 Navigate to product detail
  const handleProductClick = (brandname, productTitle, productID, type = "mobiles") => {
    navigate(`/${type}/mobiledetails/${encodeURIComponent(brandname)}/${encodeURIComponent(productTitle)}/${productID}`);
  };

  return (
    <div>


      <ProductList
        heading={heading}
        paragraphTitle={ParagraphTitle}
        paragraph1={paragraph1}
        paragraph2={paragraph2}
        rawData={mobileData}
        brand={brand}
        handleProductClick={handleProductClick}
        dataType="Mobiles"
      />
    </div>
  );
};

export default Mobiles;
