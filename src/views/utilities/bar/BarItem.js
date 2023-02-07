import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function BarItem({ handleAddItem }) {
    return (
        <Card style={{ backgroundColor: '#F5F5F5' }} variant="outlined" sx={{ position: 'relative' }}>
            <CardMedia
                component="img"
                alt="redbull"
                height="200"
                image="https://img.sosanhgia.com/images/500x0/11a9cc80862d439d9b8dc7a7d8f43369/nuoc-tang-luc-redbull.jpeg"
            />
            <CardContent sx={{ pb: 0 }}>
                <Typography gutterBottom variant="h5" component="div" style={{ color: '#5E35B1' }}>
                    Nước tăng lực Redbull
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                        display: 'inline-block',
                        color: '#5E35B1',
                        maxHeight: 45,
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    Nước tăng lực Redbull 250ml giúp cơ thể bù đắp nước, bổ sung năng lượng, vitamin và các khoáng chất.
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Typography component="div" variant="h4" sx={{ flexGrow: 1, color: '#4527A0' }}>
                    20.000
                </Typography>
                <Button variant="contained" color="secondary" startIcon={<AddShoppingCartIcon />} onClick={() => handleAddItem()}>
                    Add
                </Button>
            </CardActions>
        </Card>
    );
}
