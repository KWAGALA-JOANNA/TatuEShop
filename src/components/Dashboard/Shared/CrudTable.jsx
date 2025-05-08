import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import LoadingSpinner from './LoadingSpinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';

const CrudTable = ({ title, data, columns, loading, error, onRefresh, basePath }) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={onRefresh} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div>
          <Button component={Link} to={`${basePath}/new`} variant="contained">
            Add New
          </Button>
          <Button onClick={onRefresh} className="ml-2">
            Refresh
          </Button>
        </div>
      </div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={`${row.id}-${column.field}`}>
                    {column.renderCell ? column.renderCell(row) : row[column.field]}
                  </TableCell>
                ))}
                <TableCell>
                  <Button component={Link} to={`${basePath}/${row.id}`} size="small">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

CrudTable.propTypes = {
  /** The title to display above the table */
  title: PropTypes.string.isRequired,
  
  /** Array of data objects to display in the table */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      // Other properties will be validated based on columns configuration
    })
  ).isRequired,
  
  /** Configuration for table columns */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /** The field name in the data object */
      field: PropTypes.string.isRequired,
      
      /** The display name for the column header */
      headerName: PropTypes.string.isRequired,
      
      /** Optional render function for custom cell content */
      renderCell: PropTypes.func,
      
      /** Data type for special formatting (optional) */
      type: PropTypes.oneOf(['string', 'number', 'date', 'boolean']),
    })
  ).isRequired,
  
  /** Loading state indicator */
  loading: PropTypes.bool,
  
  /** Error message to display if data loading fails */
  error: PropTypes.string,
  
  /** Function to call when refresh button is clicked */
  onRefresh: PropTypes.func.isRequired,
  
  /** Base path for navigation links */
  basePath: PropTypes.string.isRequired,
};

CrudTable.defaultProps = {
  loading: false,
  error: null,
};

export default CrudTable;