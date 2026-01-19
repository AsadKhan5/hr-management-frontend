import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { getEmployees, markAttendance, getAttendanceByEmpId, getEmployeeStats } from '../services/api';

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [formData, setFormData] = useState({
    empId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  });
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      fetchAttendanceForEmployee();
      fetchEmployeeStats();
    }
  }, [selectedEmployee, filterDate]);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchAttendanceForEmployee = async () => {
    if (!selectedEmployee) return;
    setLoading(true);
    try {
      const data = await getAttendanceByEmpId(selectedEmployee, filterDate);
      setAttendance(data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeStats = async () => {
    if (!selectedEmployee) return;
    try {
      const data = await getEmployeeStats(selectedEmployee);
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await markAttendance(formData);
      alert('Attendance marked successfully');
      setFormData({
        empId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present'
      });
      if (selectedEmployee) {
        fetchAttendanceForEmployee();
        fetchEmployeeStats();
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Failed to mark attendance');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Attendance Management</h1>

      {/* Mark Attendance Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Mark Attendance</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Employee</span>
                </label>
                <select
                  name="empId"
                  value={formData.empId}
                  onChange={handleChange}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.empId}>
                      {emp.empId} - {emp.full_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="select select-bordered"
                  required
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Mark Attendance
            </button>
          </form>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">View Attendance Records</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Employee</span>
              </label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="select select-bordered"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.empId}>
                    {emp.empId} - {emp.full_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Filter by Date (Optional)</span>
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="input input-bordered"
              />
            </div>
          </div>

          {stats && (
            <div className="stats shadow w-full mb-4">
              <div className="stat">
                <div className="stat-title">Employee</div>
                <div className="stat-value text-sm">{stats.full_name}</div>
                <div className="stat-desc">{stats.empId}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Present</div>
                <div className="stat-value text-success">{stats.total_present}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Absent</div>
                <div className="stat-value text-error">{stats.total_absent}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Days</div>
                <div className="stat-value">{stats.total_days}</div>
              </div>
            </div>
          )}

          {loading ? (
            <Loader />
          ) : selectedEmployee ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.length > 0 ? (
                    attendance.map((record) => (
                      <tr key={record.id}>
                        <td>{new Date(record.date).toLocaleDateString()}</td>
                        <td>{record.empId}</td>
                        <td>{record.full_name}</td>
                        <td>{record.department}</td>
                        <td>
                          <span
                            className={`badge ${
                              record.status === 'Present'
                                ? 'badge-success'
                                : 'badge-error'
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No attendance records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">
              <span>Please select an employee to view attendance records</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
