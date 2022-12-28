import { getCurrentPermission } from 'utils/auth';

export function hasPermission(permission_id) {
    if (!permission_id || permission_id == '') return true;
    try {
        let permissions = getCurrentPermission();
        return permissions === permission_id;
    } catch (e) {
        console.error(e);
    }
}
