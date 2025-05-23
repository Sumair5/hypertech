import React from 'react'

const Footer = () => {
  return (
    <footer style={{ background: "#333", color: "white", textAlign: "center", padding: "6px", margin: 0, width: "100%" }}>
      <p>© {new Date().getFullYear()} HyperTech. All rights reserved.</p>
    </footer>



  )
}

export default Footer