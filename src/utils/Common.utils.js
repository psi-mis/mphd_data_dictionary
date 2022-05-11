
// --------------------------------------------------------------------------------

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



export const cloneJson = ( jsonData ) => {
    return JSON.parse(JSON.stringify(jsonData));
}
