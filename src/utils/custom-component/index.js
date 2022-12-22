import { TextField, OutlinedInput, Autocomplete, Select } from '@mui/material';

import { styled } from '@mui/material/styles';

export const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#673AB7'
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#673AB7'
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#673AB7'
        }
    }
});

export const CssSelect = styled(Select)({
    '&.MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#673AB7'
        }
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#673AB7'
    }
});

export const CssAutoComplete = styled(Autocomplete)({
    '&.MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#673AB7'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#673AB7'
        }
    }
});
