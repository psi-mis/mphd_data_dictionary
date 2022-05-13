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
				<h2 className="header">{TranslationService.translate("dataList_appHeader", "Data Dictionary")}</h2>
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
