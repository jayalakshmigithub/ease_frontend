import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography , CircularProgress} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminSideBar from "./AdminSideBar";
import { adminAxiosInstance } from "../../utils/api/axiosInstance";
import { TbUserSquare } from "react-icons/tb";
import { MdOutlineMailOutline } from "react-icons/md";
import { VscSettingsGear } from "react-icons/vsc";
import { FaBarsProgress } from "react-icons/fa6";
import { width } from "@mui/system";
import { toast } from "react-toastify";


const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [user,setUser] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        console.log('usser before api')
        const response = await adminAxiosInstance.get("/getusers");
        console.log("response in userslist page", response);
        setUsers(response.data);
      } catch (error) {
        console.error("error Fetching Users ", error);
        setError("Failed to Fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlock = (userId) => {
    console.log("Blocking user", userId);
    adminAxiosInstance
      .post("/blockuser", { _id: userId })
      .then((response) => {
        console.log("Response from backend blcok:", response.data);
        const updatedUser = response.data; 
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlocked: true } : user
          )
        );
        toast.success("User blocked successfully");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  const handleUnblock = (userId)=>{
    adminAxiosInstance.post('/unblockuser',{_id:userId})
    .then((response) => {
      console.log("Response from backend unblcok:", response.data);
      const updatedUser = response.data;
      setUsers((prevUsers) =>
          prevUsers.map((user) =>
              user._id === userId
                  ? { ...user, isBlocked: updatedUser.isBlocked }
                  : user
          )
      );
  })
    .catch((error)=>{
      if(error.response&&error.response.data.status===400){
        toast.error(error.response.data.message)
      }else{
        toast.error("an error occured , try agai later")
      }
    })
  }

  const columns = [
    
    { field: "name", headerName: "Username", width: 250 ,
      renderHeader: () => (
        <Box style={{ color: '#734128', fontSize:'18px', fontFamily:"poppins"  }}>
          <span><TbUserSquare /> Username</span>
        </Box>
        
      ),
     },
    { field: "email", headerName: "Email", width: 250 ,
      renderHeader: () => (
        <Box style={{ color: '#734128', fontSize:'18px', fontFamily:"poppins"}}>
          <span><MdOutlineMailOutline /> Email </span>
        </Box>
      )
    },
    { field: "action", headerName: "Action", width: 250 ,
      renderHeader: () => (
        <Box style={{ color: '#734128', fontSize:'18px', fontFamily:"poppins" }}>
          <span><VscSettingsGear /> Actions </span>
        </Box>
      ),
      renderCell:(params)=>{
        const isBlocked = params.row.isBlocked
        const userId = params.row._id

        const handleAction =()=>{
          console.log('inn handle action',userId)

          if(isBlocked){
            handleUnblock(userId)
          }else{
            handleBlock(userId)
          }
        }
        
        return (
         <Button variant="contained"
         color={isBlocked ? "secondary" : "primary"}
         onClick={handleAction}>
        {isBlocked ? "Unblock" :"Block"}
         </Button>
         
          
        )

      }
      
    },
    {field:"isBlocked",
      headerName:'Status',
      width:250,
      renderHeader: () => (
        <Box style={{ color: '#734128', fontSize:'18px', fontFamily:"poppins" }}>
          <span><FaBarsProgress /> Status </span>
        </Box>
      ),
      renderCell: (params) => (
        <span>{params.row.isBlocked ? "Blocked" : "Active"}</span>
      ),
    }
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#F6F5EC",
        width: "100vw",
        height: "100vh",
        display: "flex",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
     
      <AdminSideBar />

      <Box
        sx={{
          flexGrow: 1,
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Container sx={{ width: "100%" }}>
          <Typography variant="h4" gutterBottom sx={{color:'#7B7369'}}>
            User Management
          </Typography>

          <Box style={{ height: 400, width: "100%" }}>
            {loading ? (
               <Box
               display="flex"
               justifyContent="center"
               alignItems="center"
               sx={{
                 flexGrow: 1,
                 padding: "20px",
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "flex-start",
               }}
             >
               <CircularProgress sx={{color:'brown'}}/>
             </Box>
            ) : error ? (
              <Typography variant="h4" color="error">
                {error}
              </Typography>
            ) : users ? (
              <DataGrid
                sx={{
                  padding: "8px",
                  borderRadius: "10px",
                  fontFamily:'poppins'
                }}
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                getRowId={(row)=>row._id}
                pagination
              />
            ) : (
              <Typography variant="h4">No users found</Typography>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default UsersList;
