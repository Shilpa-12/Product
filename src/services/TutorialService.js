import http from "../http-common";

const getAll = () => {
    return http.get("/tutorials");
};

const get = id => {
    return http.get(`/tutorials/${id}`);
};

const create = data => {
    return http.post("/tutorials",data);
};

const update = (id,data) => {
    return http.put(`/tutorials/{id}`,data);
};

const remove = id => { //id is the parameter which we will pass to delete Http endpoint
    return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
    return http.delete("/tutorials"); //if there is no String templating then we can give 
    //the http endpoint in double quotes or single quotes
};

const findByName = name => {
    return http.get(`/tutorials?name=${name}`);
};

const TutorialService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};

export default TutorialService;