import React, { useEffect, useState } from 'react'
import Job from '../../components/job/jobCard'
import { useNavigate } from 'react-router-dom'
import { Grid, SelectChangeEvent, Stack, Typography } from '@mui/material'
import Search from '../../components/job/jobSearch'
import { JobModel, experienceLevels, jobTypes, locationProvinces } from '../../models/jobs.model'
import { getAllJobs } from './job'
import { InputSelect } from '../../components/inputs/select'

export type filter = {
    province: string,
    experienceLevel: string,
    jobType: string,
}

const JobsDashboard: React.FC = () => {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState<JobModel[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filter, setFilter] = useState<filter>({
        province: "",
        experienceLevel: "",
        jobType: "",
    })

    const getJobs = () => {
        getAllJobs()
            .then((response) => {
                if (response.status === 200) {
                    setJobs(response.data)
                }
            })
            .catch((error) => console.error("Unable to update jobs", error))

    }

    useEffect(() => {
        getJobs()
    }, [])


    // Function to handle changes in the search term
    const handleSearchChange = (searchTerm: string) => {
        setSearchTerm(searchTerm)
    }

    // function to update the user inputs
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any>,
        field: string
    ) => {
        const value = event.target.value
        setFilter((prevFilter) => ({
            ...prevFilter,
            [field]: value,
        }))
    }

    // Filtering job data based on search term and location
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
        && (filter.province === '' || job.province === filter.province)
        && (filter.experienceLevel === '' || job.experienceLevel === filter.experienceLevel)
        && (filter.jobType === '' || job.type === filter.jobType)
    )

    // Function to handle job click event, navigate to job details page
    const handleJobClick = (jobId: string) => {
        navigate(`/jobs/${jobId}`)
    }

    return (
        <>
            <Grid container spacing={2} sx={{ padding: "10px" }}>
                <Typography variant="h2">Jobs</Typography>
                <Search onSearchChange={handleSearchChange} />
                <Grid item xs={12}>
                    <Grid container sx={{ paddingBottom: "10px" }} spacing={2} justifyContent="space-evenly" >
                        <Grid item  >
                            <Typography variant='h6' sx={{ padding: "1px" }}>Province</Typography>
                            <InputSelect
                                value={filter.province}
                                onChange={(e) => handleInputChange(e, "province")}
                                enumValues={locationProvinces}
                            />
                        </Grid>
                        <Grid item >
                            <Typography variant='h6'>Type</Typography>
                            <InputSelect
                                value={filter.jobType}
                                onChange={(e) => handleInputChange(e, "jobType")}
                                enumValues={jobTypes}
                            />
                        </Grid>
                        <Grid item  >
                            <Typography variant='h6'>Experience</Typography>
                            <InputSelect
                                value={filter.experienceLevel}
                                onChange={(e) => handleInputChange(e, "experienceLevel")}
                                enumValues={experienceLevels}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>

                    <Stack direction='column'>

                        {filteredJobs.length === 0 &&

                            <Typography variant="h5" textAlign='center'>
                                No jobs found with given input "{searchTerm}".<br />
                                Please try again.
                            </Typography>
                        }

                        {filteredJobs && filteredJobs.map(job => (

                            <Job key={job.id}
                                title={job.title}
                                province={job.province}
                                description={job.description}
                                onButtonClick={() => handleJobClick(job.id)}
                            />

                        ))}
                    </Stack>

                </Grid>
            </Grid>

        </>
    )
}

export default JobsDashboard
