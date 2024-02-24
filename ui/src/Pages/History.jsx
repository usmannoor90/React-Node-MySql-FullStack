import React, { useEffect } from "react";
import { DashboardAPI } from "../API/DashboardApiLayer";
import { useDispatch } from "react-redux";
import { setuserhistory } from "../State/AuthSlice";

function History() {
  const dispatch = useDispatch();
  useEffect(() => {
    DashboardAPI.GetUserHistory()
      .then((res) => {
        dispatch(setuserhistory({ userhistory: res.data.data }));
      })
      .catch((err) => {});
  }, []);

  return <div>History</div>;
}

export default History;
