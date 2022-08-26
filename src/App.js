import './App.css';
import React, {useEffect, useState} from 'react';
import { GET_ALL_USERS } from './query/user';
import { CREATE_USER, DELETE_USER } from './mutations/user';
import { useMutation, useQuery } from '@apollo/client';
import close from './assets/pics/close.png'
function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);
  const [createUser] = useMutation(CREATE_USER)
  const [deleteUser] = useMutation(DELETE_USER)
  const {data, loading,refetch} = useQuery(GET_ALL_USERS, {pollInterval: 500})

  useEffect(() => {
    if(!loading){
      setUsers(data.getAllUsers);
    }
  },[data, loading])

  console.log(age, username)

  const addUser = (e) => {
    e.preventDefault()
    createUser({
      variables: {
        input: {
          username: username,
          age: age,
        }
      }
    }).then(({data}) => {console.log(data); setUsername(''); setAge(0);})
  }
 const deleteUserByUser = (e, user) => {
 e.preventDefault()
 console.log('clicked', user)
      deleteUser({
        variables: {
          input: {
            id:parseInt(user.id),
            username: user.username,
             age: parseInt(user.age),
          }
        }
      }).then(({data}) => {console.log(data); setUsername(''); setAge(0);})


 }
    const getAll = (e) => {
      e.preventDefault()
      refetch()
    }
  if(loading) return <h1>Loading..</h1>
  return (
    <div className="App">
      <div>
        <form className="Form">
          <input value={username} onChange={e => setUsername(e.target.value) } type="text" className="InputStyle" placeholder="Your name.."/>
          <input value={age} type="number" onChange={e => setAge(parseInt(e.target.value, 10))} className="InputStyle" placeholder="Your age.."/>
          
          <div className="btns">
            <button className="btnCreate" onClick={(e)=>addUser(e)}>
              Create
            </button>
            <button className="btnGet" onClick={(e) => getAll(e)}>
              Get
            </button>
          </div>
        </form>
      </div>
    {users.map((user, k) => <div className="user" key={user.id} onClick={(e)=> {deleteUserByUser(e, user)}}>{k+1}. {user.username}  {user.age} <img src={close} alt="Logo" className="size" /></div>)}
    </div>
  );
}

export default App;
