import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

interface Props {
  Data: any;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicStack({ Data }: Props) {
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
          <Typography ml={2} py={1} variant='body1' style={{ border: "1px solid black", width: "10%", minWidth: "10%", borderRadius: 5 }}>{data.state}</Typography>
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


              <Typography ml={2} my={1} textAlign={'left'} variant='body1'>{data.repository.name}</Typography>
              <Typography ml={2} my={1} textAlign={'left'} variant='body1'>{data.body}</Typography></Container>
            <Container component={'div'}> <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
              style={{ border: "1px solid black" }}

            ><Item elevation={0}><Button>Edit</Button></Item><Item elevation={0}><Button>Delete</Button></Item>
            </Stack></Container>
          </Stack>
        </Item>))}
      </Stack>
    </Box>
  );
}