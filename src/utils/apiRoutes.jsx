// 🌐 Start of API Routes Helper File

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const BASE_URL = `https://hypertech-backend-production.up.railway.app/api`  ;


const apiRoutes = {
  ProductByIdURL: (category, id) => `${BASE_URL}/${category}/${id}`,    
  productsURL: (category) => `${BASE_URL}/${category}`,       

  // 📱 Mobile Routes
  allMobiles: () => `${BASE_URL}/mobiles`,                         // Get all mobiles
  MobileById: (id) => `${BASE_URL}/mobiles/${id}`,                // Get mobile by ID

  // 💻 Laptop Routes
  allLaptops: () => `${BASE_URL}/laptops`,                         // Get all laptops
  laptopById: (id) => `${BASE_URL}/laptops/${id}`,                // Get laptop by ID

  // 💻 Chromebook Routes
  allChromebooks: () => `${BASE_URL}/chromebooks`,               // Get all Chromebooks
  chromebookById: (id) => `${BASE_URL}/chromebooks/${id}`,       // Get Chromebook by ID

  // ⌚ Smartwatch Routes
  allSmartwatches: () => `${BASE_URL}/smartwatches`,               // Get all smartwatches
  smartwatchById: (id) => `${BASE_URL}/smartwatches/${id}`,        // Get smartwatch by ID

  // 🎧 Accessories Routes
  allAccessories: () => `${BASE_URL}/accessories`,               // Get all accessories
  accessoryById: (id) => `${BASE_URL}/accessories/${id}`,        // Get accessory by ID

  // 🛒 Order Routes
  createOrder: () => `${BASE_URL}/orders`,                        // Create a new order
  getOrders: (status) => `${BASE_URL}/orders?status=${status}`,  // Get orders by status
  deleteOrder: (orderId) => `${BASE_URL}/orders/${orderId}`,     // Delete order by ID
  updateOrderStatus: (orderId) => `${BASE_URL}/orders/${orderId}/status`, // Update order status

  // ⭐ Review Routes
  getReviews: (productId, category) => `${BASE_URL}/reviews/${productId}/${category}`,             // Get reviews
  postReview: () => `${BASE_URL}/reviews/comments`,                                                // Post new review
  adminReply: (productId, category, replyCommentId) => `${BASE_URL}/reviews/admin-reply/${productId}/${category}/${replyCommentId}`, // Admin reply
  deleteReview: (productId, category, commentId) => `${BASE_URL}/reviews/comments/${productId}/${category}/${commentId}`, // Delete review

  // 👤 User Routes
  getUserdata: () => `${BASE_URL}/users/profile`,               // Get logged in user's data
  loginUser: () => `${BASE_URL}/users/login`,                   // Login user
  registerUser: () => `${BASE_URL}/users/register`,             // Register new user
};

export default apiRoutes;

// 🌐 End of API Routes Helper File
