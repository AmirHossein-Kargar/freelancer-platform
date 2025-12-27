import http from "./httpService";

export function getOwnerProjectsApi() {
  // Make GET request to fetch owner's projects and extract data from response
  return http.get("/project/owner-projects").then(({ data }) => data.data);
}

export function deleteProjectApi(id) {
    return http.delete(`/project/${id}`).then(({ data }) => data.data);
}
