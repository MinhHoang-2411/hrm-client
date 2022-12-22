import axiosClient from '../axiosClient';

const ASSET_REQUEST_API_URL = process.env.REACT_APP_API_URL + `/services/hrmuserservice/api/asset-requests`;

const assetRequestApi = {
    getAllAssetRequest(params) {
        const response = axiosClient.get(ASSET_REQUEST_API_URL, { params });
        return response;
    }
};

export default assetRequestApi;
