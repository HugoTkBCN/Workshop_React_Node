import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  input: {
    height: 40,
    width: 300,
  },
  button: {
    height: 40,
  },
  selectRoot: {
    height: 40,
    display: "table",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  select: {
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    display: "table-cell",
    verticalAlign: "middle",
  },
});

const EditableField = withStyles(styles)((props) => {
  const { classes, label, onSave, onDelete, style, dropdown, saveButtonText } = props;
  const [value, setValue] = useState(props.value);
  const navigate = useNavigate();

  useEffect(() => {}, [value]);

  return (
    <div style={style}>
      <Grid container direction="row" spacing="8">
        <Grid item>
          <TextField
            variant="outlined"
            select={dropdown}
            disabled={onSave ? false : true}
            label={label}
            value={value}
            onChange={(x) => setValue(x.target.value)}
            SelectProps={{
              className: classes.input,
            }}
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          >{dropdown && props.children}</TextField>
        </Grid>
        {onSave &&
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              size="large"
              onClick={() => onSave(value)}
            >
              {saveButtonText || "Save"}
            </Button>
          </Grid>
        }
        {onDelete && (
          <Grid item>
            <Button
              variant="contained"
              color="error"
              className={classes.button}
              size="large"
              onClick={() => onDelete(value)}
            >
              Delete
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
});

export default EditableField;
