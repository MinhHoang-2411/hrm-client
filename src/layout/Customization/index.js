import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party

// project imports
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actionActions } from 'store/action/actionSlice';

// concat 'px'
function valueText(value) {
    return `${value}px`;
}

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const customization = useAppSelector((state) => state.action);

    // drawer on/off
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    // state - border radius
    const [borderRadius, setBorderRadius] = useState(6);

    useEffect(() => {
        dispatch(
            actionActions.setBorderRadius({
                borderRadius
            })
        );
    }, [dispatch, borderRadius]);

    const [fontFamily, setFontFamily] = useState('Roboto');
    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch(
            actionActions.setFontFamily({
                fontFamily: newFont
            })
        );
    }, [dispatch, fontFamily]);

    return <></>;
};

export default Customization;
