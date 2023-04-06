import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography, useTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
interface Props {
  setTag:(payload: string) => void
  query: Query
  SearchQuery: (q: string) => Promise<void>
  LoadIssue: (state: boolean) => void
  token: string
  state: string
  labels: Label[]
  labels_url: string
}
interface Label {
  color: string
  description: string
  name: string
  url: string
}
interface Query {
  state: boolean;
  q: string;
}
export default function PositionedMenu({ setTag, query, SearchQuery, LoadIssue, token, state, labels, labels_url }: Props) {
  const axios = require('axios');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const SelectTag = (label:string) => {
    setTag(label);
  };

  const DeleteTag = (label_url:string) => {
    const id = toast.loading("Deleting Tag...");
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://github-get-token-api.vercel.app/api/delete-tag?token=` + `${token}` + '&label_url=' + `${label_url}`,
    };
    axios.request(config)
      .then((response: any) => {
        console.log(JSON.stringify(response.data));
        if (response.status === 200) {
          toast.update(id, { render: "Tag Deleted Successfully", type: "success", isLoading: false, autoClose: 500 });
          setTimeout(() => {
            if (query.state) {
              SearchQuery(query.q);
            } else {
              LoadIssue(true);
            }



          }, 500);
        }
      })
      .catch((error: any) => {
        console.log(error);
        toast.update(id, { render: "Failed to Delete Tag", type: "error", isLoading: false, autoClose: 2500 });
      });
  };

  function AddTags(labels_url: string, tag: string) {
    const id = toast.loading("Adding Tag...");
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://github-get-token-api.vercel.app/api/add-tag?token=` + `${token}` + '&labels_url=' + `${labels_url}` + '&tag=' + `${tag}`,
    };
    axios.request(config)
      .then((response: any) => {
        console.log(JSON.stringify(response.data));
        if (response.status === 200) {
          toast.update(id, { render: "Tag Added Successfully", type: "success", isLoading: false, autoClose: 500 });
          setTimeout(() => {
            if (query.state) {
              SearchQuery(query.q);
            } else {
              LoadIssue(true);
            }



          }, 500);
        }
      })
      .catch((error: any) => {
        console.log(error);
        toast.update(id, { render: "Failed to Add Tag", type: "error", isLoading: false, autoClose: 2500 });
      });
  }

  return (
    <div>

      <Stack direction="row" spacing={1}>

        {labels?.map((data, index) => {
          return <Chip
          key={index} 
            label={data.name}
            onClick={()=>SelectTag(data.name)}
            onDelete={()=>DeleteTag(data.url)}
            style={{backgroundColor:"#"+data.color}}
          />
        })}
        <Chip
          label="+"
          onClick={handleClick}
          component="a"
          href="#basic-chip"
          variant="outlined"
          clickable
        />
      </Stack>

      {/* {labels?.map((data,index)=>{return <Typography variant="h3"  key={index}><Typography variant="h6" component="span" p={1} style={{backgroundColor:"#"+data.color}}>{data.name}</Typography>{((labels.length-1) !== index)?", ":""}</Typography>})} */}


      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        style={{marginLeft:3}}
      >
        {['Open', 'In Progress', 'Done']?.map((data, index) => { return <Button key={index} onClick={() => AddTags(labels_url, data)}>{data}</Button> })}
        {/* {['Open', 'In Progress', 'Done'].map((data, index) => { return <MenuItem key={index} style={{ backgroundColor: data.toUpperCase() === state.toUpperCase() ? theme.palette.primary.main : theme.palette.common.white }} onClick={handleClose}>{data}</MenuItem> })} */}
      </Menu>
    </div>
  );
}