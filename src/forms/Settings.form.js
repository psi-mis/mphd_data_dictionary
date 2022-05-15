import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle, FormControl, FormControlLabel } from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { connect } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import Portal from '@mui/material/Portal';
import Alert from '@mui/material/Alert';
import * as Constant from "../constants";
import * as Utils from "../utils";
import * as TranslationService from "../services/Translation.service";
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { saveSettingData } from  "../redux";
import "../styles/style.css";



function SettingsForm( {statusData, settingData, dataSetList, saveSettingData} ) {

    
    const getAvailableDataSetList = () => {
        let availableDataSets = [];
        
        for( let i=0; i<dataSetList.length; i++ )
        {
            const dataSet = dataSetList[i];
            if( tempSettingData.dataSets.indexOf( dataSet.id ) < 0 )
            {
                availableDataSets.push( dataSet );
            }
        }
       
        return availableDataSets;
    }

    const [open, setOpen] = React.useState(false);
    const [tempSettingData, setTempSettingData] = React.useState( Utils.cloneJson( settingData ) );
    

	
	useEffect(() => {
		if( statusData.status == Constant.FORCE_TO_DO_SETTINGS )
        {
            setOpen(true);
        }
	}, [statusData.status])


    const showDialog = () => {
        setTempSettingData( Utils.cloneJson( settingData ) );
        setOpen(true);
    }

	const handleCloseAlert = () => {
		resetMessageStatus();
	}

    // ------------------------------------------------------------------

    
    const moveToSelectedDropdown = ( e ) => {
	
        const copiedSettingData = Utils.cloneJson( tempSettingData );
        copiedSettingData.dataSets.push( e.target.value );

        setTempSettingData( copiedSettingData );
    }
    
    const moveToAvailableDropdown = ( e ) => {
        const copiedSettingData = Utils.cloneJson( tempSettingData );
        copiedSettingData.dataSets.splice( copiedSettingData.dataSets.indexOf(e.target.value), 1 );
        
        setTempSettingData( copiedSettingData );
    }

    // END - MULTI SELECTED BOX

    const setDisplayedColumns = ( event ) => {
        
        const copiedSettingData = Utils.cloneJson( tempSettingData );

        let tempDisplayedColumns = copiedSettingData.displayedColumns;
        const columnId = event.target.value;
        if( event.target.checked )
        {
            tempDisplayedColumns.push( columnId );
        }
        else
        {
            const idx = tempDisplayedColumns.indexOf( columnId );
            tempDisplayedColumns.splice(idx, 1);
        }
        copiedSettingData.displayedColumns = tempDisplayedColumns;

        setTempSettingData( copiedSettingData );
    }


    const saveData = () => {
        // setDataSets();
        saveSettingData( tempSettingData );
        setOpen( false );
    }
    

	return (
        <>
            <div style={{cursor: "pointer"}} onClick={() => showDialog()}>{TranslationService.translate("dataList_label_settings", "Settings")}</div>

            <Portal>
				{( statusData.status == Constant.FETCH_SETTING_DATA_LOAD_SUCCESS
					|| statusData.status == Constant.FETCH_SETTING_DATA_LOAD_FAILURE 
                    )
					&&
					<Snackbar
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
						open={statusData.message != ""}
					>
						<Alert onClose={() => handleCloseAlert()} severity={statusData.type} variant="filled">
							{statusData.message}
						</Alert>
					</Snackbar>
				}
			</Portal>

            <Dialog className="settings-form" open={open} onClose={() => setOpen(false)} fullWidth={true}  maxWidth="lg"> {/*  disableEscapeKeyDown */}
                <DialogTitle className="header">{TranslationService.translate("settingsForm_header_settings", "Settings")}</DialogTitle>
                <DialogContent dividers>
                    <details open>
                        <summary>
                            {TranslationService.translate("common_terms_dataSets", "Data sets")}
                        </summary>
                        
                        <Table>
                            <TableRow>
                                <TableCell>
                                    <FormControl sx={{ m: 1, width: "100%" }}>
                                        <InputLabel shrink htmlFor="select-multiple-native">
                                            {TranslationService.translate("settingsForm_title_available", "Available")}
                                        </InputLabel>
                                        <Select multiple native id="availableDataSet" 
                                            label= {TranslationService.translate("settingsForm_title_available", "Available")}
                                            onDoubleClick={(e) => moveToSelectedDropdown(e)}>
                                            {getAvailableDataSetList().map((dataSet) => (
                                                <option key={dataSet.id} value={dataSet.id}>
                                                    {dataSet.displayName}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>

                                {/* <TableCell> */}

                                    {/* <KeyboardDoubleArrowRightIcon onClick={(e) => Utils.moveAllOptions(document.getElementById("availableDataSet"), document.getElementById("selectedDataSet") )}/> */}
                                    {/* <br/><ArrowRightIcon onClick={(e) => moveToSelectedDropdown(e)}/> */}
                                
                                    {/* <br/><ArrowLeftIcon onClick={(e) => moveToAvailableDropdown(e)}/> */}
                                    {/* <br/><KeyboardDoubleArrowLeftIcon onClick={(e) => Utils.moveAllOptions(document.getElementById("selectedDataSet"), document.getElementById("availableDataSet") )}/> */}
                                   
                                {/* </TableCell> */}
                                
                                <TableCell> 
                                    <FormControl sx={{ m: 1, width: "100%" }}>
                                        <InputLabel shrink htmlFor="select-multiple-native">
                                            {TranslationService.translate("settingsForm_title_selected", "Selected")}
                                        </InputLabel>
                                        <Select multiple native id="selectedDataSet" 
                                            label={TranslationService.translate("settingsForm_title_selected", "Selected")}
                                            onDoubleClick={(e) => moveToAvailableDropdown(e)} >
                                            {tempSettingData.dataSets.map((dataSetId) => (
                                                <option key={dataSetId} value={dataSetId}>
                                                    {Utils.findItemFromList(dataSetList, dataSetId).displayName}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        </Table>

                    </details>   

                    <details open>
                        <summary>
                            {TranslationService.translate("settingsForm_header_showHideColumns", "Show/Hide Columns")}
                        </summary>
                            <Box sx={{ flexDirection: 'column' }}>
                                {Constant.getDataTableHeaders().map((header)=>(
                                    <FormControlLabel
                                        value={header.id}
                                        control={<Checkbox />}
                                        label={header.label}
                                        labelPlacement="end"
                                        checked={tempSettingData.displayedColumns.indexOf(header.id) >=0}
                                        onClick={(e) => setDisplayedColumns(e)}
                                    />
                                ))}
                            </Box>
                        
                    </details>   
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={() => saveData()}>{TranslationService.translate("settingsForm_btn_save","Save")}</Button>
                    <Button onClick={() => setOpen(false)}>{TranslationService.translate("settingsForm_btn_cancel","Cancel")}</Button>
                </DialogActions>
            </Dialog>
        </>
	);
}


const mapStateToProps = (state) => {
	return {
		statusData: state.statusData,
        dataSetList: state.data.dataSets,
        settingData: state.data.settingData
	};
};


const mapDispatchToProps = (dispatch) => {
	return {
		saveSettingData: ( settingData ) => dispatch(saveSettingData( settingData ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);


