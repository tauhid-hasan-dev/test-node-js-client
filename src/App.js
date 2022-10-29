import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target
    const name = form.name.value;
    const email = form.email.value;
    console.log(name, email)

    const user = { name, email }

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        const newUsers = [...users, data]
        setUsers(newUsers)

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" placeholder='Your name' />
        <br />
        <input type="email" name="email" id="" placeholder='Your Email' />
        <br />
        <button>Add new user</button>
      </form>
      <div>
        {
          users.map(u => <p key={u.id}>{u.name}:{u.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;
