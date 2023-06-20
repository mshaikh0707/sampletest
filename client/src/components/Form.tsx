'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { useState } from 'react';
import CompanyInformation from './CompanyInformation';
import ApplicationInformation from './ApplicationInformation';
import TermsAndConditions from './TermsAndCoonditons';
import UploadDocument from './UploadDocument';
import styled from '@emotion/styled';
import { UserData, UserDataError } from '../app/type';

export default function Form(props: any) {

    const { onSubmit } = props;

    const initialUserData: UserData = {
        name: "",
        email: "",
        reemail: "",
        phoneNumber: "",
        position: "",
        companyName: "",
        companyUen: "",
        documents: ""
    }
    let [userData, setUserData] = React.useState<UserData>(initialUserData);
    const [errors, setErrors] = React.useState<any>({ termsConditions: "required" });
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedFile, setSelectedFile] = React.useState<any>();
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const validateField = (key: string, value: string | undefined): string => {
        if (!value) {
            return `This field is required`
        }
        else if (key === "companyUen" && !/^\d{9,10}.\W{0,1}$/.test(value)) {
            return "Company UEN is invalid"
        }
        else if (key === "email" && !/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(value)) {
            return "Enter a valid email"
        }
        else if (key === "reemail" && value !== userData.email) {
            return "Email does not match"
        }
        return "";
    }
    const handlePhoneChange = (value: string, info: any) => {
        // console.log(value, info);
        setUserData({ ...userData, phoneNumber: value });
        if (info.nationalNumber.length !== 8) {
            setErrors({ ...errors, phoneNumber: "Enter a 8-digit Mobile Number" })
        } else {
            delete errors["phoneNumber"];
            setErrors({ ...errors });
        }

    }
    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newData = { ...userData };
        let newErrors: any = { ...errors }
        let value: string | string[] = e.target.value;
        if (e.target.name === "companyUen") {
            value = e.target.value.toUpperCase();
        } else if (e.target.name === "documents") {
            console.log("e.target.files", e.target.files[0]);
            setSelectedFile(e.target.files[0]);
            // value = e?.target?.files[0].name;
        }
        let error: string = validateField(e.target.name, e.target.value);
        newData[e.target.name as keyof UserData] = value;
        if (e.target.name === "termsConditions") {
            // console.log(e.target.checked);
            error = e.target.checked ? "" : "required";
        }
        setUserData(newData);
        if (error) {
            newErrors[e.target.name] = error;
            setErrors({ ...newErrors });
        } else {
            delete newErrors[e.target.name]
            setErrors({ ...newErrors });
        }
        validateStep(newData, newErrors);
    }

    const handleSubmit = (): void => {
        let errors: any = {}
        Object.keys(userData).forEach((key: string) => {
            const value = userData[key as keyof UserData];
            const error = validateField(key, value);
            if (error) {
                errors[key] = error;
            }
        });
        if (Object.keys(errors).length === 0) {
            delete userData["reemail"],
                delete userData["termsConditions"],
                onSubmit({ userData: { ...userData, documents: selectedFile.name }, selectedFile });
        }

        setErrors(errors);
    }

    const steps = [
        {
            label: 'Company Information',
            fields: <CompanyInformation handleFieldChange={handleFieldChange} userData={userData} errors={errors} />
            ,
        },
        {
            label: 'Applicant Information',
            fields: <ApplicationInformation disabled={!completed[0]} handlePhoneChange={handlePhoneChange} handleFieldChange={handleFieldChange} userData={userData} errors={errors} />,
        },
        {
            label: 'Upload Documents',
            fields: <UploadDocument disabled={!completed[1]} handleFieldChange={handleFieldChange} userData={userData} errors={errors} />,

        },
        {
            label: 'Terms & Conditions',
            fields: <TermsAndConditions disabled={!completed[2]} handleFieldChange={handleFieldChange} userData={userData} errors={errors} handleSubmit={handleSubmit} />,

        },
    ];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const validateStep = (userData: any, errors: any) => {
        console.log(userData);
        let completedStep = 0;
        let stepsCompleted = { ...completed }
        if (userData.companyName && userData.companyUen && !errors.companyName && !errors.companyUen) {
            stepsCompleted[completedStep] = true;
            if (userData.name && userData.email && !errors.name && !errors.email) {
                completedStep = 1;
                stepsCompleted[completedStep] = true;
                if (userData.documents && !errors.documents) {
                    completedStep = 2;
                    stepsCompleted[completedStep] = true;
                    if (userData.termsConditions && !errors.termsConditions) {
                        completedStep = 3;
                        stepsCompleted[completedStep] = true;
                    } else {
                        stepsCompleted = { 0: true, 1: true, 2: true }
                    }
                } else {
                    stepsCompleted = { 0: true, 1: true }
                }
            } else {
                stepsCompleted = { 0: true }
            }
            console.log("completedStep:", completedStep);
            setCompleted({ ...stepsCompleted })
            setActiveStep(completedStep + 1);
        } else {
            setCompleted({})
            setActiveStep(completedStep);


        }

    }

    const CustomStepLable = styled(Box)({
        fontSize: 20,
        background: "rgb(96, 26, 121)",
        padding: "8px 16px",
        color: "rgb(255, 255, 255)",
        borderRadius: "5px",
        marginBottom: "10px",
    })
    return (
        <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map(({ label, fields }, index) => (
                    <Step key={label} completed={completed[index]} active={activeStep === index} expanded>
                        <StepLabel>
                            <CustomStepLable>{label}</CustomStepLable>
                        </StepLabel>
                        <StepContent>
                            {fields}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}