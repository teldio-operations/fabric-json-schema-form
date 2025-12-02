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
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <CircularProgress color="inherit" />
              </InputAdornment>
            ),
          },
        }}
      />
    );
  }

  return <TextField {...props} />;
};
