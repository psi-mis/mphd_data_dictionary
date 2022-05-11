import React, {useEffect} from "react";
import "./styles/style.css";
import { useDataEngine } from "@dhis2/app-service-data";
import { connect } from "react-redux";
import * as api from "./api";
import * as Constant from  "./constants";
import { fetchAppData } from  "./redux";
import DataElementsTable from "./forms/DataElements.table";
;

const App = ({ statusData, fetchAppData }) => {

    const engine = useDataEngine();
    api.setEngine(engine);
	

	useEffect(() => {
		fetchAppData();
	}, [])

  	return  ( statusData.status == Constant.FETCH_APP_DATA_LOAD_REQUEST 
            || statusData.status == Constant.FETCH_APP_DATA_LOAD_FAILURE )
		? (
			<h2>{statusData.message}</h2>
		) : (
			<>
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
