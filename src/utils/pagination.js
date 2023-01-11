export const totalPagePagination = (pagination) => {
    const totalPage = Math.ceil(pagination?.totalCount / pagination?.size);
    if (isNaN(totalPage)) return 0;
    return Number(totalPage ?? 0);
};

export const fetchMoreCondition = (page, pagination, params) => {
    return page + 1 < pagination?.totalCount / params?.size;
};
