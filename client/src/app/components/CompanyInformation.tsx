'use client'

import * as React from 'react';
import { Grid, TextField } from '@mui/material';
import { StepProp } from '../type';

export default function CompanyInformation({ handleFieldChange, userData, errors }: StepProp) {
    const { companyUen, companyName } = userData

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField name="companyUen"
                        fullWidth type="text"
                        id="outlined-basic"
                        label="Company UEN"
                        placeholder="Enter your company UEN"
                        variant="outlined" autoComplete={"false"}
                        onChange={handleFieldChange}
                        value={companyUen}
                        error={!!errors?.companyUen}
                        helperText={errors?.companyUen}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth name="companyName" type="text" id="outlined-basic" label="Company Name" placeholder="Enter your company name" variant="outlined" autoComplete={"false"} onChange={handleFieldChange} value={companyName}
                        error={!!errors?.companyName}
                        helperText={errors?.companyName}
                    />
                </Grid>
            </Grid>
        </>
    );
}