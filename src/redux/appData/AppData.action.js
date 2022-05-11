
import * as api from "../../api";
import * as Constant from "../../constants";
import * as Utils from "../../utils";


export const fetchAppData = () => {
	return async dispatch => {
		dispatch({
            type: Constant.FETCH_APP_DATA_LOAD_REQUEST
        });
		
        try
        { 
            const dataList = await api.getDataElementList();
            dispatch({
                type: Constant.FETCH_APP_DATA_LOAD_SUCCESS,
                payload: dataList
            })
            
        }
        catch(e)
        {
            dispatch({
                type: Constant.FETCH_APP_DATA_LOAD_FAILURE,
                payload: e
            })
        }
	};
};

