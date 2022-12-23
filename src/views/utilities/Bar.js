// material-ui
import MainCard from 'ui-component/cards/MainCard';
import { Box, Grid, InputAdornment, FormControl, OutlinedInput, InputLabel, Select, MenuItem } from '@mui/material';

import BarItem from './bar/BarItem';
import CurrentOrder from './bar/CurrentOrder';
import SearchIcon from '@mui/icons-material/Search';

const Bar = ({ ...others }) => {
    return (
        <MainCard title="Chainhaus Bar">
            <Grid container direction="row" spacing={2}>
                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1} item xs={8}>
                    <Grid container direction="column" spacing={2}>
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
                            <Grid item xs={3}>
                                <FormControl sx={{ width: '100%', pt: 1, pb: 1 }}>
                                    <InputLabel id="category-select">Category</InputLabel>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" color="secondary" label="Catrgory">
                                        <MenuItem value={10}>All</MenuItem>
                                        <MenuItem value={20}>Drinks</MenuItem>
                                        <MenuItem value={30}>Foods</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} item>
                            {Array.from(Array(6)).map((_, index) => (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <BarItem />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" spacing={1} item xs={4}>
                    <Grid item>
                        <CurrentOrder />
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Bar;
