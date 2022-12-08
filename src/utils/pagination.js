export const totalPagePagination = (pagination) => {
    const totalPage = Math.ceil(pagination?.totalCount / pagination?.size);
    if (isNaN(totalPage)) return 0;
    return Number(totalPage ?? 0);
};
