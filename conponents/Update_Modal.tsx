import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
interface FormData {
    title?: string,
    body?: string,
    open: boolean,
    issue_url?: string
}
interface Props {
    updateForm: FormData
    handleClose: () => void
    token: string
    LoadIssue:(state:boolean)=>void
}
export default function UpdateModal({ updateForm, handleClose, token,LoadIssue }: Props) {
    async function getID_and_update(submitData: FormData) {
        if(submitData.title !=="" && ((submitData.body??"").length) >= 30){
            const id = toast.loading("Updating...");
            const axios = require('axios');
        console.log(submitData);
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: submitData.issue_url,
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            data: {
                title: submitData.title,
                body: submitData.body
            }
        };
        await axios.request(config)
            .then((response: any) => {
                if(response.status === 200)
                {
                    toast.update(id, {render: "Update Successfully", type: "success", isLoading: false, autoClose:1500});
                    setTimeout(()=>{LoadIssue(true)},1500);
                }

            })
            .catch((error: any) => {
                console.log(error);
                toast.update(id, {render: "Something went wrong", type: "error", isLoading: false, autoClose:2500});
            });
        }
        else{
            toast("title 為必填,body 至少需要 30 字",{type:"error",autoClose:3500});
        }
        

    }
    const [open, setOpen] = React.useState(false);
    //   const handleOpen = () => setOpen(true);
    //   const handleClose = () => setOpen(false);
    const [submitData, setSubmitData] = React.useState<FormData>({ open: false });
    React.useEffect(() => { if (updateForm.open) setSubmitData(updateForm) }, [updateForm.open]);
    React.useEffect(() => console.log(submitData), [submitData]);
    return (
        <>

            <Modal
                open={updateForm.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="span">
                        title:  <Input onChange={(e) => { setSubmitData({ ...submitData, ["title"]: e.target.value }) }} defaultValue={updateForm.title} />
                    </Typography>
                    <hr/>
                    <Typography  component="span" style={{display:"flex",justifyContent:"center",alignContent:"center",padding:"5% 0"}}>
                        <TextField
                            fullWidth
                            onChange={(e) => { setSubmitData({ ...submitData, ["body"]: e.target.value }) }}
                            defaultValue={updateForm.body}
                            label={"Body"}
                            multiline
                            maxRows={4}
                        />
                    </Typography>
                    <hr/>
                    <Button style={{float:"right"}} onClick={() => { getID_and_update(submitData) }}>Update</Button>
                </Box>
            </Modal>
        </>
    );
}