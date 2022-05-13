import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import "../styles/style.css";
import { connect } from "react-redux";
import * as Constant from "../constants";
import * as Utils from "../utils";
import {setAICurrentQuestionIdx, resetMessageStatus} from "../redux";
import Snackbar from '@mui/material/Snackbar';
import Portal from '@mui/material/Portal';
import Alert from '@mui/material/Alert';
import * as TranslationService from "../services/Translation.service";
import SortableDataListComponent from "../components/SortableDataList.component";


function DataElementTable({statusData, dataElementList}) {

	
	// useEffect(() => {
		
	// }, [miniDisplayed])

	const createHeaderList = () => {
		return [
			{
				id: "name",
				valueType: "TEXT",
				label: TranslationService.translate("common_terms_name", "Name")
			},
			{
				id: "code",
				valueType: "TEXT",
				label: TranslationService.translate("common_terms_code", "Code")
			},
			{
				id: "description",
				valueType: "TEXT",
				label: TranslationService.translate("common_terms_description", "Description")
			},
			{
				id: "catCombo",
				valueType: "TEXT",
				label: TranslationService.translate("common_terms_desegregation", "Desegregation")
			},
			{
				id: "periodType",
				valueType: "TEXT",
				label: TranslationService.translate("common_terms_frequency", "Frequency")
			}
		]
	}

	const createDataList = () => {
		let list = [];
		for( let i=0; i<dataElementList.length; i++ )
		{
			const dataElement = dataElementList[i];
			const dataSetInfo = Utils.getDatasetInfo( dataElement.dataSets );
			const dataItem = {
				id: dataElement.id,
				name: dataElement.name,
				code: dataElement.code,
				description: dataElement.description,
				catCombo: dataElement.catCombo,
				periodType: dataSetInfo.periodTypeList,
				invalidMsg: ( dataElement.dataSets.length == 1 ) ? "" : TranslationService.translate("dataElementList_msg_moreThanOneDataSetError", "This data element belongs to many data sets : ") + " " + dataSetInfo.nameList
			}

			list.push( dataItem );
		}

		return list;
	}

	return (

		<div>
			<SortableDataListComponent 
				headers={createHeaderList()}
				dataList={createDataList()}
			/>
		</div>
	)

}


const mapStateToProps = (state) => {
	return {
		statusData: state.statusData,
		dataElementList: state.dataElementList.list
	};
};


export default connect(mapStateToProps, null)(DataElementTable);


