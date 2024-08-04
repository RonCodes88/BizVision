import { useState, useEffect } from "react";
import { createTheme } from "@mui/system";
import Grid from "@mui/material/Grid";
import NewItemDialog from "./NewItemDialog";
import InventoryTable from "./InventoryTable";
import ExistingItemDialog from "./ExistingItemDialog";

const theme = createTheme();

const buttonGridStyle = {
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
};

const textFieldStyle = {
  marginTop: theme.spacing(2),
  minWidth: "60%",
};

const iconStyle = {
  marginTop: theme.spacing(0.25),
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5),
};

const tableStyle = {
  marginTop: theme.spacing(2),
  width: "80%",
};

const Inventory = () => {
  const defaultItems = [
    {
      id: 1,
      name: "Swedish Massage",
      description:
        "A classic massage technique that uses long, flowing strokes, kneading, and circular movements to help relax muscles and improve circulation. Ideal for those new to massage or looking for a gentle, relaxing experience. Duration: 60 minutes",
      location: "Peace Chamber",
      quantity: 1,
      price: "70.00",
    },
    {
      id: 2,
      name: "Deep Tissue Massage",
      description: "Focuses on the deeper layers of muscle and connective tissue. This massage is perfect for relieving chronic tension and pain, using slower strokes and deeper pressure to target specific areas. Duration: 60 minutes",
      location: "Calm Oasis",
      quantity: 1,
      price: "90.00",
    },
    {
      id: 3,
      name: "Hot Stone Massage",
      description: "Involves the use of smooth, heated stones placed on specific parts of the body. The heat helps to relax muscles and improve blood flow, providing a deeply soothing and relaxing experience. Duration: 60 minutes",
      location: "Zen Zone",
      quantity: 1,
      price: "100.00",
    },
    {
      id: 4,
      name: "Sports Massage",
      description: "Designed for athletes or active individuals, this massage targets muscle groups used in sports. It helps improve flexibility, reduce the risk of injury, and enhance performance through a combination of techniques. Duration: 60 minutes",
      location: "Relaxation Palace",
      quantity: 1,
      price: "80.00",
    },
    {
      id: 5,
      name: "Aromatherapy Massage",
      description: "Combines the benefits of massage with the therapeutic properties of essential oils. Each oil is chosen to address specific concerns, such as relaxation, stress relief, or muscle tension, enhancing the overall experience. Duration: 60 minutes",
      location: "Serenity Suite",
      quantity: 1,
      price: "75.00",
    },
  ];
  const [inventory, setInventory] = useState(defaultItems);
  const [selectedItem, setSelectedItem] = useState([]);
  const [dialogExisting, setDialogExisting] = useState(false);
  const [readOnly, setReadOnly] = useState(true);

  // Load inventory from local storage when the component mounts
  useEffect(() => {
    const savedInventory = localStorage.getItem("inventory");
    if (savedInventory) {
      // console.log("Loading inventory from local storage:", savedInventory);
      setInventory(JSON.parse(savedInventory));
    }
  }, []);

  // Save inventory to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
    // console.log("inventory state", inventory);
  }, [inventory]);

  useEffect(() => {
    console.log("selectedItem state", selectedItem);
  }, [selectedItem]);

  function deleteItem(id) {
    setInventory(inventory.filter((item) => item.id !== id));
  }
  function editItem(id) {
    setReadOnly(false);
    setSelectedItem(inventory.filter((item) => item.id === id));
    setDialogExisting(true);
  }
  function viewItem(id) {
    setReadOnly(true);
    setSelectedItem(inventory.filter((item) => item.id === id));
    setDialogExisting(true);
  }

  function toggleDialogExisting() {
    setDialogExisting(!dialogExisting);
    setSelectedItem([]);
  }

  function updateItem(id) {
    let existingData = inventory.filter((item) => item.id !== id);
    setInventory([...existingData, ...selectedItem]);
    setDialogExisting(false);
  }

  return (
    <>
      <Grid container justifyContent="center" alignContent="center">
        <h1 className="text-8xl font-bold mb-10 mt-10">Inventory</h1>

        <NewItemDialog
          textFieldStyle={textFieldStyle}
          iconStyle={iconStyle}
          buttonGridStyle={buttonGridStyle}
          inventory={inventory}
          setInventory={setInventory}
        />
        <ExistingItemDialog
          dialogExisting={dialogExisting}
          selectedItem={selectedItem}
          textFieldStyle={textFieldStyle}
          buttonGridStyle={buttonGridStyle}
          toggleDialogExisting={toggleDialogExisting}
          setSelectedItem={setSelectedItem}
          readOnly={readOnly}
          updateItem={updateItem}
        />

        <InventoryTable
          inventory={inventory}
          tableStyle={tableStyle}
          deleteItem={deleteItem}
          editItem={editItem}
          viewItem={viewItem}
        />
      </Grid>
    </>
  );
};

export default Inventory;
