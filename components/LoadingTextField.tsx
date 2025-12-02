import {
  CircularProgress,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";

type Props = TextFieldProps & {
  loading?: boolean;
};
export const LoadingTextField = ({ loading, ...props }: Props) => {
  if (loading) {
    return (
      <TextField
        {...props}
        disabled
        value="Loading..."
        select={false}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ pr: 1 }}>
                <CircularProgress size="1em" color="inherit" />
              </InputAdornment>
            ),
          },
        }}
      />
    );
  }

  return <TextField {...props} />;
};
