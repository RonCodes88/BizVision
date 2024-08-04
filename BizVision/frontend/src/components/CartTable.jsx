import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import Payment from "./Payment";

const CartTable = ({ tableStyle, iconStyle, tableCellStyle, cartItems }) => {
  const [items, setItems] = useState(
    cartItems.map((item) => ({ ...item, quantity: 1 }))
  );

  useEffect(() => {
    const existingItemsMap = new Map(
      items.map((item) => [item.id, item.quantity])
    );
    const updatedItems = cartItems.map((item) => ({
      ...item,
      quantity: existingItemsMap.get(item.id) || 1,
    }));
    setItems(updatedItems);
  }, [cartItems]);

  const changeQuantity = (id, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + value) }
          : item
      )
    );
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-8xl font-bold mb-10">Your Cart</h1>
      <TableContainer sx={tableStyle} component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#244c70" }}>
            <TableRow>
              <TableCell sx={tableCellStyle} align="middle">
                Name
              </TableCell>
              <TableCell sx={tableCellStyle} align="middle">
                Price
              </TableCell>
              <TableCell sx={tableCellStyle} align="middle">
                Quantity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={tableCellStyle}>{item.name}</TableCell>
                  <TableCell sx={tableCellStyle}>{item.price}</TableCell>
                  <TableCell sx={tableCellStyle}>
                    <IconButton
                      sx={iconStyle}
                      onClick={() => changeQuantity(item.id, -1)}
                    >
                      <RemoveIcon sx={iconStyle} />
                    </IconButton>
                    {item.quantity}
                    <IconButton
                      sx={iconStyle}
                      onClick={() => changeQuantity(item.id, 1)}
                    >
                      <AddIcon sx={iconStyle} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell sx={tableCellStyle} colSpan={3} align="center">
                  No items in the cart
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell sx={tableCellStyle} colSpan={2} align="right">
                Total Price
              </TableCell>
              <TableCell sx={tableCellStyle}>
                ${totalPrice.toFixed(2)}
                
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-10">
      <Payment items={items} totalPrice={totalPrice.toFixed(2)} />
      </div>
      
    </div>
  );
};

CartTable.propTypes = {
  tableStyle: PropTypes.object.isRequired,
  iconStyle: PropTypes.object.isRequired,
  tableCellStyle: PropTypes.object.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CartTable;
