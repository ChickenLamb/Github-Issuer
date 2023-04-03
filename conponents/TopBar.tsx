import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Typography, useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';

interface Props {
    
    LoadIssue:(state:boolean)=>void
    setSortOrder:(payload: string) => void
    sortOrder:string
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius:0
}));

const SearchField = () =>  <Box
component="form"
sx={{
  '& > :not(style)': { m: 1, width: '25ch'},
}}
noValidate
autoComplete="on"
>
<Typography>Search:</Typography>
<TextField id="outlined-basic" label="Outlined" variant="outlined"/>
{/* <TextField id="filled-basic" label="Filled" variant="filled" />
<TextField id="standard-basic" label="Standard" variant="standard" /> */}
</Box>

export default function TopBar({LoadIssue, setSortOrder, sortOrder}:Props) {

function Load_and_Sort(data:string){
    setSortOrder(data);
}
const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <Item elevation={0}><Button onClick={()=>LoadIssue(true)}>Refresh</Button></Item>
        </Grid>
        <Grid item xs={7}>
          <Item elevation={0}><SearchField/></Item>
        </Grid>
        <Grid item xs={3} style={{display:"flex", gap:1,backgroundColor:"#FFF", justifyContent:"flex-end",alignItems:"flex-start"}}>
            <Item elevation={0}><Typography>Sort:</Typography></Item>
            {['created','updated','comments'].map((data,index)=><Item style={{backgroundColor:data.toUpperCase()===sortOrder.toUpperCase()?theme.palette.primary.main:theme.palette.common.white}} key={index} elevation={0}><Button style={{color:data.toUpperCase()===sortOrder.toUpperCase()?theme.palette.common.black:theme.palette.primary.main}} disabled={data.toUpperCase()===sortOrder.toUpperCase()} onClick={()=>Load_and_Sort(data)}>{data}</Button></Item>)}
          
        </Grid>
      </Grid>
    </Box>
  );
}