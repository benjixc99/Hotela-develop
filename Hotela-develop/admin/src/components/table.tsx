import { Table, TableData } from "@mantine/core";

import React from "react";

const tableData: TableData = {
  caption: "Recent Bookings",
  head: ["Name", "Room", "Check-in", "Check-out"],
  body: [
    ["John Doe", 102, "10/04/2024", "16/04/2024"],
    ["Value Curry", 106, "04/04/2024", "8/04/2024"],
    ["Clement Iken", 208, "29/03/2024", "01/04/2024"],
    ["Maris Elish", 209, "27/03/2024", "02/04/2024"],
    ["Clemon King", 303, "25/03/2024", "29/03/2024"],
    ["Cole Palmer", 203, "25/03/2024", "27/03/2024"],
    ["Uchiha Madara", 104, "24/03/2024", "26/03/2024"],
  ],
};

const TableProps: React.FC = () => {
  return <Table striped data={tableData} />;
};

export default TableProps;
