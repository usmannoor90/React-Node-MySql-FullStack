import React from "react";

import department from "../pics/departments.jpg";
import employee from "../pics/emplyees.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
      <Link
        to={"/department"}
        className="card  bg-base-100 shadow-xl image-full"
      >
        <figure>
          <img src={department} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Departments</h2>
          <p>see all the Departments</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Departments</button>
          </div>
        </div>
      </Link>
      <Link to={"/employee"} className="card  bg-base-100 shadow-xl image-full">
        <figure>
          <img src={employee} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Employees</h2>
          <p>see all the Employees</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Employess</button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Home;
