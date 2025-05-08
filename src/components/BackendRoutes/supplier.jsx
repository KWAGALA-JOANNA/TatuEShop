// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../components/Hooks/UseAuth.jsx';
// import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';

// // Define the API URL
// const API_URL = import.meta.env.VITE_API_URL + "/suppliers/getall";

// const Suppliers = () => {
//   const [suppliers, setSuppliers] = useState([]); // Initialize as an empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { isAdmin } = useAuth();

//   // Fetch suppliers from the backend
//   useEffect(() => {
//     const fetchSuppliers = async () => {
//       try {
//         const response = await axios.get(API_URL, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         console.log("API Response:", response.data); // Log the response

//         // Handle invalid responses
//         if (!response.data || !Array.isArray(response.data)) {
//           setError('Invalid data format received from the server.');
//           return;
//         }

//         setSuppliers(response.data);
//       } catch (error) {
//         setError('Error fetching suppliers. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSuppliers();
//   }, []);

//   // Handle empty data
//   if (suppliers.length === 0 && !loading && !error) {
//     return (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">Suppliers</h1>
//         <Alert severity="info">No suppliers found.</Alert>
//       </div>
//     );
//   }

//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <Alert severity="error">{error}</Alert>;
//   }

//   if (!isAdmin()) {
//     return <Alert severity="error">Access denied. Admins only.</Alert>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Suppliers</h1>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {suppliers.map((supplier) => (
//               <TableRow key={supplier.id}>
//                 <TableCell>{supplier.name}</TableCell>
//                 <TableCell>{supplier.email}</TableCell>
//                 <TableCell>{supplier.status}</TableCell>
//                 <TableCell>
//                   {supplier.status === 'pending' && (
//                     <>
//                       <Button
//                         variant="contained"
//                         color="success"
//                         onClick={() => handleApprove(supplier.id)}
//                         sx={{ mr: 1 }}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleReject(supplier.id)}
//                       >
//                         Reject
//                       </Button>
//                     </>
//                   )}
//                   <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() => handleDelete(supplier.id)}
//                     sx={{ ml: 1 }}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default Suppliers;
