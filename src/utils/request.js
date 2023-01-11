import axios from 'axios';

// tạo intance axios , mỗi intance thể hiện một URL
const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export default request;

// request sẽ được dùng ở apiServices chớ không dùng ở component.
