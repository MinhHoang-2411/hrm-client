import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

export function OrderTableHead({ headCells, order, orderBy, checked, handleCheckAll }) {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    return (
        <TableHead>
            <TableRow>
                {headCells?.map((headCell) => (
                    <TableCell
                        key={headCell?.id}
                        align={headCell?.align}
                        padding={headCell?.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ width: headCell?.width || 'auto', fontSize: headCell?.fontSize, paddingLeft: headCell?.paddingLeft }}
                    >
                        {headCell?.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
