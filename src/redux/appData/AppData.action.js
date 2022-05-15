
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
            const dataSetList = await api.getDataSets();
            const settingDataResponse = await api.getSettingData();
            if( settingDataResponse.details != undefined && settingDataResponse.details.status == "ERROR" )
            {
                dispatch({
                    type: Constant.FORCE_TO_DO_SETTINGS,
                    payload: dataSetList
                })
            }
            else
            {
                const dataElementList = await api.getDataElementList( settingDataResponse.dataSets );
                dispatch({
                    type: Constant.FETCH_APP_DATA_LOAD_SUCCESS,
                    payload: { dataSets: dataSetList, settingData: settingDataResponse, dataElements: dataElementList }
                })
            }
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

export const saveSettingData = ( settingData ) => {
	return async dispatch => {
		dispatch({
            type: Constant.SAVE_SETTING_DATA_REQUEST
        });
		
        try
        { 
            const saveDataResponse = await api.saveSettingData( settingData );
            const dataElementList = await api.getDataElementList( settingData.dataSets );
            if( saveDataResponse.status != undefined && saveDataResponse.status != "ERROR" )
            {
                dispatch({
                    type: Constant.SAVE_SETTING_DATA_SUCCESS,
                    payload: { settingData: settingData, dataElements: dataElementList}
                })
            }
            else
            {
                dispatch({
                    type: Constant.SAVE_SETTING_DATA_FAILURE,
                    payload: saveDataResponse
                }) 
            }
        }
        catch(e)
        {
            dispatch({
                type: Constant.SAVE_SETTING_DATA_FAILURE,
                payload: e
            })
        }
	};
};