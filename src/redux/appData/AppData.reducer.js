
import * as Constant from '../../constants';
import * as Utils from "../../utils";


const initialState = {
	"list": []
}


const DataElementListReducer = (state = initialState, action) => {
	let newState = Utils.cloneJson( state );

	if( action.type == Constant.FETCH_APP_DATA_LOAD_SUCCESS ) 
	{
		newState.list = action.payload;
		return newState;
	}
	else
	{
		return state;
	}
};

export default DataElementListReducer;
