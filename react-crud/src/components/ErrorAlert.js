import {Alert, AlertTitle} from '@mui/material';

export default function ErrorAlert({errors}) {
    if (!errors || errors.length === 0) return null;

    return (
        <div style={{marginBottom: '1rem'}}>
            {errors.map((err, index) => (
                <Alert key={index} severity="error" variant="filled">
                    <AlertTitle>Error</AlertTitle>
                    {err.msg || err.message || err}
                </Alert>
            ))}
        </div>
    );
}
