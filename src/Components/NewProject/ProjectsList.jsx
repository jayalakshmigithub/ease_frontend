import React ,{ useState, useEffect }from 'react'
import { Button, Card, Box, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, CardContent, TextField } from '@mui/material';


const ProjectsList = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px",
            borderRadius: '12px'
          }}
        >
          <Typography
            sx={{
              display: "flex",
              padding: "8px",
              marginLeft: "10px",
              marginTop: "5px",
              fontFamily: "poppins",
            }}
            variant="h6"
            gutterBottom
          >
            Project List
          </Typography>
        </Box>
        
        <CardContent>
        
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
            fullWidth
              label="Search by Name"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button onClick={() => handleSort('name')}>Sort by Name</Button>
            <Button onClick={() => handleSort('date')}>Sort by Date</Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#E5E4E2" }}>
                  <TableCell>Workspace Name</TableCell>
                  <TableCell>Workspace Description</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredWorkspaces.length > 0 ? (
                  filteredWorkspaces.map((workspace, index) => (
                    <TableRow key={index}>
                      <TableCell>{workspace.name}</TableCell>
                      <TableCell>{workspace.description}</TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          onClick={() => handleDelete(workspace._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No workspace found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ProjectsList
