import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/system';
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
interface Props {
  query: Query
  SearchQuery: (q: string) => Promise<void>
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
  token: string
  LoadIssue: (state: boolean) => void
}
interface State {
  window_state: boolean
  close_url?: string
}
interface Query {
  state: boolean;
  q: string;
}
export default function BasicModal({ query, SearchQuery, state, setState, token, LoadIssue }: Props) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setState({ ...state, window_state: false });
  //   React.useEffect(()=>{if(state){setOpen(true)}else{setOpen(false)}},[state]);
  function CloseIssue() {
    const id = toast.loading("Deleting...");
    const axios = require('axios');
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: state.close_url,
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
      data: { state: "close" }
    };

    axios.request(config)
      .then((response: any) => {
        console.log(JSON.stringify(response.data));

        if (response.status === 200) {
          setState({ ...state, window_state: false });
          toast.update(id, { render: "Deleted Successfully", type: "success", isLoading: false, autoClose: 1500 });
          setTimeout(() => {
            if (query.state) {
              SearchQuery(query.q);
            } else {
              LoadIssue(true);
            }



          }, 1500);
        }

      })
      .catch((error: any) => {
        console.log(error);
        toast.update(id, { render: "Failed to Delete", type: "error", isLoading: false, autoClose: 2500 });
      });
  }
  return (
    <div>

      <Modal
        open={state.window_state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography textAlign={"center"} id="modal-modal-title" variant="h6" component="h2">
            {"Are You Sure You Want To Delete It?".toUpperCase()}
          </Typography>
          <Stack spacing={3}>
            <Button onClick={() => { CloseIssue() }}>CONFIRM</Button>
            <Button onClick={() => { handleClose() }}>CANCEL</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}