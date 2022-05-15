import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { connect } from "react-redux";
import * as Utils from "../utils";
import "../styles/style.css";


function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<StyledTableRow>
				{props.headers.map((headCell) => (
					<StyledTableCell
						component="th"
						key={headCell.id}
						align={headCell.valueType == "NUMBER" ? "right" : "left"}
						padding="normal"
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
								{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</StyledTableCell>
				))}
			</StyledTableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired
};



const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
	  backgroundColor: "#fafafa",
	  color: theme.palette.common.black,
	},
	[`&.${tableCellClasses.body}`]: {
	  fontSize: 14,
	},
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
	//   backgroundColor: theme.palette.action.hover,
		backgroundColor: "#BCC6CC",
	},
	// hide last border
	'&:last-child td, &:last-child th': {
	  border: 0,
	},
}));


function SortableDataList({ headers, dataList, rowClickHandler, selectedDataId }) {
    
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState( headers.length > 0 ? headers[0].id : "" );
	
	useEffect(() => {
		
	}, [dataList, selectedDataId])

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";

		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleOnClick = (event, rowData ) => {
		if( rowClickHandler != undefined )
		{
			rowClickHandler( event, rowData );
		}
	}
	
	return (
		<div>
			<TableContainer className="data-list">
				
				<Table stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
					<EnhancedTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						headers={headers}
					/>
					<TableBody>
						{Utils.sortByKey(dataList, orderBy, order ).map((row, index) => {
							return (
									<StyledTableRow key={index} 
										style={{cursor: "pointer"}}
										className={(row.invalidMsg != undefined && row.invalidMsg != "" ) ? "error" : ""}
										onClick={(e) => handleOnClick( e, row )}
										title={row.invalidMsg}
									>
										{headers.map((headerCell) => (
											<StyledTableCell
												align={headerCell.valueType =="NUMBER" ? "right" : "left"}
											>
												{headerCell.valueType =="DATE" && Utils.formatDisplayDate(row[headerCell.id])}
												{headerCell.valueType !="DATE" && row[headerCell.id]}
											</StyledTableCell>
										))}
									</StyledTableRow>
								);
							}
						)}
						</TableBody>
					</Table>
			</TableContainer>
		</div>
	);
}



export default connect(null, null)(SortableDataList);