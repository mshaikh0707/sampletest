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
import { UserData, UserDataError } from '../type';

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
        documents: []
    }
    let [userData, setUserData] = React.useState<UserData>(initialUserData);
    const [errors, setErrors] = React.useState<UserDataError>({ termsConditions: "required" });
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const validateField = (key: string, value: string): string => {
        if (!value) {
            return `This field is required`
        }
        else if (key === "companyUen" && !/^\d{9,10}.\W{0,1}$/.test(value)) {
            return "Company UEN is invalid"
        }
        return "";
    }
    const handlePhoneChange = (value: string, info: any) => {
        console.log(value, info);
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
        let value: string | string[] = e.target.value;
        if (e.target.name === "companyUen") {
            value = e.target.value.toUpperCase();
        } else if (e.target.name === "documents") {
            value = [e.target.value];
        }
        let error: string = validateField(e.target.name, e.target.value);
        newData[e.target.name as keyof UserData] = value;

        if (e.target.name === "termsConditions") {
            console.log(e.target.checked);
            error = e.target.checked ? "" : "required";
        }
        setUserData(newData);
        if (error) {
            setErrors({ ...errors, [e.target.name]: error });
        } else {
            delete errors[e.target.name]
            setErrors({ ...errors });
        }
    }

    const handleSubmit = (): void => {
        let errors: any = {}
        Object.keys(userData).forEach((key: string) => {
            const value: string = userData[key];
            const error = validateField(key, value);
            if (error) {
                errors[key] = error;
            }
        });
        if (Object.keys(errors).length === 0) {
            delete userData["reemail"]
            onSubmit(userData);
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
            fields: <ApplicationInformation disabled={activeStep == 1} handlePhoneChange={handlePhoneChange} handleFieldChange={handleFieldChange} userData={userData} errors={errors} />,
        },
        {
            label: 'Upload Documents',
            fields: <UploadDocument disabled={activeStep == 2} handleFieldChange={handleFieldChange} userData={userData} errors={errors} />,

        },
        {
            label: 'Terms & Conditions',
            fields: <TermsAndConditions disabled={activeStep == 3} handleFieldChange={handleFieldChange} userData={userData} errors={errors} handleSubmit={handleSubmit} />,

        },
    ];

    // console.log(activeStep)

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    // const handleReset = () => {
    //     setActiveStep(0);
    // };
    const validateStep = () => {
        return true;
    }
    // React.useEffect(() => {
    //     const errorKeys = Object.keys(errors);
    //     if (validateStep()) {
    //         console.log("activeStep", activeStep);
    //         handleNext();
    //         setCompleted({ ...completed, [activeStep]: true })
    //     } else {
    //         setActiveStep(0);
    //     }
    // }, [userData]);


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