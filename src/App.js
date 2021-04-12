import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	TextField,
	Drawer,
	FormGroup,
	FormControl,
	FormControlLabel,
	Paper,
	Container,
	Switch,
	Grid,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: theme.spacing(2),
		padding: theme.spacing(2, 1),
		textAlign: "center",
		color: theme.palette.text.secondary,
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
	},
	input: {
		flex: "1 0 100%",
	},
	row: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingTop: 10,
	},
}))

function App() {
	const classes = useStyles()
	const today = new Date()
	const convertDate = (date) => {
		const dd = String(date.getDate()).padStart(2, "0")
		const mm = String(date.getMonth() + 1).padStart(2, "0")
		const yyyy = date.getFullYear()

		return yyyy + "-" + mm + "-" + dd
	}
	const [date, setDate] = useState(convertDate(today))
	const [meeting, setMeeting] = useState(false)
	const [name, setName] = useState("")
	const [items, setItems] = useState([
		{ date: convertDate(today), name: "Meeting", private: true },
		{ date: convertDate(today), name: "Meeting 2", private: false },
	])

	const updateName = (event) => {
		setName(event.target.value)
	}
	const handleDate = (event) => {
		setDate(event.target.value)
	}
	const handleMeeting = () => {
		setMeeting(!meeting)
	}
	const add = (event) => {
		event.preventDefault()
		let newItems = [...items]
		newItems.push({
			date: date,
			name: name,
			private: meeting,
		})
		setItems(newItems)
		setDrawerOpen(false)
		setName("")
		setDate(convertDate(today))
	}

	const sortByDate = () => {
		let sortedItems = [...items]
		sortedItems.sort((a, b) =>
			a.date > b.date
				? 1
				: a.date === b.date
				? a.name > b.name
					? 1
					: -1
				: -1,
		)
		setItems(sortedItems)
	}

	const [drawerOpen, setDrawerOpen] = useState(false)

	const switchDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}
	const closeDrawer = (event) => {
		setDrawerOpen(false)
	}

	return (
		<div className='App'>
			<div>
				<Drawer open={drawerOpen} onClose={closeDrawer}>
					<form onSubmit={add}>
						<FormGroup>
							<TextField
								id={"name"}
								label='Meeting name'
								onChange={updateName}
							/>
							<FormControlLabel
								control={
									<Switch
										checked={meeting}
										onChange={handleMeeting}
										value='meeting'
									/>
								}
								label='Private'
							/>
							<TextField
								id={"date"}
								defaultValue={convertDate(today)}
								onChange={handleDate}
								type='date'
							/>
							<Button
								variant='contained'
								color='primary'
								type='submit'>
								Add
							</Button>
						</FormGroup>
					</form>
				</Drawer>
			</div>
			<Container maxWidth='sm'>
				<Grid container>
					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
						<Paper elevation={2} className={classes.paper}>
							<TableContainer component={Paper}>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>Date</TableCell>
											<TableCell>Name</TableCell>
											<TableCell>Private</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{items.map((row, index) => (
											<TableRow
												key={row.name + "_" + index}>
												<TableCell
													component='th'
													scope='row'>
													{row.date}
												</TableCell>
												<TableCell>
													{row.name}
												</TableCell>
												<TableCell>
													{row.private
														? "Private"
														: "Not private"}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
							<Grid className={classes.row}>
								<Button
									variant='contained'
									color='primary'
									onClick={switchDrawer}>
									Add
								</Button>
								<Button
									variant='contained'
									color='secondary'
									onClick={sortByDate}>
									Sorting
								</Button>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default App
