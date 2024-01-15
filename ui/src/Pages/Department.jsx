import React, { useEffect, useState } from "react";
import axios from "axios";
import DepartmentTable from "../components/DepartmentTable";

function Department() {
  const [data, setData] = useState([]);

  const getDepartments = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}department/all/`)
        .then((res) => {
          // console.log(res);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const addDepartment = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}department/add/`)
        .then((res) => {
          // console.log(res);
          // setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4  [&>div]:rounded-[6px]  [&>div]:bg-[rgba(255,255,255,0.06)] [&>div]:p-5 [&>div]:border-[rgba(159,159,159,0.2)] [&>div]:border-[1px] mt-4">
      <div>
        <div className="[&>p]:capitalize flex justify-between items-center">
          <p className="  mb-0  ">departments</p>
          <button
            className="text-[14px] font-light leading-[18px] tracking-normal text-left text-white btn  capitalize"
            onClick={() => addDepartment()}
          >
            add a department
          </button>
        </div>
        <div className="mt-8">
          <DepartmentTable Data={data} />
        </div>
      </div>
    </div>
  );
}

export default Department;
