
export const formatDisplayDate = ( dateStr ) => {

	if( dateStr == undefined || dateStr == "" ) return "";
	
	var arrDate = dateStr.substring( 0, 10 ).split("-");
	const month = eval( arrDate[1] * 1 ) - 1;
	return arrDate[0] + " " + translateMonth(month) + " " + arrDate[2];
}
