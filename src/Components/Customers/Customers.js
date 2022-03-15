import React, { useEffect, useState } from "react";
import Topbar from "../Sidebar/Topbar";
import { useSelector } from "react-redux";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import axios from "axios";
import { columns, dummy } from "./TableConfig";
import {
  BootstrapTableHelper,
  BootstrapTableHelperTest,
  catchError,
} from "../HelperCells";
import Paper from "@mui/material/Paper";

const Customers = (props) => {
  document.body.style.backgroundColor = "rgba(173, 173, 173, 0.2)";
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [allCustomerReps, setAllCustomerReps] = useState();
  const [allCustomers, setAllCustomers] = useState();
  const [allOperationsTeams, setAllOperationsTeams] = useState();
  const [rowDetails, setRow] = useState(0);
  const user = useSelector((state) => state.Login);

  useEffect(() => {
    if (!user.auth) {
      props.history.push("/");
    }
    allCustomerList();
    customerReps();
    if (user.role == "Customer Operations") {
      allOperationsTeamList();
    }
  }, []);
  // Fetch Customer Data function
  const allCustomerList = () => {
    axios
      .get("http://localhost:5000/api/customer")
      .then((res) => {
        setAllCustomers(res.data.customerList);
        setShowAddModal(false);
      })
      .catch((err) => {
        catchError(err);
      });
  };
  const customerReps = () => {
    axios
      .get("http://localhost:5000/api/customer-rep")
      .then((res) => {
        setAllCustomerReps(res.data.customerRepList);
      })
      .catch((err) => {
        catchError(err);
      });
  };
  const allOperationsTeamList = () => {
    axios
      .post("http://localhost:5000/api/operations-team", user)
      .then((res) => {
        const OTreps = res.data.operationsTeamList.map((item) => {
          return item.name;
        });
        console.log("OTreps", OTreps);
        setAllOperationsTeams(res.data.operationsTeamList);
      })
      .catch((err) => {
        catchError(err);
      });
  };
  console.log("allOperationsTeams", allOperationsTeams);
  // Modal box Open function via state change
  const openAddModal = () => {
    setShowAddModal(true);
  };
  // Add Modal box Cancel function
  const handleCancel = () => {
    setShowAddModal(false);
  };
  // Edit Modal box Cancel function
  const handleEditCancel = () => {
    setShowEditModal(!showEditModal);
  };
  const myFilteredData =
    allCustomers &&
    allCustomers.filter(
      (item) =>
        user.role == "admin" ||
        (user.role == "customerRep" && user.name == item.customerRep) ||
        (user.role == "Customer Operations" && item.customerRep)
    );
  const myData =
    myFilteredData &&
    myFilteredData.map((item, i) => ({
      _id: item._id,
      customerFullName: item.customerFullName,
      shippingManager: item.shippingManager,
      phone: item.phone,
      email: item.email,
      accountPayable: item.accountPayable,
      accountPayableEmail: item.accountPayableEmail,
      customerRep: item.customerRep,
    }));
  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log("e, row, rowIndex", e, row, rowIndex);
      setRow(row);
      setShowEditModal(true);
    },
  };
  return (
    <div className="customers">
      <div className="tableContent">
        <Topbar />
        <Paper
          elevation={3}
          sx={{
            margin: "2%",
            height: "auto",
            paddingBottom: "20px",
            width: "1310px",
          }}
        >
          <BootstrapTableHelper
            myData={myData ? myData : dummy}
            columns={columns}
            tableRowEvents={tableRowEvents}
          />
        </Paper>
        <button className="addButton" onClick={() => openAddModal()}>
          Add Customers
        </button>
      </div>
      {showAddModal && (
        <AddCustomer
          showAddModal={showAddModal}
          handleCancel={() => handleCancel()}
          allCustomerList={() => allCustomerList()}
          customerRep={user}
          allCustomerReps={allCustomerReps}
        />
      )}
      {showEditModal && (
        <EditCustomer
          showEditModal={showEditModal}
          CustomerDetail={rowDetails}
          handleEditCancel={() => handleEditCancel()}
          allCustomerList={() => allCustomerList()}
          customerRep={user}
          allCustomerReps={allCustomerReps}
        />
      )}
    </div>
  );
};

export default Customers;
