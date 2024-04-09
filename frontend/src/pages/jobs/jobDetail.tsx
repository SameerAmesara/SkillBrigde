/**
 * @author Om Anand (B00947378)
 */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Typography, Grid, Box, Paper, Container, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material'
import { deleteJob, getJob } from './job'
import { JobModel, experienceLevels, jobTypes, locationProvinces } from '../../models/jobs.model'

type JobDetailParams = {
    jobId: string
}

const JobDetail: React.FC = () => {
    // Extracting jobId from route parameters
    const navigate = useNavigate()
    const { jobId } = useParams<JobDetailParams>()
    const [job, setJob] = useState<JobModel>()
    const userId = sessionStorage.getItem("userId")!!
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    // Finding job details based on jobId
    useEffect(() => {
        getJob(jobId!)
            .then((response) => {
                if (response.status === 200) {
                    setJob(response.data)
                }
            })
            .catch(_ => console.log("Unable to get job ", jobId))
    }, [jobId]);

    const handleDeleteJob = () => {
        if (job && job.userId === userId) {
            deleteJob(jobId!)
                .then((response) => {
                    if (response.status === 200) {
                        setSnackbarOpen(true)
                        navigate("/jobs")
                    }
                })
                .catch(_ => console.log("Unable to delete job ", jobId))
        }
    }

    return (
        <>
            <Box >
                <Container>
                    <Typography variant="h5">Job Details</Typography>

                    {!job && <Typography component={'span'} variant="h6">No job found with job ID {jobId}.</Typography>}
                    {job &&
                        <Paper style={{ padding: '20px' }}>
                            <Typography component={'span'} variant="h6" gutterBottom align="center">
                                {job.title}
                            </Typography>
                            <Grid item xs={12} >
                                    <Grid container justifyContent="space-evenly" display="flex" alignItems="center">
                                        <Grid item >
                                            <Typography component={'span'} variant="body1" gutterBottom style={{ wordWrap: "break-word" }}>
                                                <strong>Location</strong>
                                                <Box>{job.city},{locationProvinces[job.province as unknown as keyof typeof locationProvinces]}</Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item >
                                            <Typography component={'span'} variant="body1" gutterBottom style={{ wordWrap: "break-word" }}>
                                                <strong>Experience</strong>
                                                <Box>{experienceLevels[job.experienceLevel as unknown as keyof typeof experienceLevels]}</Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography component={'span'} variant="body1" gutterBottom style={{ wordWrap: "break-word" }}>
                                                <strong>Type</strong>
                                                <Box>{jobTypes[job.type as unknown as keyof typeof jobTypes]}</Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <Typography component={'span'} variant="body1" gutterBottom style={{ wordWrap: "break-word" }}>
                                        <strong>Description</strong>
                                        <Box>{job.description}</Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component={'span'} variant="body1" gutterBottom>
                                        <strong>Create Date</strong>
                                        <Box>{new Date(job.createDate).toLocaleDateString()}</Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component={'span'} variant="body1" gutterBottom style={{ wordWrap: "break-word" }}>
                                        <strong>Company Details</strong>
                                        <Box>{job.companyDetails}</Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="space-evenly">
                                        <Button variant="contained" color="primary">
                                            Apply Now
                                        </Button>
                                        {userId === job.userId && (
                                            <>
                                                <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setConfirmDeleteOpen(true)}>
                                                    Delete Job
                                                </Button>
                                                <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
                                                    <DialogTitle>Confirm Delete</DialogTitle>
                                                    <DialogContent>
                                                        <Typography variant="body1">Are you sure you want to delete this job?</Typography>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                                                            Cancel
                                                        </Button>
                                                        <Button color="primary" autoFocus onClick={handleDeleteJob} >
                                                            Delete
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>

                    }
                </Container>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                message="Job deleted successfully"
            />
        </>
    )
}
export default JobDetail

