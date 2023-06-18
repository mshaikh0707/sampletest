'use client'

import * as React from 'react';
import { Grid, TextField } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { StepProp } from '../type';

export default function ApplicationInformation(props: StepProp) {
    const { disabled, handleFieldChange, handlePhoneChange, userData, errors } = props;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField name="name" fullWidth type="text" id="outlined-basic" label="Full Name" variant="outlined" autoComplete={"false"} disabled={disabled}
                        onChange={handleFieldChange}
                        value={userData?.name}
                        error={!!errors?.name}
                        helperText={errors?.name} />
                </Grid>
                <Grid item xs={6}>
                    <TextField name="position" fullWidth type="text" id="outlined-basic" label="Position within company" variant="outlined" autoComplete={"false"}
                        disabled={disabled}
                        onChange={handleFieldChange}
                        value={userData?.position}
                        error={!!errors?.position}
                        helperText={errors?.position}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField name='email' fullWidth type="email" id="outlined-basic" label="Email Address" variant="outlined" autoComplete={"false"} disabled={disabled}
                        onChange={handleFieldChange}
                        value={userData?.email}
                        error={!!errors?.email}
                        helperText={errors?.email}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField name='reemail' fullWidth type="email" id="outlined-basic" label="Re-enter Email Address" variant="outlined" autoComplete={"false"} disabled={disabled}
                        onChange={handleFieldChange}
                        value={userData?.reemail}
                        error={!!errors?.reemail}
                        helperText={errors?.reemail}

                    />
                </Grid>
                <Grid item xs={6}>
                    <MuiTelInput name="phoneNumber" fullWidth defaultCountry={"SG"} label="Mobile Number" onlyCountries={["SG"]} disabled={disabled} 
                        onChange={handlePhoneChange}
                        value={userData?.phoneNumber}
                        error={!!errors?.phoneNumber}
                        helperText={errors?.phoneNumber}
                    />
                </Grid>
            </Grid>
        </>
    );
}