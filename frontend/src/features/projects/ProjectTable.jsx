import useOwnerProjects from "./useOwnerProjects"

export default function ProjectTable() {
    const { projects, isLoading } = useOwnerProjects()
    return (
        <div>ProjectTable</div>
    )
}
