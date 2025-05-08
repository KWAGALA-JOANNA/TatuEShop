import PropTypes from "prop-types";
import { useState } from "react";
import { TextField, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const DateRangePicker = ({ value, onChange }) => {
  const [startDate, setStartDate] = useState(value.start);
  const [endDate, setEndDate] = useState(value.end);

  const handleDateChange = (type, newValue) => {
    if (type === "start") {
      setStartDate(newValue);
    } else {
      setEndDate(newValue);
    }

    if (startDate && endDate) {
      onChange({ start: startDate, end: endDate });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction="row" spacing={2}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => handleDateChange("start", newValue)}
          maxDate={endDate || new Date()}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => handleDateChange("end", newValue)}
          minDate={startDate}
          maxDate={new Date()}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

DateRangePicker.propTypes = {
  value: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateRangePicker;
