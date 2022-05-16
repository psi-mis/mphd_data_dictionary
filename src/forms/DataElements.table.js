import React, { useState, useEffect } from "react";
import "../styles/style.css";
import { connect } from "react-redux";
import * as Constant from "../constants";
import * as Utils from "../utils";
import * as TranslationService from "../services/Translation.service";
import SortableDataListComponent from "../components/SortableDataList.component";


function DataElementTable({statusData, settingData, dataElementList}) {

	
	useEffect(() => {
		
	}, [settingData])

	const getDataTableHeaders = () => {
		let result = [];
		const allHeaders = Constant.getDataTableHeaders();
		const settingDisplayedColumns = settingData.displayedColumns;
		for( let i=0; i<allHeaders.length; i++ )
		{
			const header = allHeaders[i]
			if( settingDisplayedColumns.indexOf(allHeaders[i].id) >= 0 )
			{
				result.push( header );
			}
		}

		return result;
	}

	const createDataList = () => {
		let list = [];

		for( let i=0; i<dataElementList.length; i++ )
		{
			const dataElement = dataElementList[i];
			const dataSetInfo = Utils.getDatasetInfo( dataElement.dataSets );
			const dataItem = {
				id: dataElement.id,
				name: dataElement.displayName,
				code: dataElement.code,
				description: dataElement.description,
				catCombo: dataElement.categoryCombo.displayName,
				periodType: dataSetInfo.periodTypeList,
				dataSets: dataSetInfo.nameList,
				invalidMsg: ( dataElement.dataSets.length == 1 ) ? "" : TranslationService.translate("dataElementList_msg_moreDataSetError", "This data element belongs to more than one data sets ")
			}

			list.push( dataItem );
		}

		return list;
	}

	return (

		<div>
			<SortableDataListComponent 
				headers={getDataTableHeaders()}
				dataList={createDataList()}
			/>
		</div>
	)

}


const mapStateToProps = (state) => {
	return {
		statusData: state.statusData,
		dataElementList: state.data.dataElements,
        settingData: state.data.settingData
	};
};


export default connect(mapStateToProps, null)(DataElementTable);


