
import * as CommonUtils from "./Common.utils"; 


export const resolveDataElementList = ( dataSets ) => {

	let list = [];
    for( let i=0; i<dataSets.length; i++ )
	{
		const dataSet = dataSets[i];
		let deList = CommonUtils.cloneJson( dataSet.dataSetElements );
        delete dataSet.dataSetElements;

		for( let j=0; j<deList.length; j++ )
		{
			let dataElement = deList[j].dataElement;
		
            let found = CommonUtils.findItemFromList( list, dataElement.id );
            if( found ) // Add Data set information for the existed Data element
            {
                found.dataSets.push( dataSet );
            }
            else // Add new Data element in the result
            {
                const dataItem = {
                    id: dataElement.id,
                    name: dataElement.displayName,
                    code: dataElement.code,
                    description: dataElement.description,
                    catCombo: dataElement.categoryCombo.displayName,
                    dataSets: [dataSet]
                }
                list.push( dataItem );
            }
        }
    }

    return list;
}



export const getDatasetInfo = ( dataSetList ) => {
    let dataSetNameList = [];
    let periodTypeList = [];
    for( let i=0; i<dataSetList.length; i++ )
    {
        const dataSet = dataSetList[i];
        dataSetNameList.push( dataSet.displayName );
        if( periodTypeList.indexOf( dataSet.periodType ) < 0 )
        {
            periodTypeList.push( dataSet.periodType );
        }
    }

    return {
        nameList: dataSetNameList.join(", "),
        periodTypeList: periodTypeList.join(", ")
    }
}
