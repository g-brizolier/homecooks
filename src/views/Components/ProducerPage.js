import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import image from "assets/img/bg-pasta.jpg"
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Close from "@material-ui/icons/Close";
import Zoom from '@material-ui/core/Zoom';
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

export default function ProducerPage(props) {
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  var cachedDishes = JSON.parse(localStorage.getItem("dishes"));
  if (cachedDishes == null) {
    cachedDishes = {
      images: [[image, image, image], [image, image, image]],
      names: [["Your dish here", "Your dish here", "Your dish here" ], ["Your dish here", "Your dish here", "Your dish here" ]],
      qty: [[0, 0, 0], [0, 0, 0]]
    }
  }
  const [userDishes, setUserDishes] = React.useState(cachedDishes);
  const [tempName, setTempName] = React.useState("");
  const [tempQty, setTempQty] = React.useState(0);
  const [trigger, setTrigger] = React.useState(null);
  const { ...rest } = props;
  const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
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
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridContainer>
              {[0, 1, 2].map(col => {
                return (
                <GridItem xs={12} sm={4}>
                  {[0, 1].map(row => 
                    <React.Fragment>
                      <Card className={classes.card}>
                        <h4>{userDishes.names[row][col]}</h4>
                        <img
                          src={userDishes.images[row][col]}
                          alt="..."
                          className={classes.imgRounded + " " + classes.imgFluid}
                        />
                        <h5>Left: {userDishes.qty[row][col]}</h5>
                        <Button 
                          onClick={() => {
                            setClassicModal(true);
                            setTrigger({row: row, col: col});
                            console.log(`row: ${row}, col: ${col}`);
                          }}
                          color="info"
                        >
                          Add
                        </Button>
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
                          <h4 className={classes.modalTitle}>Add New Dish</h4>
                        </DialogTitle>
                        <DialogContent
                          id="classic-modal-slide-description"
                          className={classes.modalBody}
                        >
                          <input type="file" onChange={ (e) => {
                            var file = e.target.files[0];
                            if (file != null) {
                              getBase64(e.target.files[0]).then(base64 => setSelected(base64));
                            }
                            }} />
                          <img id="output"  width="50%" src={selected}/>
                          <CustomInput
                            labelText="Name of dish"
                            id="name"
                            onChange={(e) => setTempName(e.target.value)}
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              autoComplete: "off"
                            }}
                          />
                          <CustomInput
                            labelText="Price ($)"
                            id="price"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "number",
                              autoComplete: "off"
                            }}
                          />
                          <CustomInput
                            labelText="Quantity"
                            id="quantity"
                            onChange={(e) => setTempQty(e.target.value)}
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "number",
                              autoComplete: "off"
                            }}
                          />
                          <CustomInput
                            labelText="Ingredients"
                            id="ingredients"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                          <CustomInput
                            labelText="Tags"
                            id="tags"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </DialogContent>
                        <DialogActions className={classes.modalFooter}>
                          <Button color="transparent" simple onClick={() => {
                              setClassicModal(false);
                              console.log(selected);
                              var newDishes = userDishes;
                              newDishes.images[trigger.row][trigger.col] = selected;
                              newDishes.names[trigger.row][trigger.col] = tempName;
                              newDishes.qty[trigger.row][trigger.col] = tempQty;
                              setUserDishes(newDishes);
                              localStorage.setItem("dishes", JSON.stringify(newDishes));
                            }
                          }>
                            ADD
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </React.Fragment>
                    )}
                </GridItem>
                );
              })}
            </GridContainer>
          </GridContainer>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
