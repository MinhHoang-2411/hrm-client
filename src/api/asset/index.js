import axiosClient from '../axiosClient';
import { formatDateMaterialToTimeStamp } from 'utils/format/date';

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
        params.issuedDate = formatDateMaterialToTimeStamp(params.issuedDate);
        params.returnedDate = formatDateMaterialToTimeStamp(params.returnedDate);
        return axiosClient.post(ASSET_REQUEST_API_URL, params);
    }
};

export default assetApi;
