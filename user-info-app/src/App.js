import React, { useState } from 'react';
import UserTable from './Components/UserTable';
import ExportToExcel from './Components/ExportToExcel';
import AddUserForm from './Components/AddUserForm';

const App = () => {
    const [users, setUsers] = useState([
        { name: 'John Doe', email: 'john.doe@example.com', age: 28 },
        { name: 'Jane Smith', email: 'jane.smith@example.com', age: 34 },
        { name: 'Sam Johnson', email: 'sam.johnson@example.com', age: 23 }
    ]);

    const addUser = (user) => {
      setUsers([...users, user]);
  };

    return (
        <div style={{ padding: '20px' }}>
            <h1>User Information</h1>
            <AddUserForm addUser={addUser} />
            <UserTable users={users} />
            <ExportToExcel users={users} />
        </div>
    );
};

export default App;