import { useAppSelector } from 'app/hooks';
import ConfirmModal from './confirm-modal';

export default function Modal() {
    const { modalConfirm } = useAppSelector((state) => state.modal);

    return <>{modalConfirm?.isShow && <ConfirmModal data={modalConfirm} />}</>;
}
