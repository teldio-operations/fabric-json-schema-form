import {
  CircularProgress,
  InputAdornment,
  Stack,
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
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ pr: 1 }}>
                <CircularProgress size="1em" color="inherit" />
              </InputAdornment>
            ),
          },
        }}
      >
        {props.children && (
          <Stack position="relative">
            {props.children}

            {props.select && (
              <Stack
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                sx={{
                  backgroundColor: (t) => t.palette.action.disabledOpacity,
                }}
              >
                <CircularProgress color="inherit" />
              </Stack>
            )}
          </Stack>
        )}
      </TextField>
    );
  }

  return <TextField {...props} />;
};
