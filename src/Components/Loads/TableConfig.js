import moment from "moment";

const dateFormatter = (cell, row) => {
  if (row.pickDate || row.dropDate) {
    return <span>{moment(cell).format("MM/yyyy")}</span>;
  }

  return <span>{cell}</span>;
};
export const columns = [
  {
    dataField: "loadId",
    text: "Load Number",
    headerStyle: {
      backgroundColor: "#F6F9FC",
      // fontFamily: "Open Sans, SemiBold",
      color: "#8898AA",
      fontWeight: "normal",
      border: "none",
      width: "100px",
    },
    // sort: true,
    // headerStyle: () => {
    //   return { width: "10%" };
    // },
  },
  {
    dataField: "status",
    text: "Status",
    headerStyle: {
      backgroundColor: "#F6F9FC",
      color: "#8898AA",
      fontWeight: "normal",
      border: "none",
      width: "140px",
    },
    // headerStyle: () => {
    //   return { width: "10%" };
    // },
  },
  {
    dataField: "pickDate",
    text: "Pick Date",
    // sort: true,
    formatter: dateFormatter,
    headerStyle: {
      backgroundColor: "#F6F9FC",
      color: "#8898AA",
      fontWeight: "normal",
      border: "none",
      width: "80px",
    },
  },
  {
    dataField: "pick",
    text: "Pickup City/State",
    // sort: true,
    headerStyle: {
      backgroundColor: "#F6F9FC",
      color: "#8898AA",
      fontWeight: "normal",
      border: "none",
      width: "180px",
    },
  },
  {
    dataField: "drop",
    text: "Drop City/State",
    headerStyle: {
      backgroundColor: "#F6F9FC",
      color: "#8898AA",
      fontWeight: "normal",
      border: "none",
      width: "180px",
    },
  },
  {
    dataField: "dropDate",
    text: "Drop date",
    // sort: true,
    formatter: dateFormatter,
    headerStyle: {
      backgroundColor: "#F6F9FC",
      color: "#8898AA",
      fontWeight: "normal",
      border: "none",
      width: "100px",
    },
  },
  {
    dataField: "customerRep",
    text: "Customer Rep",
    // sort: true,
    headerStyle: {
      backgroundColor: "#F6F9FC",
      color: "#8898AA",
      fontWeight: "normal",
      border: "none",
      width: "150px",
    },
  },
  {
    dataField: "customer",
    text: "Customer",
    // sort: true,
    headerStyle: {
      backgroundColor: "#F6F9FC",
      color: "#8898AA",
      fontWeight: "normal",
      border: "none",
      width: "150px",
    },
  },
];

export const dummy = [
  {
    loadId: "",
    customerRep: "",
    drop: "",
    dropDate: "",
    pick: "",
    pickDate: "",
    status: "",
  },
];
