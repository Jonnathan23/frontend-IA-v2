import { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children}: ErrorMessageProps) {
    return(
        <div className="error-message">
            {children}
        </div>
    )
}