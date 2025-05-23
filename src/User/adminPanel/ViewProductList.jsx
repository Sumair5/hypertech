import { useContext, useEffect, useState } from 'react';
import AuthContext from '../AuthContext';
import { ProductContext } from '../../context/ProductContext';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileForm from '../inputForms/MobileForm';
import LaptopForm from '../inputForms/LaptopForm';
import ChromebookForm from '../inputForms/ChromebookForm';
import SmartwatchForm from '../inputForms/SmartwatchForm';
import AccessorieForm from '../inputForms/AccessorieForm';

const ViewProductList = () => {
  const location = useLocation();
  const { category } = location.state || {};

  const { fetchProducts, deleteProduct, isadmin } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const [postProduct, setPostProduct] = useState(false);
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const [deleteProductId, setDeleteProductId] = useState("");
  const [deletionTrigger, setDeletionTrigger] = useState(false);
    const [categoryBTN, setCategoryBTN] = useState("")
  

  const handleDeleteById = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    if (id && id !== "123") {
      await deleteProduct(category, id);
    } else {
      await deleteProduct(category, deleteProductId);
      setDeleteProductId("");
    }
    setDeletionTrigger(!deletionTrigger);
  };

  useEffect(() => {
    setCategoryBTN(category?.slice(0, -1))
    const fetchData = async () => {
      try {
        const data = await fetchProducts(category);
        setProductData(data);
      } catch (error) {
        console.error("Error fetching mobile data:", error);
      }
    };
    fetchData();
    if (!isadmin && (localStorage.getItem("authToken"))) {
      navigate("/userdetails");
    }
 

  }, [category, fetchProducts, deletionTrigger, isadmin, navigate]);

  return (
    <>
      {/* ==================== Button Section ==================== */}
      <div style={styles.buttonRow}>
        <button onClick={() => setPostProduct(!postProduct)} style={styles.primaryButton}>
          {postProduct? `Cancel post a ${categoryBTN}`: `Post a ${categoryBTN}` }
        </button>
        <button style={styles.dangerButton}>
          Button 3
        </button>
      </div>

      {/* ==================== Delete By ID Section ==================== */}
      {user?.isAdmin && (
        <div style={styles.deleteSection}>
          <input
            placeholder='Enter Product ID'
            type='text'
            value={deleteProductId}
            onChange={(e) => setDeleteProductId(e.target.value)}
            style={styles.inputSearch}
          />
          <button onClick={() => handleDeleteById("123")} style={styles.successButton}>
            Delete {category?.slice(0, -1)} by id
          </button>
        </div>
      )}

      {/* ==================== Forms Section ==================== */}
      {postProduct && user?.isAdmin && category === "mobiles" && (<MobileForm />)}
      {postProduct && user?.isAdmin && category === 'laptops' && (<LaptopForm />)}
      {postProduct && user?.isAdmin && category === 'chromebooks' && (<ChromebookForm />)}
      {postProduct && user?.isAdmin && category === 'smartwatches' && (<SmartwatchForm />)}
      {postProduct && user?.isAdmin && category === 'accessories' && (<AccessorieForm />)}

      {/* ==================== Product Cards ==================== */}
      <div style={styles.productList}>
        {Array.isArray(productData) && productData.length > 0 ? (
          productData.map((product) => (
            <div key={product._id} style={styles.card}>
              <img
                src={product.image_url}
                alt={product.title}
                style={styles.image}
              />
              <h2 style={styles.title}>{product.title}</h2>
              <p style={styles.price}><strong>Price:</strong> {product.price} PKR</p>
              <button onClick={() => handleDeleteById(product._id)} style={styles.deleteButton}>
                Delete
              </button>
              <button
                onClick={() => {
                  if (category === 'accessories') {
                    navigate(`/${category}/accessorydetails/${product.brand}/${product.title}/${product._id}`);
                  } else {
                    navigate(`/${category}/${category?.slice(0, -1)}details/${product.brand}/${product.title}/${product._id}`);
                  }
                }}
                style={styles.detailsButton}
              >
                Show details
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>No {category} available.</p>
        )}
      </div>
    </>
  );
};

// ==================== Styles Object ====================
const styles = {
  buttonRow: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  primaryButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  dangerButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
 
  deleteSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px'
  },
  inputSearch: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '200px',
    margin:'0'
  },
   successButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '260px',
    height: '480px',
    padding: '10px',
    backgroundColor: '#fff',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.3)',
  },
  image: {
    height: '260px',
    width: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '10px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#222',
    margin: '6px 0',
    height: '60px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    lineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  price: {
    fontSize: '14px',
    color: '#444',
    margin: '6px 0 0',
    height: '15px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  detailsButton: {
    backgroundColor: "#007bff",
    marginTop: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    color: "white",
    border: "none",
    padding: '8px 15px',
  }
};
export default ViewProductList;
