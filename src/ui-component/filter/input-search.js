import { SearchOutlined } from '@ant-design/icons';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';

export function InputSearch({ search, handleSearch, placeholder = 'Search...', width = 300 }) {
    return (
        <FormControl sx={{ width: { xs: '100%', md: width } }}>
            <OutlinedInput
                size="small"
                id="header-search"
                startAdornment={
                    <InputAdornment position="start" sx={{ mr: 0.5 }}>
                        <SearchOutlined />
                    </InputAdornment>
                }
                aria-describedby="header-search-text"
                inputProps={{
                    'aria-label': 'weight'
                }}
                placeholder={placeholder}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                color="secondary"
            />
        </FormControl>
    );
}
