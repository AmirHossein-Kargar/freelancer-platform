import { Atom } from "react-loading-indicators"
export default function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <Atom color="#4a6dff" size="small" />
        </div>
    )
}
