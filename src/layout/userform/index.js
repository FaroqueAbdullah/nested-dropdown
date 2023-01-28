import React, { useState, useReducer, useEffect } from 'react';
import NestedDropDown from '../../components/NestedDropDown';

function reducer(state, action) {
  
  if (action.type === 'setUser_data') {
    return {
      userId: action.userId,
      name: action.name,
      sector: action.sector,
      sectorValue: action.sectorValue,
    };
  } else if (action.type === 'update_name') {
    return {
      ...state,
      name: action.name
    };
  } else if (action.type === 'update_sector') {
    return {
      ...state,
      sector: action.sector,
      sectorValue: action.sectorValue
    }
   } else if (action.type === 'reset_state') {
      return {
        name: '', sector: '', sectorValue: ''
      }
    }

    throw Error('Unknown action.');
  }

const UserForm = function({ onUserUpdate, updateUserData }) {
  const [state, dispatch] = useReducer(reducer, { userId: '', name: '', sector: '', sectorValue: '' });
  const [ isOpenDropDown, setOpenDropDown ] = useState( false )

  const navOptions = [
    {
      'name': 'Manufacturing',
      'value': '1',
      'subOptions': [
        {
          'name': 'Construction materials',
          'value': '19',
          'subOptions': []
        },
        {
          'name': 'Electronics and Optics',
          'value': '18',
          'subOptions': []
        },
        {
          'name': 'Food and Beverage',
          'value': '6',
          'subOptions': [
            {
              "name": 'Bakery & confectionery products',
              'value': '342',
              'subOptions': []
            },
            {
              "name": 'Beverages',
              'value': '43',
              'subOptions': []
            }
          ]
        },
        {
          'name': 'Furniture',
          'value': '13',
          'subOptions': [
            {
              'name': 'Bathroom/sauna',
              'value': '389',
              'subOptions': []
            },
            {
              'name': 'Bedroom',
              'value': '385',
              'subOptions': []
            },
            {
              'name': 'Kitchen',
              'value': '98',
              'subOptions': []
            },
          ]
        },
      ]
    },
    {
      'name': 'Dami Data',
      'value': '99',
      'subOptions': []
    }
  ]

  const handleSubmit = function() {
    onUserUpdate( state )
    dispatch({
      type: 'reset_state',
    });
  }

  const updateNameValue = function(event) {
    dispatch({
      type: 'update_name',
      name: event.target.value
    });
  }

  const updateSectorValue = function ( data ) {
    dispatch({
      type: 'update_sector',
      sector: data.name,
      sectorValue: data.value
    });
  }

  useEffect(() => {
    if (Object.keys(updateUserData).length !== 0 ) {
      dispatch({
        type: 'setUser_data',
        userId: updateUserData.userId,
        name: updateUserData.name,
        sector: updateUserData.sector,
        sectorValue: updateUserData.sectorValue,
      });
    }
  }, [updateUserData]);

  return (
    <div className="layout-container">
      <div className="user-form">
        <label>
          <div className="user-form-level">Name:</div>
          <input className="user-form-input" type="text" value={ state.name }   onChange={updateNameValue} />
        </label>
        <label>
          <div className="user-form-level">Sectors:</div>
          <input 
            className="user-form-input" 
            onClick={ () => setOpenDropDown(!isOpenDropDown) }  
            type="text" 
            onChange={() => null}
            value={ state.sector } 
          />
          <div className={`navOption-container ${ isOpenDropDown ? 'show' : 'hide' }`}>
            <NestedDropDown 
              navOptions = { navOptions } 
              navOptionSelect={ data => updateSectorValue( data ) }
            />
          </div>
          
        </label>
        <button className="submit-btn" type="submit" onClick={handleSubmit}> { state.userId ? 'Update' : 'Submit' } </button>
      </div>
    </div>
  );
}

export default UserForm;