
import { Button } from '@mui/material';
const AskButton = (props:any) => {
    const { text } = props
    return (
        text &&
        <Button {...props} >{text || ''}</Button>
    )
}

export default AskButton;