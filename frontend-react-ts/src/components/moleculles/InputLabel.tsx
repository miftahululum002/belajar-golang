import { type FC } from "react";

interface InputLabelProps {
    label: string
    htmlFor: string
    isRequired: boolean
}
const RequiredLabel = () => {
    return (
        <span className="text-danger fw-bold">*</span>
    )
}
const InputLabel: FC<InputLabelProps> = ({ label, htmlFor, isRequired }) => {
    return (
        <label htmlFor={htmlFor} className="mb-1 fw-bold">{label} {isRequired && <RequiredLabel />}</label>
    )
}

export default InputLabel;