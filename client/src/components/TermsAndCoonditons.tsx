'use client'

import * as React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Grid, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import { StepProp } from '../app/type';

export default function TermsAndConditions(props: StepProp) {
    const { disabled, handleSubmit, handleFieldChange, errors } = props;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox name="termsConditions"
                            onChange={handleFieldChange}
                            disabled={disabled}
                        />} label="By ticking, you are confirming that you have understood and are agreeing to the details mentioned:" />
                    </FormGroup>
                    <List >
                        <ListItem disabled={!!errors.termsConditions}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="I confirm that I am the authorized person to upload bank statements on behalf of my company"
                            />
                        </ListItem>
                        <ListItem disabled={!!errors.termsConditions}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="I assure you that uploaded bank statements and provided company information match and are of the same company, if there is a mismatch then my report will not be generated"
                            />
                        </ListItem>
                        <ListItem disabled={!!errors.termsConditions}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="I understand that this is a general report based on the bank statements and Credilinq is not providing a solution or guiding me for my business growth"
                            />
                        </ListItem >
                        <ListItem disabled={!!errors.termsConditions}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="I have read and understand the Terms & Conditions"
                            />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "right" }}>
                    <Button variant="contained" disabled={Object.keys(errors).length > 0 ? true : false} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>

            </Grid>
        </>
    );
}