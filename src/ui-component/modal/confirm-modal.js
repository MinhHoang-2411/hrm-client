import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from 'app/hooks';
import { modalActions } from 'store/modal/modalSlice';

const titleModal = {
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '10px 24px !important',
    borderBottom: '1px solid #ccc'
};
const contentModal = {
    paddingTop: '30px !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left'
};
const footerModal = {
    padding: '20px 24px !important'
};

export default function ConfirmModal(prop) {
    const dispatch = useAppDispatch();
    const { isShow, type, title, content, onAction, onCancel, url, buttonText } = prop.data;

    const handleClose = () => {
        dispatch(modalActions.closeModal({ type: type }));
    };

    const handleSubmit = () => {
        onAction && onAction();
        dispatch(modalActions.closeModal({ type: type }));
    };

    return (
        <Dialog open={isShow} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle sx={titleModal}>{title}</DialogTitle>
            <DialogContent sx={contentModal}>
                <DialogContentText sx={{ color: '#000', fontSize: '16px', width: '100%' }}>{content}</DialogContentText>
            </DialogContent>
            <DialogActions sx={footerModal}>
                {onCancel !== 'hidden' && (
                    <Button variant="outlined" startIcon={<CloseOutlined style={{ fontSize: '16px' }} />} onClick={handleClose}>
                        Cancel
                    </Button>
                )}
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CheckOutlined style={{ fontSize: '16px' }} />}
                    onClick={handleSubmit}
                >
                    {buttonText || 'OK'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
