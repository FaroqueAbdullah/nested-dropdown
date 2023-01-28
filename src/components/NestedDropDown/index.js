const NestedDropDown = function ({ navOptions, navOptionSelect, selectedOption }) {

  return (
    <ul>
      {
        navOptions.map(( option ) => {
          return (
            <li className="nestedDropDown-option" key = { option.value }>
              <span className={`${ selectedOption === option.value ? "selected" : "" }`} onClick={ () => navOptionSelect( option ) }> { option.name } </span>
              { 
                option.subOptions.length > 0 ? 
                  <NestedDropDown 
                    navOptionSelect={ ( data ) =>  navOptionSelect(data) } 
                    navOptions = { option.subOptions } 
                    selectedOption={ selectedOption } 
                  /> : null
              }
            </li>
          )
        })
      }
    </ul>
  );
}

export default NestedDropDown;