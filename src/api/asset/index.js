import axiosClient from '../axiosClient';
import { toJSON } from 'utils/date-time';

const BASE_URL = process.env.REACT_APP_API_URL + `/services/hrmuserservice/api`;

const ASSET_CATEGORY_API_URL = BASE_URL + `/asset-categories`;

const ASSET_MODEL_API_URL = BASE_URL + `/asset-models`;

const ASSET_REQUEST_API_URL = BASE_URL + `/asset-requests`;

const assetApi = {
    getAllCategory(params) {
        return axiosClient.get(ASSET_CATEGORY_API_URL, { params });
    },

    getAllAssetModel(params) {
        return axiosClient.get(ASSET_MODEL_API_URL, { params });
    },

    getModelDetail(params) {
        return axiosClient.get(ASSET_MODEL_API_URL + '/' + params);
    },

    submitRequest(params) {
        params.issuedDate = params.issuedDate.toDate().toJSON();
        params.returnedDate = params.returnedDate.toDate().toJSON();
        return axiosClient.post(ASSET_REQUEST_API_URL, params);
    }
};

export default assetApi;
