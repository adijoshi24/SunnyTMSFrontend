import React, { useEffect, useState } from "react";
import AddLoad from "./AddLoad";
import Topbar from "../Sidebar/Topbar";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import EditLoad from "./EditLoad";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { columns, dummy } from "./TableConfig";
import {
  BootstrapTableHelper,
  BootstrapTableHelperTest,
  catchError,
} from "../HelperCells";
import Paper from "@mui/material/Paper";
const Loads = (props) => {
  document.body.style.backgroundColor = "rgba(173, 173, 173, 0.2)";
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [allLoads, setAllLoads] = useState();
  const [allCustomers, setAllCustomers] = useState();
  const [allCustomerReps, setAllCustomerReps] = useState();
  const [rowIndex, setRowIndex] = useState(0);
  const [id, setId] = useState(0);
  const user = useSelector((state) => state.Login);
  useEffect(() => {
    if (!user.auth) {
      props.history.push("/");
    }
    loads();
    allCustomerList();
    customerReps();
  }, []);
  // calls the Loads API. list of Loads saved in DB
  const loads = () => {
    axios
      .post("http://localhost:5000/api/load", user)
      .then((res) => {
        setAllLoads(res.data.loadList);
        setShowAddModal(false);
        console.log("allLoads", allLoads, res.data.loadList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  // Modal box Open function via state change
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
  const myFilteredData =
    allLoads &&
    allLoads.filter(
      (item) =>
        user.role == 1 ||
        (user.role == 2 && user.name == item.customerRep) ||
        user.role == "Carrier Operations" ||
        user.role == "After Hour Operations"
    );
  const myData =
    myFilteredData &&
    myFilteredData.map((item, i) => ({
      loadId: item.loadID,
      customerRep: item.customerRep,
      drop: `${item.dropCity}, ${
        item.dropState && item.dropState.split(",")[0]
      }`,
      dropDate: item.dropDate,
      pick: `${item.pickCity}, ${
        item.pickState && item.pickState.split(",")[0]
      }`,
      pickDate: item.pickDate,
      status: item.status,
      customer: item.customerName,
    }));
  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      setRowIndex(rowIndex);
      setShowEditModal(true);
      setId(allLoads[rowIndex]._id);
    },
  };
  return (
    <div className="loads">
      <div className="tableContent">
        <Topbar />
        <Paper
          elevation={3}
          sx={{
            margin: "2%",
            height: "auto",
            paddingBottom: "20px",
            width: "1080px",
          }}
        >
          <BootstrapTableHelper
            myData={myData ? myData : dummy}
            columns={columns}
            tableRowEvents={tableRowEvents}
          />
        </Paper>
        <button className="addButton" onClick={() => openAddModal()}>
          Add Load
        </button>
      </div>
      {showAddModal && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AddLoad
            showAddModal={showAddModal}
            allCustomers={allCustomers}
            handleCancel={() => handleCancel()}
            loads={() => loads()}
            customerRep={user}
            allCustomerReps={allCustomerReps}
          />
        </LocalizationProvider>
      )}
      {showEditModal && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <EditLoad
            showEditModal={showEditModal}
            allCustomers={allCustomers}
            LoadDetail={allLoads[rowIndex]}
            handleEditCancel={() => handleEditCancel()}
            id={id}
            loads={() => loads()}
            customerRep={user}
            allCustomerReps={allCustomerReps}
          />
        </LocalizationProvider>
      )}
    </div>
  );
};

export default Loads;
