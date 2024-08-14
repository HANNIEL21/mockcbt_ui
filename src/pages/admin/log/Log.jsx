import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import axios from "axios";
import { baseApiUrl } from "../../../utils/constants";

const Log = () => {
  const [logs, setLogs] = useState([]);


  useEffect(()=>{
    const fetch = async ()=>{
      const req = await axios.get(`${baseApiUrl}/log.php`);
      console.log(req.data);
      setLogs(req.data);
      
    }
    
    fetch();
  },[])

  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "USER",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "EVENT",
      selector: (row) => row.event,
      sortable: true,
    },
    {
      name: "TIME",
      selector: (row) => row.created_at,
    },
  ];

  return (
    <div className="bg-white h-full rounded-lg shadow-md p-4">
      <Table
        title={"LOG"}
        label={column}
        data={logs}
        filter={"id"}
        showFilter={true}
      />
    </div>
  );
};

export default Log;
