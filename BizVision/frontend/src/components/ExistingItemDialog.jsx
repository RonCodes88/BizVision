import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

function ExistingItemDialog(props) {
  function changeInfo(id, field, value) {
    const newState = props.selectedItem.map((item) => {
      if (item.id === id && field !== "quantity") {
        return { ...item, [field]: value };
      } else {
        return item;
      }
    });
    props.setSelectedItem(newState);
  }

  function editQuantity(id, original, num) {
    const newState = props.selectedItem.map((item) => {
      if (original === 0 && num === -1) {
        console.log("unable to subtract further");
      } else if (item.id === id) {
        return { ...item, quantity: original + num };
      }
      return item;
    });
    props.setSelectedItem(newState);
  }

  return (
    <>
      <Dialog open={props.dialogExisting} onClose={props.toggleDialogExisting}>
        <DialogContent>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {props.selectedItem.map((item) => (
              <div key={item.id}>
                <TextField
                  label="Name"
                  sx={props.textFieldStyle}
                  variant="outlined"
                  value={item.name}
                  onChange={(e) => changeInfo(item.id, "name", e.target.value)}
                  InputProps={{ readOnly: props.readOnly }}
                />
                <TextField
                  label="Description"
                  sx={props.textFieldStyle}
                  variant="outlined"
                  value={item.description}
                  onChange={(e) =>
                    changeInfo(item.id, "description", e.target.value)
                  }
                  InputProps={{ readOnly: props.readOnly }}
                />
                <TextField
                  label="Location"
                  sx={props.textFieldStyle}
                  variant="outlined"
                  value={item.location}
                  onChange={(e) =>
                    changeInfo(item.id, "location", e.target.value)
                  }
                  InputProps={{ readOnly: props.readOnly }}
                />
                <Grid sx={props.buttonGridStyle}>
                  {props.readOnly === false && (
                    <IconButton
                      onClick={() => {
                        editQuantity(item.id, item.quantity, -1);
                      }}
                      sx={props.iconStyle}
                    >
                      <RemoveIcon sx={props.iconStyle} />
                    </IconButton>
                  )}
                  {props.readOnly === true && "Quantity:"} {item.quantity}
                  {props.readOnly === false && (
                    <IconButton
                      onClick={() => {
                        editQuantity(item.id, item.quantity, 1);
                      }}
                      sx={props.iconStyle}
                    >
                      <AddIcon sx={props.iconStyle} />
                    </IconButton>
                  )}
                  <DialogActions>
                    <Button onClick={props.toggleDialogExisting}>
                      {props.readOnly === true ? "Close" : "Cancel"}
                    </Button>
                    {props.readOnly === false && (
                      <Button
                        onClick={() => {
                          props.updateItem(item.id);
                        }}
                      >
                        Update
                      </Button>
                    )}
                  </DialogActions>
                </Grid>
              </div>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

ExistingItemDialog.propTypes = {
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
  selectedItem: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      location: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  dialogExisting: PropTypes.bool.isRequired,
  toggleDialogExisting: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
};

export default ExistingItemDialog;
