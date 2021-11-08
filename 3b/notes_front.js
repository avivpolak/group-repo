import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";
document.getElementById("root").append(getAll);
const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

// ...

export default { getAll, create, update };
