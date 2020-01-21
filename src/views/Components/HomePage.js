import React from "react";
// nodejs library that concatenates classes
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function HomePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  var isLoggedIn = false;
  var bodyComponent = null;

  if (isLoggedIn) {
    bodyComponent = <Button>Moncul</Button>;
  }

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
      <Parallax image={require("assets/img/bg8.jpg")} className={classes.fullSize}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Homemade food for delivery.</h1>
                <h3 className={classes.subtitle}>
                  Help us get to know you.
                </h3>
              </div>
            </GridItem>
            <GridItem>
              <Link to="consumer">
                <Button color="info" className={classes.button}>I want to buy</Button>
              </Link>
              <Link to="producer">
                <Button color="info" className={classes.button}>I want to sell</Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Footer />
    </div>
  );
}
