import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import PositionedMenu from './PositionedMenu';
import BasicModal from './BasicModal';

interface Props {
  Data: any,
  token:string,
  callback:(payload: FormData) => void
  LoadIssue:(state:boolean)=>void
}
interface FormData{
  title:string,
  body:string,
  open:boolean,
    issue_url?:string
 }
interface State{
  window_state:boolean
  close_url?:string
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicStack({ Data,token,callback,LoadIssue }: Props) {
  const [state, setState] = React.useState<State>({window_state:false});
  let moment = require('moment'); // require
  function CloseIssue(url:string){
    setState({window_state:true,close_url:url});
    
  }
  // React.useEffect(()=>console.log(state),[state]);
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {/* <Item style={{minHeight:200}}>
        <Typography variant='body1' style={{border:"1px solid black"}}>Open</Typography>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Typography variant='h3'>Title</Typography>
        <Typography variant='body1'>this is a body</Typography>
        <Button>Edit</Button>
        <Button>Delete</Button>
       </Item> */}
        {Data.map((data: any, index: string) => (<Item key={index} style={{ minHeight: 200 }}>
          <PositionedMenu state={data.state} labels={data.labels} />
          <Stack direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ minWidth: 0 }}>
            <Container component={'div'} style={{ minWidth: "80%" }}> <Stack
              direction="row"
              justifyContent="left"
              alignItems="center"
              spacing={1}
              ml={2}
              my={2}
            >
              <Item elevation={0}><Avatar style={{ marginRight: 0, border: "1px solid black" }} variant='circular' alt={data.assignee.login} src={data.assignee.avatar_url} /></Item>
              <Item elevation={0}><Typography variant='h4'>{data.title}</Typography></Item>
            </Stack>


              <Typography ml={2} my={1} textAlign={'left'} component="pre" variant='body1'>
                <strong>repo: </strong>{data.repository.name} <strong>created_at: </strong>{moment(data.created_at).format("dddd, D/M/YYYY")}
                {"\n"}
                <strong>updated_at: </strong><cite>{moment(data.updated_at).format("dddd, D/M/YYYY, h:mm:ss a")}</cite>
                </Typography>
              <Typography ml={2} my={1} textAlign={'left'} component="pre" variant='body1'>{data.body}</Typography></Container>
            <Container component={'div'}> <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
              style={{ border: "1px solid black" }}

            ><Item elevation={0}>
              {/* <Button onClick={()=>UpdateData(data.comments_url)}>Edit</Button> */}
              <Button onClick={()=>callback({body:(data.body),title:(data.title),open:true,issue_url:data.url})}>Edit</Button>
              </Item><Item elevation={0}><Button onClick={()=>CloseIssue(data.url)}>Delete</Button></Item>
            </Stack></Container>
          </Stack>
        </Item>))}
      </Stack>
      <BasicModal state={state} setState={setState} token={token} LoadIssue={LoadIssue}/>
    </Box>
  );
}