import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TextField from '@mui/material/TextField';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Divider from '@mui/material/Divider';
import CurrentOrderItem from './CurrentOrderItem';

export default function CurrentOrder({ handleAddItem }) {
    return (
        <Card variant="outlined">
            <CardHeader
                style={{ backgroundColor: '#EDE7F6' }}
                title="My Cart"
                titleTypographyProps={{ color: '#5E35B1' }}
                action={
                    <Button variant="outlined" color="secondary" startIcon={<ClearAllIcon />} size="small" sx={{ mr: 1 }}>
                        Clear
                    </Button>
                }
            ></CardHeader>
            <Divider light />
            <CardContent>
                <CurrentOrderItem></CurrentOrderItem>
                <TextField sx={{ mt: 3 }} color="secondary" fullWidth label="Note" id="note" placeholder="Note for this order" />
            </CardContent>
            <CardActions sx={{ width: '100%' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AttachMoneyIcon />}
                    sx={{ width: '100%' }}
                    size="large"
                    onClick={() => handleAddItem()}
                >
                    Continue to payment
                </Button>
            </CardActions>
        </Card>
    );
}
