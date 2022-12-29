import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardMedia, CardContent, CardActions } from '@mui/material';

export default function CurrentOrderItem() {
    return (
        <Card variant="outlined" sx={{ display: 'flex', backgroundColor: '#F5F5F5', color: '#5e35b1', position: 'relative' }}>
            <IconButton aria-label="remove" color="secondary" sx={{ position: 'absolute', right: 0 }}>
                <DeleteIcon />
            </IconButton>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://img.sosanhgia.com/images/500x0/11a9cc80862d439d9b8dc7a7d8f43369/nuoc-tang-luc-redbull.jpeg"
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexFlow: 'row wrap' }}>
                <CardContent sx={{ pb: 0 }}>
                    <Typography component="div" gutterBottom variant="h5" sx={{ color: '#5E35B1' }}>
                        Nước tăng lực Redbull
                    </Typography>
                    <Typography
                        component="span"
                        variant="body2"
                        style={{
                            display: 'inline-block',
                            color: '#5E35B1',
                            maxHeight: 45,
                            maxWidth: 250,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Nước tăng lực Redbull 250ml giúp cơ thể bù đắp nước, bổ sung năng lượng, vitamin và các khoáng chất.
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Typography component="div" variant="h3" sx={{ flexGrow: 1, color: '#4527A0' }}>
                        20.000
                    </Typography>
                    <ButtonGroup variant="text" aria-label="text button group" size="small">
                        <IconButton aria-label="remove" color="secondary">
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <TextField defaultValue="0" color="secondary" size="small" sx={{ width: 50 }} />
                        <IconButton aria-label="add" color="secondary">
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </ButtonGroup>
                </CardActions>
                {/* <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography component="div" variant="h4">
                        20.000
                    </Typography>
                    <CardActions>
                        <ButtonGroup variant="text" aria-label="text button group" size="small">
                            <IconButton aria-label="remove" color="secondary">
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <TextField color="secondary" size="small" sx={{ width: 50 }} />
                            <IconButton aria-label="add" color="secondary">
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </ButtonGroup>
                    </CardActions>
                </Box> */}
            </Box>
        </Card>
    );
}
