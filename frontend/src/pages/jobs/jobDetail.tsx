import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Typography, Grid, Box, Paper, Container } from '@mui/material'
import { getJob } from './job'
import { JobModel } from '../../models/jobs.model'

type JobDetailParams = {
    jobId: string
}

const JobDetail: React.FC = () => {
    // Extracting jobId from route parameters
    const { jobId } = useParams<JobDetailParams>()
    const [job, setJob] = useState<JobModel>();

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
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <Typography component={'span'} variant="body1" gutterBottom style={{ wordWrap: "break-word" }}>
                                        <strong>Description</strong>
                                        <Box>{job.description}</Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component={'span'} variant="body1" gutterBottom>
                                        <strong>Start Date</strong>
                                        <Box>{new Date(job.startDate).toLocaleDateString()}</Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component={'span'} variant="body1" gutterBottom style={{ wordWrap: "break-word" }}>
                                        <strong>Company Details</strong>
                                        <Box>{job.companyDetails}</Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="center">
                                        <Button variant="contained" color="primary">
                                            Apply Now
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    }
                </Container>
            </Box>
        </>
    )
}
export default JobDetail

