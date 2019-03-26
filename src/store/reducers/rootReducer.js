import {combineReducers} from "redux";
import paintReducer from "./paintReducer";

const rootReducer = combineReducers({
    paint: paintReducer
})

export default rootReducer;