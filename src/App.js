import React, {useEffect} from "react";
import "./styles/style.css";
import { useDataEngine } from "@dhis2/app-service-data";
import { connect } from "react-redux";
import * as api from "./api";
import * as Constant from  "./constants";
import { fetchAppData } from  "./redux";
import DataElementsTable from "./forms/DataElements.table";
import * as TranslationService from "./services/Translation.service";
import "./styles/style.css";
import SettingsForm from "./forms/Settings.form";


const App = ({ statusData, fetchAppData }) => {

    const engine = useDataEngine();
    api.setEngine(engine);
	

	useEffect(() => {
		fetchAppData();
	}, [])

  	return  ( statusData.status == Constant.FETCH_APP_DATA_LOAD_REQUEST 
            || statusData.status == Constant.FETCH_APP_DATA_LOAD_FAILURE )
		? (
			<h1>{statusData.message}</h1>
		) : (
			<>
				<div className="header">{TranslationService.translate("dataList_appHeader", "Data Dictionary")}</div>
				<div className="header-right">
					<SettingsForm />
					<div className="vrsion" onClick={() => window.open("https://docs.google.com/document/d/12ea3zAVm6JggfOJNv3pSuD3Dmzuux1rEiVFWMX_iVjU", '_blank')}>v 1.0 snapshot 1</div>
				</div>

				<DataElementsTable />
			</>
		);
}


const mapStateToProps = (state) => {
    return {
        statusData: state.statusData
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAppData: () => dispatch(fetchAppData())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
