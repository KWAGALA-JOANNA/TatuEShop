import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { ThemeContext } from "../../Theme/ThemeProvider.jsx";
import { useContext } from "react";
import PropTypes from "prop-types";
import {
  Autocomplete,
  TextField,
  Paper,
  ListItem,
  ListItemText,
  Box,
  styled,
  useTheme as useMuiTheme,
} from "@mui/material";

const Searchbar = ({ isMobile = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const muiTheme = useMuiTheme();

  // Custom styled components for better theming
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#374151" : "#ffffff",
    color: theme.palette.mode === "dark" ? "#ffffff" : "#111827",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "& .MuiAutocomplete-listbox": {
      padding: 0,
      maxHeight: "400px",
    },
    width: "100%",
  }));

  const StyledListItem = styled(ListItem)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#4B5563" : "#F3F4F6",
    },
    padding: "8px 16px",
  }));

  // Mock function to fetch suggestions
  const fetchSuggestions = async (query) => {
    if (query.length > 2) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockSuggestions = [
            { id: 1, name: `${query} product 1`, category: "Electronics" },
            { id: 2, name: `${query} product 2`, category: "Clothing" },
            { id: 3, name: `${query} accessory`, category: "Accessories" },
          ];
          resolve(mockSuggestions);
        }, 300);
      });
    }
    return [];
  };

  useEffect(() => {
    const getSuggestions = async () => {
      const results = await fetchSuggestions(searchQuery);
      setSuggestions(results);
    };

    const debounceTimer = setTimeout(() => {
      getSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsFocused(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (suggestion) {
      navigate(`/product/${suggestion.id}`);
      setSearchQuery("");
      setIsFocused(false);
    }
  };

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "auto",
        maxWidth: isMobile ? "100%" : "600px",
        flexGrow: isMobile ? 1 : 0.8,
        px: isMobile ? 2 : 0,
        py: isMobile ? 2 : 0,
      }}
    >
      <form onSubmit={handleSearch}>
        <Autocomplete
          freeSolo
          options={suggestions}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name
          }
          onInputChange={(_, value) => setSearchQuery(value)}
          onChange={(_, value) => handleSelectSuggestion(value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search products, brands, categories..."
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 1.5,
                      color: theme === "dark" ? "grey.300" : "grey.500",
                    }}
                  >
                    <FaSearch size={18} />
                  </Box>
                ),
                sx: {
                  borderRadius: "12px",
                  backgroundColor: theme === "dark" ? "grey.800" : "grey.100",
                  height: "42px",
                  "& input": {
                    padding: "12px 14px",
                    fontSize: "0.95rem",
                    color: theme === "dark" ? "#ffffff" : "#111827", // Text color changes with theme
                    "&::placeholder": {
                      color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)", // Placeholder color changes
                    },
                  },
                  "& fieldset": {
                    borderColor: isFocused
                      ? muiTheme.palette.primary.main
                      : "transparent",
                    borderWidth: "1.5px",
                  },
                  "&:hover fieldset": {
                    borderColor: muiTheme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: muiTheme.palette.primary.main,
                    boxShadow: `0 0 0 3px ${
                      muiTheme.palette.mode === "dark"
                        ? muiTheme.palette.primary.dark
                        : muiTheme.palette.primary.light
                    }`,
                  },
                  transition: "all 0.2s ease",
                },
              }}
            />
          )}
          renderOption={(props, option) => (
            <StyledListItem {...props} component="div">
              <ListItemText
                primary={option.name}
                secondary={option.category}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 500,
                    color: theme === "dark" ? "grey.100" : "grey.900",
                    fontSize: "0.95rem",
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: "0.8rem",
                    color: theme === "dark" ? "grey.400" : "grey.500",
                  },
                }}
              />
            </StyledListItem>
          )}
          PaperComponent={({ children }) => (
            <StyledPaper elevation={8}>{children}</StyledPaper>
          )}
          popupIcon={null}
          clearOnBlur={false}
          sx={{
            "& .MuiAutocomplete-endAdornment": {
              right: "12px",
            },
            "& .MuiAutocomplete-inputRoot": {
              paddingRight: "36px !important",
            },
          }}
        />
      </form>
    </Box>
  );
};

Searchbar.propTypes = {
  isMobile: PropTypes.bool,
  onSearch: PropTypes.func,
  onSuggestionSelect: PropTypes.func,
  fetchSuggestions: PropTypes.func,
  debounceTime: PropTypes.number,
};

Searchbar.defaultProps = {
  isMobile: false,
  debounceTime: 300,
};

export default Searchbar;