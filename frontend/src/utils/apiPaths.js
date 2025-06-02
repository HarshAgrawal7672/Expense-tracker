export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_PATHS = {
    AUTH: {
        LOGIN: `/api/v1/auth/login`,
        REGISTER: `/api/v1/auth/register`,
        GET_USER_INFO: `/api/v1/auth/getuser`,
    },
    INCOME: {
        GET_ALL_INCOME: `/api/v1/income/get`,
        ADD_INCOME: `/api/v1/income/add`,
        DELETE_INCOME: (id) => `/api/v1/income/${id}`,
        DOWNLOAD_INCOME_EXCEL: `/api/v1/income/downloadexcel`,
    },
    EXPENSE: {
        GET_ALL_EXPENSE: `/api/v1/expense/get`,
        ADD_EXPENSE: `/api/v1/expense/add`,
        DELETE_EXPENSE: (id) => `/api/v1/expense/${id}`,
        DOWNLOAD_EXPENSE_EXCEL: `/api/v1/expense/downloadexcel`,
    },
    DASHBOARD: {
        GET_DATA: `/api/v1/dashboard`,
    },
    IMAGE:{
        UPLOAD: `/api/v1/auth/upload-image`,
    }
}