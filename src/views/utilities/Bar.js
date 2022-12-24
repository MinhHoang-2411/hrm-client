// material-ui
import MainCard from 'ui-component/cards/MainCard';
import { Box, Grid, InputAdornment, FormControl, OutlinedInput, InputLabel, Select, MenuItem, Stack, Pagination } from '@mui/material';
import BarItem from './bar/BarItem';
import CurrentOrder from './bar/CurrentOrder';
import SearchIcon from '@mui/icons-material/Search';

const Bar = ({ ...others }) => {
    return (
        <MainCard title="Chainhaus Bar">
            <Grid container spacing={3} justifyContent="center">
                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1} item xs={12} sm={10} md={8}>
                    <Grid container direction="column" spacing={3}>
                        <Grid container direction="row" spacing={1} item>
                            <Grid item xs={4}>
                                <FormControl sx={{ width: '100%', pt: 1, pb: 1, pr: 1 }}>
                                    <OutlinedInput
                                        id="header-search"
                                        color="secondary"
                                        startAdornment={
                                            <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
                                        aria-describedby="header-search-text"
                                        placeholder="Name, category"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={8}>
                                <FormControl sx={{ minWidth: 150, mt: 1, mb: 1 }}>
                                    <InputLabel id="category-select-label" color="secondary">
                                        Category
                                    </InputLabel>
                                    <Select labelId="category-select-label" id="category-select" color="secondary" label="Catrgory">
                                        <MenuItem value={10}>All</MenuItem>
                                        <MenuItem value={20}>Drinks</MenuItem>
                                        <MenuItem value={30}>Foods</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} item>
                            {Array.from(Array(6)).map((_, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <BarItem />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container direction="row" justifyContent="center" item>
                            <Pagination count={10} color="secondary" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" spacing={1} item xs={12} sm={2} md={4}>
                    <Grid item>
                        <CurrentOrder />
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Bar;
