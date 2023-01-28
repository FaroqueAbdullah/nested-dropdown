import React, { useState } from 'react';

import UserList from './layout/userlist';
import UserForm from './layout/userform'

import './App.css';

function uuidv4() {
  // eslint-disable-next-line
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) );
}


function App() {
  const [ userData, setUserData ] = useState([])
  const [ slectedUser, setSelectedUser ] = useState({})

  const updateUserData = function (data) {
    setSelectedUser( data )
  }

  const addOrUpdateUserData = function ( data ) {
    if ( data.userId ) {
      setUserData( userData.map( (user) => {
        if ( user.userId === data.userId ) {
          return { ...user, name: data.name, sector: data.sector, sectorValue: data.sectorValue }
        } else {
          return user
        }
      }))
    } else {
      setUserData( [ ...userData, { ...data ,userId: uuidv4() } ]  )
    }

    setSelectedUser({})
  }

  const deleteUserData = function( data ) {
    setUserData( userData.filter( user => {
      if ( user.userId !== data.userId ) {
        return user
      } else {
        return false;
      }
    }))
  }

  return (
    <div className="App">
      <div className="container">
        <UserForm 
          onUserUpdate = {( data ) => addOrUpdateUserData( data )} 
          updateUserData = { slectedUser } 
        />
         <UserList 
          userList = {userData} 
          updateUser = { ( data ) => updateUserData( data ) } 
          deleteUser = { ( data ) => deleteUserData( data ) }
        />
      </div>
    </div>
  );
}

export default App;
