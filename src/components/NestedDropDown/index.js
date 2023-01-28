const NestedDropDown = function ({ navOptions, navOptionSelect }) {

  return (
    <ul>
      {
        navOptions.map(( option ) => {
          return (
            <li className="nestedDropDown-option" key = { option.value }>
              <span onClick={ () => navOptionSelect( option ) }> { option.name } </span>
              { 
                option.subOptions.length > 0 ? <NestedDropDown navOptionSelect={ ( data ) =>  navOptionSelect(data) } navOptions = { option.subOptions } /> : null
              }
            </li>
          )
        })
      }
    </ul>
  );
}

export default NestedDropDown;