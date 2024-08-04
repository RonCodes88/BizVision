import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
} from "@mui/material";
import {
  Edit as EditIcon,
  DeleteForever as DeleteIcon,
} from "@mui/icons-material";
import { useState } from "react";
import CartTable from "./CartTable";

const TableCellStyle = {
  color: "white",
  fontWeight: "bold",
};
function InventoryTable(props) {
  const [cartItems, setCartItems] = useState([]);

  const toggleAddToCart = (id) => {
    const item = props.inventory.find((item) => item.id === id);
    if (cartItems.some((cartItem) => cartItem.id === id)) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
    } else {
      setCartItems([...cartItems, item]);
    }
  };
  return (
    <div className="flex flex-col items-center w-full">
      {props.inventory.length > 0 && (
        <TableContainer sx={props.tableStyle} component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#bf9e28 " }}>
              <TableRow>
                <TableCell sx={TableCellStyle} align="right">
                  Name
                </TableCell>
                <TableCell sx={TableCellStyle} align="right">
                  Price
                </TableCell>
                <TableCell sx={TableCellStyle} align="right">
                  Quantity
                </TableCell>
                <TableCell sx={TableCellStyle} align="right">
                  Location
                </TableCell>
                <TableCell sx={TableCellStyle} align="right"></TableCell>
                <TableCell sx={TableCellStyle} align="right">
                  Add to Cart
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.inventory.map((item) => (
                <TableRow hover key={item.id}>
                  <TableCell
                    onClick={() => {
                      props.viewItem(item.id);
                    }}
                    align="right"
                  >
                    {item.name}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      props.viewItem(item.id);
                    }}
                    align="right"
                  >
                    {item.price}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      props.viewItem(item.id);
                    }}
                    align="right"
                  >
                    {item.quantity}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      props.viewItem(item.id);
                    }}
                    align="right"
                  >
                    {item.location}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        props.editItem(item.id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        props.deleteItem(item.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox
                      checked={cartItems.some(
                        (cartItem) => cartItem.id === item.id
                      )}
                      onChange={() => toggleAddToCart(item.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      )}
      <div className="w-full mt-32">
        <CartTable tableStyle={props.tableStyle} iconStyle={props.iconStyle} tableCellStyle={props.tableCellStyle} cartItems={cartItems} />
      </div>
    </div>
  );
}

InventoryTable.propTypes = {
  inventory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  viewItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  tableStyle: PropTypes.object,
};

export default InventoryTable;
