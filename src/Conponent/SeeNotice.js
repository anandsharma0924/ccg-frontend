import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper } from "@mui/material";
import TableViewTemplate from "./TableViewTemplate";

const SeeNotice = () => {
  const [noticesList, setNoticesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/notice/all");
        if (result.data.length > 0) {
          setNoticesList(result.data);
        } else {
          setResponse(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (error) {
    console.log(error);
  }

  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "details", label: "Details", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const noticeRows = noticesList.map((notice) => {
    const date = new Date(notice.date);
    const dateString =
      date.toString() !== "Invalid Date"
        ? date.toISOString().substring(0, 10)
        : "Invalid Date";
    return {
      title: notice.title,
      details: notice.details,
      date: dateString,
      id: notice._id,
    };
  });

  return (
    <div style={{ marginTop: "50px", marginRight: "20px" }}>
      {loading ? (
        <div style={{ fontSize: "20px" }}>Loading...</div>
      ) : response ? (
        <div style={{ fontSize: "20px" }}>No Notices to Show Right Now</div>
      ) : (
        <>
          <h3 style={{ fontSize: "30px", marginBottom: "40px" }}>Notices</h3>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {Array.isArray(noticesList) && noticesList.length > 0 && (
              <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
            )}
          </Paper>
        </>
      )}
    </div>
  );
};

export default SeeNotice;
