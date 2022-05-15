
import * as Utils from "../../utils";
import * as Constant from '../../constants';
import * as TranslationService from "../../services/Translation.service";


const initialState = {
	status: "",
	type: "",
	message: ""
}

const StatusReducer = (state = initialState, action) => {

	let newState = Utils.cloneJson( state );

	// For Data Element List
	if( action.type == Constant.FETCH_APP_DATA_LOAD_REQUEST ) 
	{
		newState.status = action.type;
		newState.type = "info";
		newState.message = TranslationService.translate("dataElementList_msg", "Loading data element list") + "...";

		return newState;
	}
	else if( action.type == Constant.FETCH_APP_DATA_LOAD_FAILURE 
			|| action.type == Constant.SAVE_SETTING_DATA_FAILURE ) 
	{
		let errMsg = TranslationService.translate("commonTerms_msg_error", "ERROR") + ": ";
		if( action.payload[0] != undefined )
		{
			const errData = action.payload[0].details.response;
			if( errData && errData.conflicts )
			{
				const conflicts = errData.conflicts;
				if( conflicts.length > 0 )
				{
					for( let i=0; i<conflicts.length; i++ )
					{
						errMsg += "\n" + conflicts[i].value;
					}
				}
				else
				{
					errMsg += errData.description;
				}
			}
			else
			{
				errMsg += errData.description;
			}
		}
		else
		{
			errMsg += "\n" + action.payload.message;
		}
			
		newState.status = action.type;
		newState.type = "error";
		newState.message = errMsg;

		return newState;
	}
	else
	{
		return {
            ... state,
            status: action.type,
            type: "",
            message: ""
        }
	}
};

export default StatusReducer;
