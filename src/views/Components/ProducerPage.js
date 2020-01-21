import React from "react";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

export default function HomePage(props) {
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="Homecooks"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      
      <Footer />
    </div>
  );
}
