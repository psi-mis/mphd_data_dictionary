
// --------------------------------------------------------------------------------
// For ARRAY

export const sortByKey = function( array, key, order ) {
	return array.sort( function( a, b ) {
		
		var x = a[key]; 
		var y = b[key];

		if ( x === undefined ) x = "";
		if ( y === undefined ) y = "";
		
		if ( order === undefined )
		{
			return ( ( x < y ) ? -1 : ( ( x > y ) ? 1 : 0 ) );
		}
		else
		{
			if ( order == "asc" ) return ( ( x < y ) ? -1 : ( ( x > y ) ? 1 : 0 ) );
			else if ( order == "desc" ) return ( ( x > y ) ? -1 : ( ( x < y ) ? 1 : 0 ) );
		}
	});
};


export const findItemFromList = ( list, value, propertyName ) =>
{
	let item;

	if( list )
	{
		// If propertyName being compare to has not been passed, set it as 'id'.
		if ( propertyName === undefined )
		{
			propertyName = "id";
		}

		for( let i = 0; i < list.length; i++ )
		{
			let listItem = list[i];

			if ( listItem[propertyName] == value )
			{
				item = listItem;
				break;
			}
		}
	}

	return item;
}

// --------------------------------------------------------------------------------
// For JSON

export const cloneJson = ( jsonData ) => {
    return JSON.parse(JSON.stringify(jsonData));
}


// --------------------------------------------------------------------------------
// For HTML 

export const moveSelectedOptions = ( sourceTag, targetTag ) => {
	
	for(let i=sourceTag.options.length-1; i>=0; i--)	
	{
		const option = sourceTag.options[i];
		if(option.selected)
		{
			addOption( targetTag, option );
			removeOption( sourceTag, i );
		}
	}
	
}


export const moveAllOptions = ( sourceTag, targetTag ) => {
	
	for(let i=sourceTag.options.length-1; i>=0; i--)	
	{
		const option = sourceTag.options[i];
		addOption( targetTag, option );
		removeOption( sourceTag, i );
	}
	
}


const addOption = ( tag, option ) => {
	var tempOption = document.createElement("OPTION");
	tempOption.text = option.text;
	tempOption.value = option.value;
	tag.options.add( tempOption );
}

const removeOption = ( tag, i ) => {
	tag.remove(i);
}

