import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardMedia, CardContent, CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';

export default function CurrentOrderItem() {
    const [count, setCount] = React.useState(1);

    return (
        <Card variant="outlined" sx={{ display: 'flex', backgroundColor: '#F5F5F5', color: '#5e35b1', position: 'relative' }}>
            <IconButton aria-label="remove" color="secondary" sx={{ position: 'absolute', right: 0 }}>
                <DeleteIcon />
            </IconButton>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={0}>
                <Grid
                    container
                    item
                    xs={12}
                    sm={5}
                    md={4}
                    sx={{ backgroundColor: '#FFFFFF', height: '100%', width: 'auto' }}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CardMedia
                        component="img"
                        sx={{ maxWidth: 151 }}
                        image="https://img.sosanhgia.com/images/500x0/11a9cc80862d439d9b8dc7a7d8f43369/nuoc-tang-luc-redbull.jpeg"
                        alt="Live from space album cover"
                    />
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                    <Grid container direction="column">
                        <Grid item xs={12} sm={12} md={8}>
                            <CardContent>
                                <Typography component="div" gutterBottom variant="h5" sx={{ color: '#5E35B1' }}>
                                    Nước tăng lực Redbull
                                </Typography>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    style={{
                                        display: 'inline-block',
                                        color: '#5E35B1'
                                    }}
                                >
                                    Redbull 250ml giúp cơ thể bù đắp nước, bổ sung năng lượng, vitamin và các khoáng chất.
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                            <CardActions sx={{ display: 'flex', flexDirection: 'row', width: '100%', pt: 0 }}>
                                <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing="0">
                                    <Grid item xs={12} xl={3} container direction="row" justifyContent="flex-start" alignItems="center">
                                        <Typography component="div" variant="h4" sx={{ color: '#4527A0', p: '5px' }}>
                                            20.000
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} xl={9} container direction="row" justifyContent="flex-end" alignItems="center">
                                        <ButtonGroup size="small">
                                            <Button
                                                size="small"
                                                color="secondary"
                                                aria-label="reduce"
                                                onClick={() => {
                                                    setCount(Math.max(count - 1, 0));
                                                }}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </Button>
                                            <FormControl sx={{ border: '1px #673ab7 solid' }}>
                                                <Input
                                                    id="item1-quantity"
                                                    value={count}
                                                    sx={{ height: '26', width: '40px' }}
                                                    disableUnderline="true"
                                                    inputProps={{ style: { textAlign: 'center' } }}
                                                />
                                            </FormControl>
                                            <Button
                                                size="small"
                                                color="secondary"
                                                aria-label="increase"
                                                onClick={() => {
                                                    setCount(count + 1);
                                                }}
                                            >
                                                <AddIcon fontSize="small" />
                                            </Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}
