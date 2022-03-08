import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddCustomerRep from "./AddCustomerRep";
import EditModal from "./EditModal";
import axios from "axios";
import Topbar from "../Sidebar/Topbar";
import { columns, dummy } from "./TableConfig";
import Paper from "@mui/material/Paper";
import {
  BootstrapTableHelper,
  BootstrapTableHelperTest,
  catchError,
} from "../HelperCells";

const CustomerReps = (props) => {
  document.body.style.backgroundColor = "rgba(173, 173, 173, 0.2)";
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [allCustomerReps, setAllCustomerReps] = useState();
  const [allCustomers, setAllCustomers] = useState();
  const [rowIndex, setRowIndex] = useState(0);
  const user = useSelector((state) => state.Login);
  useEffect(() => {
    if (!user.auth) {
      props.history.push("/");
    }
    customerReps();
  }, []);
  // calls the Customer Reps API. list of Customer Reps saved in DB
  const customerReps = () => {
    axios
      .get("http://localhost:5000/api/customer-rep")
      .then((res) => {
        console.log("res", res.data.customerRepList);
        setAllCustomerReps(res.data.customerRepList);
        // setShowAddModal(false);
      })
      .catch((err) => {
        catchError(err);
      });
  };
  const openAddModal = () => {
    setShowAddModal(true);
  };
  // Modal box Cancel function
  const handleCancel = () => {
    setShowAddModal(false);
  };
  // Edit Modal box Cancel function
  const handleEditCancel = () => {
    setShowEditModal(false);
  };

  const myData =
    allCustomerReps &&
    allCustomerReps.map((item, i) => ({
      role: item.role == "customerRep" ? "Customer Rep" : item.role,
      name: item.name,
      phone: item.phone,
      email: item.email,
    }));
  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      setRowIndex(rowIndex);
      setShowEditModal(true);
    },
  };
  const rowStyle = (row, rowIndex) => {
    return {
      border: "none",
      borderBottom: "1px solid #b5c7da",
      height: "40px",
      verticalAlign: "middle",
    };
  };
  console.log("myData", myData && myData.length);
  return (
    <div className="customerReps">
      <div className="tableContent">
        <Topbar />
        <Paper
          elevation={3}
          sx={{
            margin: "2%",
            height: "auto",
            paddingBottom: "20px",
          }}
        >
          <BootstrapTableHelper
            myData={myData ? myData : dummy}
            columns={columns}
            tableRowEvents={tableRowEvents}
          />
        </Paper>
        <button className="addButton" onClick={() => openAddModal()}>
          Add Rep
        </button>
      </div>
      {showAddModal && (
        <AddCustomerRep
          showAddModal={showAddModal}
          handleCancel={() => handleCancel()}
          customerRepsList={() => customerReps()}
          customerRep={user.name}
        />
      )}
      {showEditModal && (
        <EditModal
          showEditModal={showEditModal}
          customerRep={allCustomerReps[rowIndex]}
          handleEditCancel={() => handleEditCancel()}
          customerReps={() => customerReps()}
        />
      )}
    </div>
  );
};

export default CustomerReps;
