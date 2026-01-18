import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { getEmployees, addEmployee, deleteEmployee, updateEmployee } from '../services/api';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    department: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchEmployees();
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees(searchTerm);
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (employee = null) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({
        full_name: employee.full_name,
        email: employee.email,
        department: employee.department
      });
    } else {
      setEditingEmployee(null);
      setFormData({
        full_name: '',
        email: '',
        department: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setFormData({
      full_name: '',
      email: '',
      department: ''
    });
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
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, formData);
        alert('Employee updated successfully');
      } else {
        await addEmployee(formData);
        alert('Employee added successfully');
      }
      handleCloseModal();
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Failed to save employee');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        alert('Employee deleted successfully');
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Add Employee
        </button>
      </div>

      <div className="form-control">
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className='capitalize'>{employee.empid}</td>
                    <td className='capitalize'>{employee.full_name}</td>
                    <td className='lowercase'>{employee.email}</td>
                    <td className='capitalize'>{employee.department}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleOpenModal(employee)}
                        >
                          Update
                        </button>
                        <button
                          class="btn btn-error btn-sm"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-2xl mb-6">
              {editingEmployee ? 'Update Employee' : 'Add New Employee'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="label p-0">
                  <span className="label-text font-semibold text-base">Full Name</span>
                  <span className="label-text-alt text-error text-base">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="input input-bordered w-full focus:input-primary focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="label p-0">
                  <span className="label-text font-semibold text-base">Email</span>
                  <span className="label-text-alt text-error text-base">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="employee@example.com"
                  className="input input-bordered w-full focus:input-primary focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="label p-0">
                  <span className="label-text font-semibold text-base">Department</span>
                  <span className="label-text-alt text-error text-base">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g., IT, HR, Finance"
                  className="input input-bordered w-full focus:input-primary focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="flex gap-3 justify-end pt-6 border-t border-base-200 mt-8">
                <button type="button" className="btn btn-ghost hover:bg-base-200" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-8">
                  {editingEmployee ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
