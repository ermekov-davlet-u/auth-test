
import { store } from './store';

export default function http() {

    const  fetchApi = async (url:string = '', method: string = "get", body= {}, headers = {}) => {
        const res = await fetch("http://localhost:8080/about", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${store.authToken}`,
            },
        }).then(response => response.json());

        if(res.error) return

        return res
    }

    return {fetchApi}

}