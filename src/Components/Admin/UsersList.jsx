import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography , CircularProgress,useTheme,useMediaQuery} from "@mui/material";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); 
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm")); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminAxiosInstance.get("/getusers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlock = (userId) => {
    adminAxiosInstance
      .post("/blockuser", { _id: userId })
      .then((response) => {
        const updatedUser = response.data;
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlocked: true } : user
          )
        );
        toast.success("User blocked successfully");
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again later.");
      });
  };

  const handleUnblock = (userId) => {
    adminAxiosInstance
      .post("/unblockuser", { _id: userId })
      .then((response) => {
        const updatedUser = response.data;
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlocked: updatedUser.isBlocked } : user
          )
        );
      })
      .catch(() => {
        toast.error("An error occurred. Please try again later.");
      });
  };

  const columns = [
    {
      field: "name",
      headerName: "Username",
      width: isSmDown ? 150 : 250,
      renderHeader: () => (
        <Box style={{ color: "#734128", fontSize: "18px", fontFamily: "poppins" }}>
          <TbUserSquare /> Username
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: isSmDown ? 150 : 250,
      renderHeader: () => (
        <Box style={{ color: "#734128", fontSize: "18px", fontFamily: "poppins" }}>
          <MdOutlineMailOutline /> Email
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: isSmDown ? 150 : 250,
      renderHeader: () => (
        <Box style={{ color: "#734128", fontSize: "18px", fontFamily: "poppins" }}>
          <VscSettingsGear /> Actions
        </Box>
      ),
      renderCell: (params) => {
        const isBlocked = params.row.isBlocked;
        const userId = params.row._id;

        const handleAction = () => {
          if (isBlocked) {
            handleUnblock(userId);
          } else {
            handleBlock(userId);
          }
        };

        return (
          <Button
            variant="contained"
            color={isBlocked ? "secondary" : "primary"}
            size={isSmDown ? "small" : "medium"} 
            onClick={handleAction}
          >
            {isBlocked ? "Unblock" : "Block"}
          </Button>
        );
      },
    },
    {
      field: "isBlocked",
      headerName: "Status",
      width: isSmDown ? 100 : 250,
      renderHeader: () => (
        <Box style={{ color: "#734128", fontSize: "18px", fontFamily: "poppins" }}>
          <FaBarsProgress /> Status
        </Box>
      ),
      renderCell: (params) => (
        <Typography
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: isSmDown ? "12px" : "14px", 
          }}
        >
          {params.row.isBlocked ? "Blocked" : "Active"}
        </Typography>
      ),
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#F6F5EC",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: isMdUp ? "row" : "column", 
        overflowX: "hidden",
      }}
    >
      <AdminSideBar />
      <Box
        sx={{
          flexGrow: 1,
          padding: isSmDown ? "10px" : "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Container sx={{ width: "100%" }}>
          <Typography
            variant={isSmDown ? "h6" : "h4"} 
            gutterBottom
            sx={{ color: "#7B7369", textAlign: isSmDown ? "center" : "left" }}
          >
            User Management
          </Typography>

          <Box style={{ height: isSmDown ? 300 : 400, width: "100%" }}>
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ flexGrow: 1 }}
              >
                <CircularProgress sx={{ color: "brown" }} />
              </Box>
            ) : error ? (
              <Typography variant="h6" color="error" textAlign="center">
                {error}
              </Typography>
            ) : users ? (
              <DataGrid
                sx={{
                  padding: "8px",
                  borderRadius: "10px",
                  fontFamily: "poppins",
                  fontSize: isSmDown ? "12px" : "14px", 
                }}
                rows={users}
                columns={columns}
                pageSize={isSmDown ? 3 : 5} 
                rowsPerPageOptions={[3, 5]}
                disableSelectionOnClick
                getRowId={(row) => row._id}
                pagination
              />
            ) : (
              <Typography variant="h6">No users found</Typography>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};


export default UsersList;
