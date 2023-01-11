import axios from 'axios';

console.log('process.env: ', process.env);
// tạo intance axios , mỗi intance thể hiện một URL
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;

// httpRequest sẽ được dùng ở apiServices chớ không dùng ở component.
