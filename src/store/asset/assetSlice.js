import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    loadingCategory: false,
    reloadList: false,
    loadingCreate: false,
    loadingModelDetail: false,
    listData: [],
    listCategory: [],
    pagination: undefined,
    model: {},
    alert: false
};

const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        fetchData(state, action) {
            state.loading = true;
            state.pagination = {
                size: action.payload.size,
                page: action.payload.page
            };
        },
        fetchDataSuccess(state, action) {
            state.loading = false;
            state.listData = action.payload.data;
            state.pagination = {
                ...state.pagination,
                totalCount: action?.payload?.headers?.['x-total-count']
            };
        },
        fetchDataFalse(state, action) {
            state.loading = false;
            console.error(action.payload);
        },
        cancelAlert(state, action) {
            state.alert = null;
        },

        // SUBMIT REQUEST
        submit(state, action) {
            state.alert = false;
            state.loading = true;
        },
        submitSuccess(state, action) {
            state.alert = action.payload;
            state.loading = false;
        },
        submitFailed(state, action) {
            state.alert = action.payload;
            state.loading = false;
        },

        // MODELS
        getModelDetail(state, action) {
            state.loadingModelDetail = true;
        },
        getModelDetailSuccess(state, action) {
            state.loadingModelDetail = false;
            state.model = action.payload.data;
        },
        getModelDetailFail(state, action) {
            state.loadingModelDetail = false;
        },
        filterModel(state, action) {
            const listAssetModelAvailable = [];
            state.listData.forEach((model) => {
                if (model.assets.some((element) => element.status === 'AVAILABLE')) {
                    listAssetModelAvailable.push(model);
                }
            });
            state.pagination = {
                ...state.pagination,
                totalCount: listAssetModelAvailable?.length
            };

            state.listData = listAssetModelAvailable;
        },

        // CATEGORY
        getCategory(state, action) {
            state.loadingCategory = true;
        },
        getCategorySuccess(state, action) {
            state.loadingCategory = false;
            state.listCategory = action.payload.data;
        },
        getCategoryFalse(state, action) {
            state.loadingCategory = false;
            console.error(action.payload);
        }
    }
});

// Actions
export const assetActions = assetSlice.actions;

// Reducer
const assetReducer = assetSlice.reducer;
export default assetReducer;
