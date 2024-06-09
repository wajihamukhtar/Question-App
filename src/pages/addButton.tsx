import { Button } from "@mui/material"
const addButton = (props:any) => {
    const { text } = props
    return (
        text &&
        <Button {...props} >{text || ''}</Button>
    )
}
export default addButton
