import { combineReducers } from "redux";
import StatusReducer from "./status/Status.reducer";
import AppDataReducer from "./appData/AppData.reducer";


const rootReducer = combineReducers({
  statusData: StatusReducer,
  data: AppDataReducer
});

export default rootReducer;