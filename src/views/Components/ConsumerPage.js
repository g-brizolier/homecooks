import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Card from "components/Card/Card.js";
import CardFooter from "components/Card/CardFooter.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "components/CustomButtons/Button.js";
import Close from "@material-ui/icons/Close";
import Zoom from '@material-ui/core/Zoom';
import DialogActions from "@material-ui/core/DialogActions";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import dishesData from 'assets/json/dishes.json'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

function getDataInCategory(category) {
  let newArray = dishesData.filter(
    el => el.type == category
  );
  console.log(newArray);

  return newArray;
}

export function ImageGrid(props) {
  var navImageClasses = props.navImageClasses;
  var dishes = props.dishes;
  var classes = props.classes;
  const [classicModal, setClassicModal] = React.useState(false);
  return (
    <React.Fragment>
      {[0, 5, 11].map(x => {
        return (
        <GridItem xs={12} sm={12} md={4}>
        {[1, 2, 3, 4].map(y => {
          var index = x+y;
          return (
            <React.Fragment>
              <Card>
                  <img
                    alt="..."
                    src={dishes[index].image}
                    className={navImageClasses}
                    onClick={() => setClassicModal(true)}
                  />
                <CardFooter style={{marginTop: "-10%"}}>
                  <GridContainer justify="center">
                    <GridItem xs={12}>
                      <h3>{dishes[index].name}</h3>
                      <Button color="info">Buy {dishes[index].price/100}$</Button>
                    </GridItem>
                  </GridContainer>
                </CardFooter>
              </Card>
              <Dialog
                classes={{
                  root: classes.center,
                  paper: classes.modal
                }}
                open={classicModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setClassicModal(false)}
              >
                <DialogTitle
                  id="classic-modal-slide-title"
                  disableTypography
                  className={classes.modalHeader}
                >
                  <IconButton
                    className={classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => setClassicModal(false)}
                  >
                    <Close className={classes.modalClose} />
                  </IconButton>
              <h4 className={classes.modalTitle}>{dishes[index].name}</h4>
                </DialogTitle>
                <DialogContent
                  id="classic-modal-slide-description"
                  className={classes.modalBody}
                >
                  <p>
                    {dishes[index].description}
                  </p>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                  <Button color="transparent" simple>
                    BUY
                  </Button>
                  <Button
                    onClick={() => setClassicModal(false)}
                    color="danger"
                    simple
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          );
        })}
        </GridItem>
        );
      })}
    </React.Fragment>
  );
}


export default function ConsumerPage(props) {

  const classes = useStyles();
  const { ...rest } = props;

  const dishTypes = ["Main", "Soup", "Salad", "Dessert", "Snack"];
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  getDataInCategory("Main");

  return (
    <div>
      <Header
        color="transparent"
        brand="Homecooks"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <div className={classes.main}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <div style={{marginTop: "10vh"}}>
              </div>
              <NavPills
                alignCenter
                color="info"
                tabs={dishTypes.map(function(type) {
                  var dishes = getDataInCategory(type);
                  return (
                    {
                      tabButton: type,
                      tabContent: (
                        <GridContainer justify="center" className={classes.gridContainer}>
                          <ImageGrid
                            dishes={dishes}
                            navImageClasses={navImageClasses}
                            classes={classes}
                          />
                        </GridContainer>
                      )
                    }
                  );
                })}
              />
              {/* </GridItem> */}
            </GridContainer>
          </div>
      </div>
      <Footer />
    </div>
  );
}