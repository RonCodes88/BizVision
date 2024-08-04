import { useState } from "react";
import {
  Dialog,
  Grid,
  Button,
  TextField,
  DialogContent,
  IconButton,
  DialogActions,
} from "@mui/material";
import PropTypes from "prop-types";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

function NewItemDialog(props) {
  const [newDialog, setNewDialog] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState("");

  function toggleNewDialog() {
    setNewDialog(!newDialog);
    clearFields();
  }

  function changeQuantity(value) {
    if (quantity + value <= 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity + value);
    }
  }

  function clearFields() {
    setName("");
    setDescription("");
    setLocation("");
    setQuantity(0);
    setPrice("");
  }

  function addItem() {
    let array = [];
    array.push({
      id: props.inventory.length + 1,
      name,
      description,
      location,
      quantity,
      price,
    });
    toggleNewDialog();
    props.setInventory([...props.inventory, ...array]);
    console.log("Inventory array: ", props.inventory);
  }
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <button
        onClick={toggleNewDialog}
        className="bg-sky-900 hover:bg-sky-950 text-white font-bold py-4 px-8 rounded-full text-2xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mb-10"
      >
        Add Item
      </button>
      <Dialog open={newDialog} onClose={toggleNewDialog}>
        <DialogContent>
          <TextField
            label="Name"
            sx={props.textFieldStyle}
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Description"
            sx={props.textFieldStyle}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Location"
            sx={props.textFieldStyle}
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            label="Price"
            sx={props.textFieldStyle}
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Grid className="mt-4" sx={props.buttonGridStyle}>
            <IconButton sx={props.iconStyle} onClick={() => changeQuantity(-1)}>
              <RemoveIcon sx={props.iconStyle} />
            </IconButton>
            {quantity}
            <IconButton sx={props.iconStyle} onClick={() => changeQuantity(1)}>
              <AddIcon sx={props.iconStyle} />
            </IconButton>
          </Grid>
          <DialogActions>
            <Button onClick={toggleNewDialog}>Cancel</Button>
            <Button onClick={addItem}>Add</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

NewItemDialog.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  changeInfo: PropTypes.func.isRequired,
  editQuantity: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  textFieldStyle: PropTypes.object,
  buttonGridStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  inventory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      location: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  setInventory: PropTypes.func.isRequired,
};

export default NewItemDialog;
