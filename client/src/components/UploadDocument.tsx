'use client'

import * as React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Grid, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { MuiFileInput } from 'mui-file-input';
import { StepProp } from '../app/type';

export default function UploadDocument(props: StepProp) {
    const { disabled, handleFieldChange, userData, errors } = props;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField name='documents' fullWidth type="file" id="outlined-basic" variant="outlined" autoComplete={"false"} disabled={disabled}
                        onChange={handleFieldChange}
                        value={userData?.documents}
                        error={!!errors?.documents}
                        helperText={errors?.documents}
                        inputProps={{ accept: "application/pdf" }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="PDFs (not scanned copies) of company's operating bank current account(s) statements for the past 6 months.
                                Example: If today is 17 Jun 23, then please upload bank statements from Dec 22 to May 23 (both months inclusive)"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="If your company is multi-banked, then please upload 6 months bank statements for each bank account"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="If your file is password protected, we request you to remove the password and upload the file to avoid submission failure"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="In case if you are facing any issue while uploading bank statements, Please contact us on support@credilinq.ai"
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </>
    );
}