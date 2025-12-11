import useUser from "../features/authentication/useUser"

export default function Header() {
  const {data} = useUser()
  console.log(data)
    return (
        <div className="text-white">Header</div>
    )
}
