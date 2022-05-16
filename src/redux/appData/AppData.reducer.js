
import * as Constant from '../../constants';
import * as Utils from "../../utils";


const initialState = {
	"dataElements": [],
	"dataSets": [],
	"settingData": { isNew: true, dataSets: [], displayedColumns: ["code", "shortName", "name", "description", "catCombo", "dataSets", "periodType"]}
}


const DataElementListReducer = (state = initialState, action) => {
	let newState = Utils.cloneJson( state );

	if( action.type == Constant.FETCH_APP_DATA_LOAD_SUCCESS )
	{
		newState = action.payload;
		return newState;
	}
	else if( action.type == Constant.FORCE_TO_DO_SETTINGS )
	{
		newState.dataSets = action.payload;
		return newState;
	}	
	else if( action.type == Constant.SAVE_SETTING_DATA_SUCCESS )
	{
		newState.settingData = action.payload.settingData;
		newState.dataElements = action.payload.dataElements;
		return newState;
	}	
	else
	{
		return state;
	}
};

export default DataElementListReducer;
