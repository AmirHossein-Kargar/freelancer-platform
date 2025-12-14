import http from "./httpService";

export default function getOwnerProjectsApi() {
    // Make GET request to fetch owner's projects and extract data from response
    return http.get("/project/owner-projects").then(({data}) => data.data)
}