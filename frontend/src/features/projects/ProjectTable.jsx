import useOwnerProjects from "./useOwnerProjects"
import Loading from "../../ui/Loading"
import Table from "../../ui/Table"
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2"
import truncateText from "../../utils/truncateText"
import toLocalDateShort from "../../utils/toLocalDateShort"
import { toPersianNumbersWithComma } from "../../utils/toPersianNumbers"
import Modal from "../../ui/Modal"
import { useState } from "react"

/**
 * ProjectTable Component
 * Displays a table of user's projects with actions (view, edit, delete)
 * Supports dark mode and responsive design
 */
export default function ProjectTable() {
    const { projects, isLoading, error } = useOwnerProjects()

    const [isEditOpen, setIsEditOpen] = useState(false)

    // Show loading state
    if (isLoading) return <Loading />

    // Show error state
    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4 text-center">
                <h3 className="text-red-800 dark:text-red-300 font-medium mb-2">خطا در دریافت پروژه‌ها</h3>
            </div>
        )
    }

    // Show empty state
    if (!projects || projects.length === 0) {
        return (
            <div className="text-center py-12 bg-secondary-50 dark:bg-secondary-800 rounded-xl">
                <p className="text-secondary-500 dark:text-secondary-400 text-lg">هیچ پروژه‌ای یافت نشد</p>
            </div>
        )
    }

    // Table headers configuration
    const headers = ['ردیف', 'عنوان پروژه', 'دسته‌ بندی', 'بودجه', 'ددلاین', 'تگ‌ ها', 'فریلنسر', 'وضعیت', 'عملیات']



    return (
        <>
            <div className="bg-secondary-0 dark:bg-secondary-800 rounded-xl shadow-sm border border-secondary-200 dark:border-secondary-700">
                <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
                    <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-50 select-none">پروژه‌های من</h2>
                </div>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            {/* Render table headers dynamically */}
                            {headers.map((header) => (
                                <Table.HeaderCell key={header}>
                                    {header}
                                </Table.HeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {/* Render project rows */}
                        {projects.map((project, index) => (
                            <Table.Row
                                key={project._id}
                                className="cursor-pointer transition-colors duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 border-b border-secondary-100 dark:border-secondary-700 last:border-b-0"
                            >
                                {/* Row index */}
                                <Table.Cell>
                                    <div className="text-sm font-medium text-secondary-500 dark:text-secondary-400">{index + 1}</div>
                                </Table.Cell>
                                {/* Project title */}
                                <Table.Cell>
                                    <div className="text-sm font-medium text-secondary-900 dark:text-secondary-50">{truncateText(project.title, 30)}</div>
                                </Table.Cell>
                                {/* Project category */}
                                <Table.Cell>
                                    <div className="text-sm text-secondary-600 dark:text-secondary-400">
                                        {project.category?.title || 'نامشخص'}
                                    </div>
                                </Table.Cell>
                                {/* Project budget */}
                                <Table.Cell>
                                    <div className="text-sm font-medium text-secondary-900 dark:text-secondary-50">
                                        {toPersianNumbersWithComma(project.budget)} ریال
                                    </div>
                                </Table.Cell>
                                {/* Project deadline */}
                                <Table.Cell>
                                    <div className="text-sm text-secondary-900 dark:text-secondary-50">
                                        {toLocalDateShort(project.deadline)}
                                    </div>
                                </Table.Cell>
                                {/* Project tags */}
                                <Table.Cell>
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
                                </Table.Cell>
                                {/* Assigned freelancer */}
                                <Table.Cell>
                                    <div className="text-sm text-secondary-600 dark:text-secondary-400">
                                        {project.freelancer ? project.freelancer.name : 'انتخاب نشده'}
                                    </div>
                                </Table.Cell>
                                {/* Project status */}
                                <Table.Cell>
                                    <span className={`select-none badge ${project.status === 'OPEN'
                                        ? 'badge--success'
                                        : project.status === 'CLOSED'
                                            ? 'badge--error'
                                            : 'badge--warning'
                                        }`}>
                                        {project.status === 'OPEN' ? 'باز' : project.status === 'CLOSED' ? 'بسته' : 'در حال بررسی'}
                                    </span>
                                </Table.Cell>
                                {/* Action buttons */}
                                <Table.Cell className="text-sm font-medium">
                                    <div className="flex gap-2">
                                        {/* Edit button */}
                                        <button
                                            onClick={() => setIsEditOpen(true)}
                                            className="cursor-pointer p-2 rounded-lg transition-all duration-200 text-green-600 dark:text-green-400 hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-300"
                                            title="ویرایش پروژه"
                                        >
                                            <HiOutlinePencil className="w-5 h-5" />
                                        </button>
                                        {/* Delete button */}
                                        <button
                                            className="cursor-pointer p-2 rounded-lg transition-all duration-200 text-red-600 dark:text-red-400 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                                            title="حذف پروژه"
                                        >
                                            <HiOutlineTrash className="w-5 h-5" />
                                        </button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            {/* Modal moved outside the table */}
            <Modal
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title="modal title"
            >
                This is Modal...
            </Modal>
        </>
    )
}