import React, { useEffect, useState } from "react";
import Topbar from "../Sidebar/Topbar";
import { useSelector } from "react-redux";
import AddOTModal from "./AddOTModal";
import EditOTModal from "./EditOTModal";
import axios from "axios";
import { columns, dummy } from "./TableConfig";
import {
  axiosGetHelper,
  BootstrapTableHelper,
  BootstrapTableHelperTest,
  catchError,
} from "../HelperCells";
import Paper from "@mui/material/Paper";
const OperationsTeam = (props) => {
  document.body.style.backgroundColor = "rgba(173, 173, 173, 0.2)";
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [allOperationsTeams, setAllOperationsTeams] = useState();
  const [allCustomerReps, setAllCustomerReps] = useState();
  const [rowIndex, setRowIndex] = useState(0);
  const user = useSelector((state) => state.Login);

  useEffect(() => {
    if (!user.auth) {
      props.history.push("/");
    }
    allOperationsTeamList();
    customerReps();
  }, []);
  // Fetch Customer Data function
  const allOperationsTeamList = () => {
    axios
      .post("http://localhost:5000/api/operations-team", user)
      .then((res) => {
        setAllOperationsTeams(res.data.operationsTeamList);
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
  // Add Modal box Cancel function
  const handleCancel = () => {
    setShowAddModal(false);
  };
  // Edit Modal box Cancel function
  const handleEditCancel = () => {
    setShowEditModal(false);
  };
  const myFilteredData =
    allOperationsTeams &&
    allOperationsTeams.filter(
      (item) =>
        user.role == "admin" ||
        (user.role == "customerRep" && user.name == item.customerRep)
    );
  const myData =
    myFilteredData &&
    myFilteredData.map((item, i) => ({
      role: item.role,
      name: item.name,
      phone: item.phone,
      email: item.email,
      customerRep: item.customerRep,
    }));
  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log("allOperationsTeams[rowIndex]", allOperationsTeams[rowIndex]);
      setRowIndex(rowIndex);
      setShowEditModal(true);
    },
  };
  return (
    <div className="operationsTeam">
      <div className="tableContent">
        <Topbar />
        <Paper
          elevation={3}
          sx={{
            margin: "2%",
            height: "auto",
            paddingBottom: "20px",
            width: "1090px",
          }}
        >
          <BootstrapTableHelper
            myData={myData ? myData : dummy}
            columns={columns}
            tableRowEvents={tableRowEvents}
          />
        </Paper>
        <button className="addButton" onClick={() => openAddModal()}>
          Add
        </button>
      </div>
      {showAddModal && (
        <AddOTModal
          showAddModal={showAddModal}
          handleCancel={() => handleCancel()}
          allOperationsTeamList={() => allOperationsTeamList()}
          customerRep={user}
          allCustomerReps={allCustomerReps}
        />
      )}
      {showEditModal && (
        <EditOTModal
          showEditModal={showEditModal}
          OperationsTeamDetail={allOperationsTeams[rowIndex]}
          handleEditCancel={() => handleEditCancel()}
          allOperationsTeamList={() => allOperationsTeamList()}
          id={allOperationsTeams[rowIndex]._id}
          customerRep={user}
          allCustomerReps={allCustomerReps}
        />
      )}
    </div>
  );
};

export default OperationsTeam;
