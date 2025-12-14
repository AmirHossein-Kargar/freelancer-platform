import useUser from "../features/authentication/useUser"

export default function Header() {
  const { data } = useUser()
  console.log(data)

  return (
    <header className="bg-white dark:bg-secondary-800 shadow-sm border-b border-secondary-200 dark:border-secondary-700">
      <div className="px-4 py-3">
        <h1 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
          فریلنسر اپ
        </h1>
      </div>
    </header>
  )
}
