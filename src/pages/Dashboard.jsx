import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { getDashboard } from '../services/api';
import { FaUsers } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FcVoicePresentation } from "react-icons/fc";


const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const dashboardData = await getDashboard();
      setData(dashboardData);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 w-full flex flex-col gap-6 items-center">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <FaUsers className="inline-block w-8 h-8" />
          </div>
          <div className="stat-title">Total Employees</div>
          <div className="stat-value text-primary">{data?.summary?.total_employees || 0}</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-success">
            <FcVoicePresentation className="inline-block w-8 h-8" />
          </div>
          <div className="stat-title">Present Today</div>
          <div className="stat-value text-success">{data?.summary?.present_today || 0}</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-error">
            <RxCross2 className="inline-block w-8 h-8" />
          </div>
          <div className="stat-title">Absent Today</div>
          <div className="stat-value text-error">{data?.summary?.absent_today || 0}</div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Employee Overview</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Total Present</th>
                  <th>Total Absent</th>
                  <th>Last Attendance</th>
                </tr>
              </thead>
              <tbody>
                {data?.employees?.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.empid}</td>
                    <td>{emp.full_name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                      <span className="badge badge-success">{emp.total_present}</span>
                    </td>
                    <td>
                      <span className="badge badge-error">{emp.total_absent}</span>
                    </td>
                    <td>
                      {emp.last_attendance_date 
                        ? new Date(emp.last_attendance_date).toLocaleDateString() 
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
