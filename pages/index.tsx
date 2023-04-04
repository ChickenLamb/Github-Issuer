import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';
import ButtonAppBar from '@/conponents/ButtonAppBar';
import { useEffect, useRef, useState } from 'react'
import BasicStack from '@/conponents/BasicStack';
import UpdateModal from '@/conponents/Update_Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopBar from '@/conponents/TopBar';

const CLIENTID = "9413d76463c0af53a8a0";

interface FormData {
  title?: string,
  body?: string,
  open: boolean,
  issue_url?: string
}
interface Issue {
  state: string;
  labels: string[];
  assignee_name: string;
  assignee_avatar_url: string;
  repository_name: string;
  date_created_at: Date;
  date_updated_at: Date;
  url: string;
  title: string;
  body: string;
  html_url: string;
}
interface Query {
  state: boolean;
  q: string;
}
export default function Home() {
  const axios = require('axios');
  const shouldRender = useRef([true, true, true, true, true, false]);
  const [query, setQuery] = useState<Query>({ state: false, q: "" });
  const [issues, setIssues] = useState<Issue[]>();
  const [access_token, setAccess_Token] = useState<string>("");
  const [update_form, setUpdate_Form] = useState<FormData>({ open: false });
  const [sortOrder, setSortOrder] = useState<string>("created");
  const handleClose = () => { setUpdate_Form({ ...update_form, open: false }); shouldRender.current[3] = true; };
  const callback = (payload: FormData) => {
    setUpdate_Form(payload);
    shouldRender.current[3] = true;
  }

  const setIssue_callback = (payload: any) => {
    setIssues(payload);
  }
  const setSortOrder_callback = (payload: string) => {
    setSortOrder(payload);
    shouldRender.current[4] = true;
  }
  const setQuery_callback = (payload: Query) => {
    setQuery(payload);
    shouldRender.current[5] = true;
  }
  const LoadIssue = async (reload: boolean) => {
    if (reload === true) {
      const id = toast.loading("Fetching Issues...");
      shouldRender.current[2] = true;
      console.log("trigger reload");
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://github-get-token-api.vercel.app/api/get-issues-sort?token=' + `${access_token}` + '&sort=' + `${sortOrder}`,

      };

      await axios.request(config)
        .then((response: any) => {
          console.log((response));
          const data = response.data.map((data: any) => {
            return {
              state: data.state,
              labels: data.labels,
              assignee_name: data.assignee.login,
              assignee_avatar_url: data.assignee.avatar_url,
              repository_name: data.repository.name,
              date_created_at: data.created_at,
              date_updated_at: data.updated_at,
              url: data.url,
              title: data.title,
              body: data.body,
              html_url: data.html_url
            }
          })
          setIssues(data);
          toast.update(id, { render: "Issues Loaded successfully", type: "success", isLoading: false, autoClose: 2500 });
        })
        .catch((error: any) => {
          console.log(error);
          toast.update(id, { render: "Something went wrong", type: "error", isLoading: false, autoClose: 2500 });
        });
    }
  }

  const SearchQuery = async (q: string) => {

    const id = toast.loading("Fetching Issues...");
    shouldRender.current[2] = true;
    console.log("trigger reload");
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://github-get-token-api.vercel.app/api/search-query?token=' + `${access_token}` + '&query=' + `${q}`+ '&sort=' + `${sortOrder}`,

    };

    await axios.request(config)
      .then((response: any) => {
        console.log((response.data.items));
        const data = response.data.items.map((data: any) => {
          return {
            state: data.state,
            labels: data.labels,
            assignee_name: data.assignee.login,
            assignee_avatar_url: data.assignee.avatar_url,
            repository_name: data.repository_url.substring(data.repository_url.lastIndexOf('/') + 1),
            date_created_at: data.created_at,
            date_updated_at: data.updated_at,
            url: data.url,
            title: data.title,
            body: data.body,
            html_url: data.html_url
          }
        })
        setIssues(data);
        toast.update(id, { render: "Issues Loaded successfully", type: "success", isLoading: false, autoClose: 2500 });
      })
      .catch((error: any) => {
        console.log(error);
        toast.update(id, { render: "Something went wrong", type: "error", isLoading: false, autoClose: 2500 });
      });

  }

  function validate_and_setToken(github_access_key: string) {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://github-get-token-api.vercel.app/api/validate?key=' + `${github_access_key}`,

    };

    axios.request(config)
      .then((response: any) => {
        if (response.status === 200) {
          setAccess_Token(github_access_key);
          console.log("using local_key");
        }
      })
      .catch((error: any) => {
        localStorage.clear();
      });
  }

  useEffect(() => { if (shouldRender.current[3]) { shouldRender.current[3] = false;; console.log(update_form) } }, [update_form]);
  useEffect(() => {
    if (shouldRender.current[0]) {
      shouldRender.current[0] = false;
      // 需要檢查token的有效期和儲存token到local
      const github_access_key = (localStorage.getItem('github_access_key') ?? "");
      validate_and_setToken(github_access_key);

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if ((urlParams.get("code"))) {
        let CODE = urlParams.get("code");
        // 移除param 'code' not done

        console.log("code:" + CODE);
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://github-get-token-api.vercel.app/api/get?code=' + `${CODE}`,

        };
        axios.request(config)
          .then((response: any) => {
            console.log(JSON.stringify(response.data));
            setAccess_Token(response.data.access_token);
            localStorage.setItem('github_access_key', (response.data.access_token));
          })
          .catch((error: any) => {
            console.log(error);
          });

      };
    }

  }, []);

  useEffect(() => {
    if (shouldRender.current[4] && access_token !== "") {
      shouldRender.current[4] = false;
      if(query.state){
        SearchQuery(query.q);
      }
      else{
        LoadIssue(true)
      }
    }
  }, [sortOrder]);
  useEffect(() => {
    if (shouldRender.current[1] && access_token !== "") {
      shouldRender.current[1] = false;
      // 就算有access token 它也只會呼叫一次

      LoadIssue(true);
    }
  }, [access_token]);
  useEffect(() => {
    if (shouldRender.current[2] && issues !== undefined) {
      shouldRender.current[2] = false; console.log("this is issue", issues)
    }
  }, [issues]);
  useEffect(() => {
    if (shouldRender.current[5]) {
      shouldRender.current[5] = false;

      if (query.q !== "" && query.state) {
        SearchQuery(query.q);
      }
      else {
        LoadIssue(true);
      }

    }
  }, [query]);
  return (
    <>
      <CssBaseline />
      <Head>
        <title>2023 Frontend Intern Homework</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="xl" disableGutters={true}>
        {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100lvh' }} >
        </Box> */}
        <ButtonAppBar clientid={CLIENTID} />
        <TopBar setQuery={setQuery_callback} setIssues={setIssue_callback} token={access_token} LoadIssue={LoadIssue} setSortOrder={setSortOrder_callback} sortOrder={sortOrder} />
        {issues !== undefined && <BasicStack query={query} SearchQuery={SearchQuery} Data={issues} token={access_token} callback={callback} LoadIssue={LoadIssue} />}
        <UpdateModal query={query} SearchQuery={SearchQuery} updateForm={update_form} handleClose={handleClose} token={access_token} LoadIssue={LoadIssue} />
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
      </Container>


    </>
  )
}
