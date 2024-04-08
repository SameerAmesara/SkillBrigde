import { useEffect, useState } from "react"
import MessageContainer from "../../components/messages/MessageContainer"
import { Box, Grid, Paper, TextField } from "@mui/material";

const MessageDashboard: React.FC = () => {
	const [currentRecieverId, setCurrentRecieverId] = useState('JQJUNVpCQKQqZA790XPUAK8NeKW2')
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		setCurrentRecieverId('JQJUNVpCQKQqZA790XPUAK8NeKW2')
	}, [currentRecieverId]);


	const handleSearchChange = (searchTerm: string) => {
		setSearchTerm(searchTerm)

	}

	return (
		<>
			<Paper>
				<Grid container>
					<Grid item xs={4}>
						<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: " 5px", padding: "10px" }}>
						<TextField label="Search conversations" variant="outlined" fullWidth value={searchTerm} onChange={e => handleSearchChange(e.target.value)} />
						</Box>
					</Grid>
					<Grid item xs={8}>
						<MessageContainer recieverId={currentRecieverId}></MessageContainer>
					</Grid>
				</Grid>
			</Paper>
		</> 
	) 
}

export default MessageDashboard