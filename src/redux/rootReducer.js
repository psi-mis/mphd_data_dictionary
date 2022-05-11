import { combineReducers } from "redux";
import StatusReducer from "./status/Status.reducer";
import dataElementListReducer from "./appData/AppData.reducer";


const rootReducer = combineReducers({
  statusData: StatusReducer,
  dataElementList: dataElementListReducer
});

export default rootReducer;