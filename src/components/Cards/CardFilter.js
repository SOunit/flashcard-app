import React, { memo } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const levels = ["Critical", "High", "Normal", "Low"];

const CardFilter = memo(({ onChange, value }) => {
  return (
    <div>
      <FormControl sx={{ mx: "10px", my: "5px", width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Level</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput label="Level" />}
          renderValue={selected => selected.join(" / ")}
          MenuProps={MenuProps}
        >
          {levels.map(item => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={value.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
});

export default CardFilter;
