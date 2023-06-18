
export type UserData = {
    name: string,
    email: string,
    reemail?: string,
    termsConditions?: string,
    phoneNumber: string,
    position: string,
    companyName: string,
    companyUen: string,
    documents: string[],
}
export type StepProp = {
    disabled?: boolean
    handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit?: () => void,
    handlePhoneChange?: (value: string, info: any) => void,
    userData: UserData,
    errors: any
}

export type UserDataError = {
    name?: string,
    email?: string,
    reemail?: string,
    termsConditions?: string,
    phoneNumber?: string,
    position?: string,
    companyName?: string,
    companyUen?: string,
    documents?: string,
}