

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Button,
  Card,
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CardContent,
  TextField,
} from "@mui/material";
import { userAxiosInstance } from "../utils/api/axiosInstance";



const WorkspaceList = ({
  searchTerm,
  onSearch,
  onDelete,
  handleSort,
  workspaces,
}) => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #E5E4E2",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 500,
            }}
            variant="h6"
            gutterBottom
          >
            Workspace List
          </Typography>
          <TextField
            fullWidth
            sx={{ maxWidth: 400 }}
            label="Search by Name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </Box>

        <CardContent>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button variant="contained" onClick={() => handleSort("name")}>
              Sort by Name
            </Button>
            <Button variant="contained" onClick={() => handleSort("date")}>
              Sort by Date
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#E5E4E2" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Workspace Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Workspace Description
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workspaces.length > 0 ? (
                  workspaces.map((workspace) => (
                    <TableRow key={workspace._id}>
                      <TableCell>{workspace.name}</TableCell>
                      <TableCell>{workspace.description}</TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => onDelete(workspace._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No workspaces found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WorkspaceList;
