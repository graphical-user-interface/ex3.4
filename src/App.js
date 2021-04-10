import React from "react"
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
	Paper,
	Container,
	FormControlLabel,
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
}))

function App() {
	const classes = useStyles()
	const [items, setItems] = React.useState([])
	const [name, setName] = React.useState("")
	const [student, setStudent] = React.useState(false)

	const updateName = (event) => {
		setName(event.target.value)
	}
	const handleChange = (event, selected) => {
		setStudent(selected)
	}
	const add = (event) => {
		setItems(items.concat([{ name: name, student: student }]))
	}

	const [drawerOpen, setDrawerOpen] = React.useState(false)

	const switchDrawer = (event) => {
		setDrawerOpen(!drawerOpen)
	}
	const closeDrawer = (event) => {
		setDrawerOpen(false)
	}

	return (
		<div className='App'>
			<div>
				<Drawer open={drawerOpen} onClose={closeDrawer}>
					<FormGroup>
						<TextField
							id={"name"}
							value={name}
							onChange={updateName}
							label='Name: '
						/>
						<FormControlLabel
							control={
								<Switch
									checked={student}
									onChange={handleChange}
									value='student'
								/>
							}
							label='Student'
						/>
					</FormGroup>
					<Button variant='contained' id={"addButton"} onClick={add}>
						Add
					</Button>
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
													{row.name}
												</TableCell>
												<TableCell>
													{row.student
														? "Student"
														: "Not a student"}
												</TableCell>
												<TableCell>
													{row.student
														? "Student"
														: "Not a student"}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
							<Button
								variant='contained'
								color='primary'
								onClick={switchDrawer}>
								Add
							</Button>
							<Button
								variant='contained'
								color='secondary'
								onClick={switchDrawer}>
								Sorting
							</Button>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default App
