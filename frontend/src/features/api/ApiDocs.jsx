import { useState } from 'react';
import { apiEndpoints } from './apiEndpoints';

function ApiDocs() {
    const [expandedEndpoint, setExpandedEndpoint] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const methodColors = {
        GET: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700',
        POST: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700',
        PATCH: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
        DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-700',
    };

    const filteredEndpoints =
        selectedCategory === 'all'
            ? apiEndpoints
            : apiEndpoints.filter((section) => section.id === selectedCategory);

    const toggleEndpoint = (categoryIdx, itemIdx) => {
        const key = `${categoryIdx}-${itemIdx}`;
        setExpandedEndpoint(expandedEndpoint === key ? null : key);
    };

    return (
        <div className="min-h-screen bg-secondary-0 dark:bg-secondary-900 transition-colors">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold text-secondary-900 dark:text-secondary-0 mb-4">
                        📚 مستندات API
                    </h1>
                    <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-6">
                        پلتفرم فریلنسینگ - راهنمای کامل توسعه‌دهندگان
                    </p>
                    <div className="inline-block bg-linear-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 px-8 py-4 rounded-xl shadow-lg">
                        <code className="text-white font-mono text-lg font-semibold">
                            http://localhost:5000/api
                        </code>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white dark:bg-secondary-800 p-6 rounded-2xl shadow-lg border-2 border-secondary-200 dark:border-secondary-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="text-4xl mb-3">🔒</div>
                        <h3 className="text-lg font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                            احراز هویت
                        </h3>
                        <p className="text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed">
                            Cookie-based authentication با accessToken و refreshToken برای امنیت بالا
                        </p>
                    </div>
                    <div className="bg-white dark:bg-secondary-800 p-6 rounded-2xl shadow-lg border-2 border-secondary-200 dark:border-secondary-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="text-4xl mb-3">👥</div>
                        <h3 className="text-lg font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                            نقش‌های کاربری
                        </h3>
                        <div className="flex flex-wrap gap-2 text-xs">
                            {['USER', 'FREELANCER', 'OWNER', 'ADMIN'].map((role) => (
                                <span
                                    key={role}
                                    className="bg-secondary-100 dark:bg-secondary-700 px-3 py-1.5 rounded-lg text-secondary-700 dark:text-secondary-300 font-semibold"
                                >
                                    {role}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white dark:bg-secondary-800 p-6 rounded-2xl shadow-lg border-2 border-secondary-200 dark:border-secondary-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="text-4xl mb-3">📊</div>
                        <h3 className="text-lg font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                            وضعیت‌ها
                        </h3>
                        <p className="text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed">
                            200 موفق | 201 ایجاد شد | 400 خطا | 401 غیرمجاز | 404 یافت نشد
                        </p>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-8 flex flex-wrap gap-3 justify-center">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${selectedCategory === 'all'
                            ? 'bg-primary-600 dark:bg-primary-600 text-white shadow-lg scale-105'
                            : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 border-2 border-secondary-200 dark:border-secondary-700 hover:border-primary-500 dark:hover:border-primary-500 hover:scale-105'
                            }`}
                    >
                        همه
                    </button>
                    {apiEndpoints.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setSelectedCategory(section.id)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${selectedCategory === section.id
                                ? 'bg-primary-600 dark:bg-primary-600 text-white shadow-lg scale-105'
                                : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 border-2 border-secondary-200 dark:border-secondary-700 hover:border-primary-500 dark:hover:border-primary-500 hover:scale-105'
                                }`}
                        >
                            {section.category}
                        </button>
                    ))}
                </div>

                {/* Endpoints */}
                {filteredEndpoints.map((section, sectionIdx) => (
                    <div key={section.id} className="mb-12">
                        <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-6 pb-3 border-b-4 border-primary-500 dark:border-primary-600 flex items-center gap-3">
                            <span>{section.category}</span>
                            <span className="text-sm font-normal text-secondary-500 dark:text-secondary-500">
                                ({section.items.length} endpoint)
                            </span>
                        </h2>
                        <div className="space-y-4">
                            {section.items.map((endpoint, endpointIdx) => {
                                const isExpanded = expandedEndpoint === `${sectionIdx}-${endpointIdx}`;
                                return (
                                    <div
                                        key={endpointIdx}
                                        className="bg-white dark:bg-secondary-800 rounded-2xl shadow-md border-2 border-secondary-200 dark:border-secondary-700 overflow-hidden hover:shadow-xl transition-all duration-300"
                                    >
                                        <div
                                            className="p-6 cursor-pointer hover:bg-secondary-50 dark:hover:bg-secondary-800/80 transition-colors duration-200"
                                            onClick={() => toggleEndpoint(sectionIdx, endpointIdx)}
                                        >
                                            <div className="flex items-start gap-4 mb-3">
                                                <span
                                                    className={`px-4 py-2 rounded-lg font-bold text-sm border-2 ${methodColors[endpoint.method]
                                                        }`}
                                                >
                                                    {endpoint.method}
                                                </span>
                                                <div className="flex-1">
                                                    <code className="text-secondary-800 dark:text-secondary-200 font-mono text-sm bg-secondary-100 dark:bg-secondary-900/50 px-4 py-2 rounded-lg block break-all">
                                                        {endpoint.path}
                                                    </code>
                                                </div>
                                                <button className="text-2xl text-secondary-500 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200">
                                                    {isExpanded ? '▼' : '◀'}
                                                </button>
                                            </div>
                                            <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                                                {endpoint.title}
                                            </h3>
                                            <p className="text-secondary-600 dark:text-secondary-400 mb-3 leading-relaxed">
                                                {endpoint.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {endpoint.auth && (
                                                    <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1.5 rounded-lg font-semibold border border-primary-300 dark:border-primary-700">
                                                        🔐 نیاز به احراز هویت
                                                    </span>
                                                )}
                                                {endpoint.role && (
                                                    <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-lg font-semibold border border-purple-300 dark:border-purple-700">
                                                        👤 {endpoint.role}
                                                    </span>
                                                )}
                                                {endpoint.params && (
                                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-lg font-semibold border border-blue-300 dark:border-blue-700">
                                                        📋 {endpoint.params}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        {isExpanded && (
                                            <div className="border-t-2 border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-900/50 p-6 space-y-6">
                                                {/* Request Body */}
                                                {endpoint.body && (
                                                    <div>
                                                        <h4 className="text-sm font-bold text-secondary-700 dark:text-secondary-300 mb-3 flex items-center gap-2">
                                                            <span className="text-lg">📤</span>
                                                            Request Body:
                                                        </h4>
                                                        <pre className="bg-white dark:bg-secondary-800 p-4 rounded-xl overflow-x-auto text-sm border-2 border-secondary-200 dark:border-secondary-700 shadow-inner">
                                                            <code className="text-secondary-800 dark:text-secondary-200 font-mono">
                                                                {JSON.stringify(endpoint.body, null, 2)}
                                                            </code>
                                                        </pre>
                                                    </div>
                                                )}

                                                {/* Response */}
                                                {endpoint.response && (
                                                    <div>
                                                        <h4 className="text-sm font-bold text-secondary-700 dark:text-secondary-300 mb-3 flex items-center gap-2">
                                                            <span className="text-lg">📥</span>
                                                            Response (Success):
                                                        </h4>
                                                        <pre className="bg-white dark:bg-secondary-800 p-4 rounded-xl overflow-x-auto text-sm border-2 border-green-200 dark:border-green-800/50 shadow-inner">
                                                            <code className="text-secondary-800 dark:text-secondary-200 font-mono">
                                                                {JSON.stringify(endpoint.response, null, 2)}
                                                            </code>
                                                        </pre>
                                                    </div>
                                                )}

                                                {/* Errors */}
                                                {endpoint.errors && endpoint.errors.length > 0 && (
                                                    <div>
                                                        <h4 className="text-sm font-bold text-secondary-700 dark:text-secondary-300 mb-3 flex items-center gap-2">
                                                            <span className="text-lg">⚠️</span>
                                                            خطاهای احتمالی:
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {endpoint.errors.map((error, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm border-2 border-red-200 dark:border-red-800/50 font-medium"
                                                                >
                                                                    {error}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* cURL Example */}
                                                <div>
                                                    <h4 className="text-sm font-bold text-secondary-700 dark:text-secondary-300 mb-3 flex items-center gap-2">
                                                        <span className="text-lg">💻</span>
                                                        مثال cURL:
                                                    </h4>
                                                    <pre className="bg-secondary-900 dark:bg-black p-4 rounded-xl overflow-x-auto text-sm border-2 border-secondary-700 dark:border-secondary-600">
                                                        <code className="text-green-400 font-mono text-xs">
                                                            {`curl -X ${endpoint.method} http://localhost:5000/api${endpoint.path} \\
  -H "Content-Type: application/json"${endpoint.auth ? ' \\\n  -H "Cookie: accessToken=YOUR_TOKEN"' : ''}${endpoint.body
                                                                    ? ` \\\n  -d '${JSON.stringify(endpoint.body)}'`
                                                                    : ''
                                                                }`}
                                                        </code>
                                                    </pre>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Footer */}
                <div className="mt-16 text-center p-8 bg-linear-to-r from-primary-50 to-secondary-50 dark:from-secondary-800 dark:to-secondary-900 rounded-2xl border-2 border-secondary-200 dark:border-secondary-700">
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-2">
                        نسخه API: <span className="font-bold">1.0.0</span>
                    </p>
                    <p className="text-secondary-500 dark:text-secondary-500 text-xs">
                        آخرین بروزرسانی: دسامبر 2024
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ApiDocs;
