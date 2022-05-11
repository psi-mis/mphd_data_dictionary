
import * as Constant from '../constants';
import * as Utils from "../utils";

let engine = null;
export const setEngine = engineInstance => {
	engine = engineInstance
}

//************************************************************************************************** */
// For Data Elements

export const getDataElementList = async() => {

	const dataSetIdParams = Constant.DATA_ELEMENT_ID_LIST.join(",");

	const { dataSets } = await engine.query({
		dataSets: {
			resource: "dataSets",
			params: () => ({
				fields:["id","displayName","periodType","dataSetElements[dataElement[id,displayName,code,description,categoryCombo[id,displayName]]]"],
				filter: ["id:in:[" + dataSetIdParams + "]"],
				paging: false
			})
		},
	});

	let result = [];
	for( let i=0; i<dataSets.dataSets.length; i++ )
	{
		const dataSet = dataSets.dataSets[i];
		let deList = dataSet.dataSetElements;
		for( let j=0; j<deList.length; j++ )
		{
			let dataElement = deList[j].dataElement;
			dataElement.dataSet = {
				id: dataSet.id,
				periodType: dataSet.periodType,
				displayName: dataSet.displayName,
			}
			result.push( dataElement );
		}

	}

	return result;
}
