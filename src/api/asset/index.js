import axiosClient from '../axiosClient';

const BASE_URL = process.env.REACT_APP_API_URL + `/services/hrmuserservice/api`;

const ASSET_API_URL = BASE_URL + `/assets`;

const ASSET_CATEGORY_API_URL = BASE_URL + `/asset-categories`;

const ASSET_MODEL_API_URL = BASE_URL + `/asset-models`;

const ASSET_REQUEST_API_URL = BASE_URL + `/asset-requests`;

Date.prototype.toJSON = function () {
    var timezoneOffsetInHours = -(this.getTimezoneOffset() / 60); //UTC minus local time
    var sign = timezoneOffsetInHours >= 0 ? '+' : '-';
    var leadingZero = Math.abs(timezoneOffsetInHours) < 10 ? '0' : '';
    var correctedDate = new Date(
        this.getFullYear(),
        this.getMonth(),
        this.getDate(),
        this.getHours(),
        this.getMinutes(),
        this.getSeconds(),
        this.getMilliseconds()
    );
    correctedDate.setHours(this.getHours() + timezoneOffsetInHours);
    var iso = correctedDate.toISOString().replace('Z', '');

    return iso + 'Z';
};

const assetApi = {
    getAllAsset(params) {
        const response = axiosClient.get(ASSET_API_URL, { params });
        return response;
    },

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
