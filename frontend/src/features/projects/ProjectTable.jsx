import useOwnerProjects from "./useOwnerProjects"
import Loading from "../../ui/Loading"
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2"
import truncateText from "../../utils/truncateText"
import toLocalDateShort from "../../utils/toLocalDateShort"
import { toPersianNumbersWithComma } from "../../utils/toPersianNumbers"

/**
 * ProjectTable Component
 * Displays a table of user's projects with actions (view, edit, delete)
 * Supports dark mode and responsive design
 */
export default function ProjectTable() {
    const { projects, isLoading, error } = useOwnerProjects()

    // Show loading state
    if (isLoading) return <Loading />

    // Show error state
    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h3 className="text-red-800 dark:text-red-400 font-medium mb-2">خطا در دریافت پروژه‌ها</h3>
                <p className="text-red-600 dark:text-red-300 text-sm">
                    {error?.response?.data?.message || error?.message || "خطای نامشخص"}
                </p>
            </div>
        )
    }

    // Show empty state
    if (!projects || projects.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-secondary-500 dark:text-secondary-400">هیچ پروژه‌ای یافت نشد</p>
            </div>
        )
    }

    // Table headers configuration
    const headers = ['ردیف', 'عنوان پروژه', 'دسته‌بندی', 'بودجه', 'ددلاین', 'تگ‌ها', 'فریلنسر', 'وضعیت', 'عملیات']

    // Action buttons configuration
    const actions = [
        { icon: HiEye, color: 'blue', title: 'مشاهده پروژه' },
        { icon: HiPencil, color: 'green', title: 'ویرایش پروژه' },
        { icon: HiTrash, color: 'red', title: 'حذف پروژه' }
    ]

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4 text-secondary-900 dark:text-secondary-100">پروژه‌های من</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-sm">
                    <thead className="bg-secondary-50 dark:bg-secondary-700">
                        <tr>
                            {/* Render table headers dynamically */}
                            {headers.map((header) => (
                                <th
                                    key={header}
                                    className="px-4 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider border-b border-secondary-200 dark:border-secondary-600"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">
                        {/* Render project rows */}
                        {projects.map((project, index) => (
                            <tr key={project._id} className={`cursor-pointer transition-colors duration-200 ${index % 2 === 0 ? "bg-secondary-50 dark:bg-secondary-800 hover:bg-primary-50 dark:hover:bg-primary-900/20" : "bg-white dark:bg-secondary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20"}`}>
                                {/* Row index */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-secondary-600 dark:text-secondary-400">{index + 1}</div>
                                </td>
                                {/* Project title */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100">{truncateText(project.title, 30)}</div>
                                </td>
                                {/* Project category */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="text-sm text-secondary-600 dark:text-secondary-300">
                                        {project.category?.title || 'نامشخص'}
                                    </div>
                                </td>
                                {/* Project budget */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="text-sm text-secondary-900 dark:text-secondary-100">
                                        {toPersianNumbersWithComma(project.budget)} ریال
                                    </div>
                                </td>
                                {/* Project deadline */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="text-sm text-secondary-900 dark:text-secondary-100">
                                        {toLocalDateShort(project.deadline)}
                                    </div>
                                </td>
                                {/* Project tags */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="flex flex-wrap gap-1 select-none">
                                        {project.tags && project.tags.length > 0 ? (
                                            project.tags.map((tag, tagIndex) => (
                                                <span key={tagIndex} className="badge badge--secondary">
                                                    {tag}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-secondary-400 dark:text-secondary-500">بدون تگ</span>
                                        )}
                                    </div>
                                </td>
                                {/* Assigned freelancer */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="text-sm text-secondary-600 dark:text-secondary-300">
                                        {project.freelancer ? project.freelancer.name : 'انتخاب نشده'}
                                    </div>
                                </td>
                                {/* Project status */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className={`select-none badge ${project.status === 'OPEN'
                                        ? 'badge--success'
                                        : project.status === 'CLOSED'
                                            ? 'badge--error'
                                            : 'badge--warning'
                                        }`}>
                                        {project.status === 'OPEN' ? 'باز' : project.status === 'CLOSED' ? 'بسته' : 'در حال بررسی'}
                                    </span>
                                </td>
                                {/* Action buttons */}
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex gap-2">
                                        {/* Render action buttons dynamically */}
                                        {actions.map((action, actionIndex) => {
                                            const IconComponent = action.icon
                                            return (
                                                <button
                                                    key={actionIndex}
                                                    className={`p-2 text-${action.color}-600 dark:text-${action.color}-400 hover:bg-${action.color}-50 dark:hover:bg-${action.color}-900/20 rounded transition-colors`}
                                                    title={action.title}
                                                >
                                                    <IconComponent className="w-4 h-4" />
                                                </button>
                                            )
                                        })}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}