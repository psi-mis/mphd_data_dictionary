
import * as Constant from '../constants';
import * as Utils from "../utils";

let engine = null;
export const setEngine = engineInstance => {
	engine = engineInstance
}

//************************************************************************************************** */
// For Data Set

export const getDataSets = async() => {

	const { dataSets } = await engine.query({
		dataSets: {
			resource: "dataSets",
			params: () => ({
				paging: false
			})
		},
	});

	return dataSets.dataSets;
}


// Load Add Project name in Settings dataStore
export const getSettingData = async () => {

    try
    {
        const {dataStore} = await engine.query({
            dataStore: {
                resource: Constant.DATA_STORE_SETTING_BASE_URL
            },
        })
    
        return dataStore;
    }
    catch(err)
    {
        return err;
    }
};



// Save a new Settings data in DHIS data store 
export const saveSettingData = ( settingData ) => {

    var type = ( settingData.isNew ) ? "create" : "update";
	delete settingData.isNew;

    return engine.mutate({
        resource: Constant.DATA_STORE_SETTING_BASE_URL,
        type: type,
        data: settingData
    });
}


//************************************************************************************************** */
// For Data Elements

export const getDataElementList = async( dataSetIdList ) => {

	const dataSetIdParams = dataSetIdList.join(",");

	const { dataSets } = await engine.query({
		dataSets: {
			resource: "dataSets",
			params: () => ({
				fields:["id","displayName","periodType","dataSetElements[dataElement[id,displayName,shortName,code,description,categoryCombo[id,displayName]]]"],
				filter: ["id:in:[" + dataSetIdParams + "]"],
				paging: false
			})
		},
	});

	return Utils.resolveDataElementList( dataSets.dataSets );
}
