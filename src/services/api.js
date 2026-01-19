const API_BASE_URL = 'https://hr-management-green.vercel.app';
// const API_BASE_URL = 'http://localhost:5000';


// Employee API calls
export const getEmployees = async (search = '', page = 1, count = 20) => {
  const params = new URLSearchParams({ page, count });
  if (search) params.append('search', search);
  
  const response = await fetch(`${API_BASE_URL}/employees?${params}`);
  if (!response.ok) throw new Error('Failed to fetch employees');
  return response.json();
};

export const addEmployee = async (employeeData) => {
  const response = await fetch(`${API_BASE_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData)
  });
  if (!response.ok) throw new Error('Failed to add employee');
  return response.json();
};

export const updateEmployee = async (id, employeeData) => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData)
  });
  if (!response.ok) throw new Error('Failed to update employee');
  return response.json();
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete employee');
  return response.json();
};

// Attendance API calls
export const markAttendance = async (attendanceData) => {
  const response = await fetch(`${API_BASE_URL}/attendance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attendanceData)
  });
  if (!response.ok) throw new Error('Failed to mark attendance');
  return response.json();
};

export const getAttendanceByEmpId = async (empId, date = '') => {
  const params = new URLSearchParams();
  if (date) params.append('date', date);
  
  const response = await fetch(`${API_BASE_URL}/attendance/${empId}?${params}`);
  if (!response.ok) throw new Error('Failed to fetch attendance');
  return response.json();
};

export const getEmployeeStats = async (empId) => {
  const response = await fetch(`${API_BASE_URL}/attendance/${empId}/stats`);
  if (!response.ok) throw new Error('Failed to fetch employee stats');
  return response.json();
};

// Dashboard API call
export const getDashboard = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  if (!response.ok) throw new Error('Failed to fetch dashboard data');
  return response.json();
};
