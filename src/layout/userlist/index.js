const UserList = function ({ userList, updateUser, deleteUser }) {

  return (
    <table className="layout-container table-list-container">
      <thead>
        <tr className="list-container">
          <th className="list-option list-heading"> Name </th>
          <th className="list-option list-heading"> Sector </th>
          <th className="list-option list-heading"> Update </th>
          <th className="list-option list-heading"> Delete </th>
        </tr>
      </thead>
      
      <tbody>
        { 
          userList.map( (data, i) => {
            return (
              <tr className="list-container" key={i}>
                <td className="list-option"> { data.name } </td>
                <td className="list-option"> { data.sector } </td>
                <td className="list-option"> <button onClick={ () => updateUser( data ) }>Edit</button> </td>
                <td className="list-option">  <button onClick={ () => deleteUser( data ) }>Delete</button> </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default UserList;