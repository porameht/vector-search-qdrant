import { Axios } from "./axios";
import { IMAGE_SEARCH_URL, SEARCH_URL } from "./constants";


export type SearchRequest = {
    query: string;
    neural?: boolean;
}

export const getSearchResult = (searchRequest:SearchRequest) => {
    const params = {
        q: searchRequest.query,
        neural: searchRequest.neural
    }
    return Axios().get(SEARCH_URL, { params });
};

export const getImageSearchResult = (image: File) => {
    const formData = new FormData();
    formData.append("file", image, image.name);

    return Axios().post(IMAGE_SEARCH_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// export const getImageSearchResult = (image: File) => {
//     console.log("Image file:", image.name, image.type, image.size);

//     const formData = new FormData();
//     formData.append("file", image, image.name);

//     // Log the contents of formData
//     for (let [key, value] of formData.entries()) {
//         console.log(key, value);
//     }

//     return Axios().post(IMAGE_SEARCH_URL, formData, {
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//     });
// };