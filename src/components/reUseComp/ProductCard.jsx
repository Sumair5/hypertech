import styles from "../../stylecss/ProductCard.module.css";
const ProductCard = ({ product, onClick, refProp }) => {
  return (
    <div
      className={styles.productCard}
      onClick={() => onClick(product.brand, product.title, product._id)}
      ref={refProp}
    >
      <div className={styles.productImageContainer}>
        <img
          src={product.image_url}
          alt={product?.title || "Mobile Phone"}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productInfo}>
        <h6>{product.brand}</h6>
        <h2>{product.title}</h2>
        <p><strong>RS:</strong> {product.price} PKR</p>
      </div>
    </div>
  )
}

export default ProductCard
