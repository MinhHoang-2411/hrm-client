import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useCallback, useEffect } from 'react';

export default function useGetAllList(params, action, nameState) {
    const dispatch = useAppDispatch();
    const listData = useAppSelector((state) => state[nameState].listData);
    const pagination = useAppSelector((state) => state[nameState].pagination);
    const reloadList = useAppSelector((state) => state[nameState].reloadList);

    const fetchData = useCallback(
        (params) => {
            try {
                dispatch(action.fetchData(params || {}));
            } catch (error) {
                console.error({ error });
            }
        },
        [params, reloadList]
    );

    useEffect(() => {
        fetchData(params);
    }, [params, reloadList]);

    return { listData, pagination };
}
