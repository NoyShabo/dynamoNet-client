const baseUrl = '';

export const post = async (url, body, auth = '') => {
    return fetch(baseUrl + url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${auth}`,
            code: auth,
            'Content-Type': 'application/json',
        },
    });
};

export const update = async (url, body, auth = '') => {
    return fetch(baseUrl + url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${auth}`,
            code: auth,
            'Content-Type': 'application/json',
        },
    });
};

export const apiDelete = async (url, auth = '') => {
    return fetch(baseUrl + url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${auth}`,
        },
    });
};

export const handleError = res => {
    if (res.data && res.data[0].msg) return res.data[0].msg;
    if (res.message) return res.message;
    return res;
};

export const handleResult = async (
    res,
    errSrc = '  Internal error',
    customMessage = null,
) => {
    const resData = await res.json();
    console.log('serverApi',resData)
    if (res && resData && res.status < 400) {
        return resData;
    }
    if (customMessage) throw new Error(customMessage);
    else if (!res) throw new Error(`${errSrc}: Server not responding`);
    else if (!resData) throw new Error(`${errSrc}: Server response was empty`);
    else throw new Error(handleError(resData));
};

// export const get = async (url, auth = '', authType:
//     AuthType = {Authorization: true}) => {
//     let requestHeaders = {}
//     if (authType.Authorization) {
//         requestHeaders = {Authorization: `Bearer ${auth}`}
//     } else if (authType.code) {
//         requestHeaders = {code: auth}
//     }
//     return fetch(baseUrl + url, {
//         method: 'GET',
//         headers: {
//             ...requestHeaders
//         },
//     });
// };


