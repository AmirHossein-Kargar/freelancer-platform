import { useState } from 'react';
import { apiEndpoints } from './apiEndpoints';
import { HiLockClosed, HiUsers, HiChartBar, HiDocumentText, HiShieldCheck, HiClipboardList, HiUpload, HiDownload, HiExclamation, HiTerminal, HiChevronDown, HiChevronLeft } from 'react-icons/hi';

const METHOD_COLORS = {
    GET: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300',
    POST: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-300',
    PATCH: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-300',
    DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-300',
};

// eslint-disable-next-line no-unused-vars
const InfoCard = ({ icon: Icon, title, children }) => {
    return (
        <div className="bg-white dark:bg-secondary-800 p-6 rounded-xl shadow-md border border-secondary-200 dark:border-secondary-700 hover:shadow-lg transition-shadow">
            <Icon className="text-3xl mb-2 text-primary-600 dark:text-primary-400" />
            <h3 className="font-bold text-secondary-900 dark:text-secondary-100 mb-2">{title}</h3>
            <div className="text-secondary-600 dark:text-secondary-400 text-sm">{children}</div>
        </div>
    );
};

const CategoryButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${active
            ? 'bg-primary-600 text-white shadow-md'
            : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 border border-secondary-300 dark:border-secondary-700 hover:border-primary-500'
            }`}
    >
        {children}
    </button>
);

const Badge = ({ variant = 'default', children }) => {
    const variants = {
        auth: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-300',
        role: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300',
        params: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300',
        default: 'bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300',
    };
    return (
        <span className={`text-xs px-3 py-1 rounded-lg font-semibold border ${variants[variant]}`}>
            {children}
        </span>
    );
};

const CodeBlock = ({ code, variant = 'default' }) => {
    const variants = {
        success: 'border-green-200 dark:border-green-800/50',
        error: 'border-red-200 dark:border-red-800/50',
        terminal: 'bg-secondary-900 dark:bg-black border-secondary-700 text-green-400',
        default: 'border-secondary-200 dark:border-secondary-700',
    };

    return (
        <pre className={`bg-white dark:bg-secondary-800 p-4 rounded-lg overflow-x-auto text-sm border ${variants[variant]}`}>
            <code className={variant === 'terminal' ? 'text-green-400' : 'text-secondary-800 dark:text-secondary-200'}>
                {typeof code === 'string' ? code : JSON.stringify(code, null, 2)}
            </code>
        </pre>
    );
};

const EndpointCard = ({ endpoint, isExpanded, onToggle }) => {
    const generateCurl = () => {
        let curl = `curl -X ${endpoint.method} http://localhost:5000/api${endpoint.path} \\\n  -H "Content-Type: application/json"`;
        if (endpoint.auth) curl += ' \\\n  -H "Cookie: accessToken=YOUR_TOKEN"';
        if (endpoint.body) curl += ` \\\n  -d '${JSON.stringify(endpoint.body)}'`;
        return curl;
    };

    return (
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md border border-secondary-200 dark:border-secondary-700 overflow-hidden hover:shadow-lg transition-shadow">
            <div
                className="p-5 cursor-pointer hover:bg-secondary-50 dark:hover:bg-secondary-800/80 transition-colors"
                onClick={onToggle}
            >
                <div className="flex items-start gap-3 mb-3">
                    <span className={`px-3 py-1.5 rounded-lg font-bold text-xs border ${METHOD_COLORS[endpoint.method]}`}>
                        {endpoint.method}
                    </span>
                    <code className="flex-1 text-secondary-800 dark:text-secondary-200 text-sm bg-secondary-100 dark:bg-secondary-900/50 px-3 py-1.5 rounded-lg break-all">
                        {endpoint.path}
                    </code>
                    {isExpanded ? (
                        <HiChevronDown className="text-xl text-secondary-500 dark:text-secondary-400" />
                    ) : (
                        <HiChevronLeft className="text-xl text-secondary-500 dark:text-secondary-400" />
                    )}
                </div>
                <h3 className="font-bold text-secondary-900 dark:text-secondary-100 mb-2">{endpoint.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-3">{endpoint.description}</p>
                <div className="flex flex-wrap gap-2">
                    {endpoint.auth && (
                        <Badge variant="auth">
                            <HiShieldCheck className="inline ml-1" /> نیاز به احراز هویت
                        </Badge>
                    )}
                    {endpoint.role && (
                        <Badge variant="role">
                            <HiUsers className="inline ml-1" /> {endpoint.role}
                        </Badge>
                    )}
                    {endpoint.params && (
                        <Badge variant="params">
                            <HiClipboardList className="inline ml-1" /> {endpoint.params}
                        </Badge>
                    )}
                </div>
            </div>

            {isExpanded && (
                <div className="border-t border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-900/50 p-5 space-y-5">
                    {endpoint.body && (
                        <div>
                            <h4 className="text-sm font-bold text-secondary-700 dark:text-secondary-300 mb-2 flex items-center gap-1">
                                <HiUpload /> Request Body:
                            </h4>
                            <CodeBlock code={endpoint.body} />
                        </div>
                    )}
                    {endpoint.response && (
                        <div>
                            <h4 className="text-sm font-bold text-secondary-700 dark:text-secondary-300 mb-2 flex items-center gap-1">
                                <HiDownload /> Response:
                            </h4>
                            <CodeBlock code={endpoint.response} variant="success" />
                        </div>
                    )}
                    {endpoint.errors?.length > 0 && (
                        <div>
                            <h4 className="text-sm font-bold text-secondary-700 dark:text-secondary-300 mb-2 flex items-center gap-1">
                                <HiExclamation /> خطاهای احتمالی:
                            </h4>
                            <ul className="space-y-2">
                                {endpoint.errors.map((error, idx) => (
                                    <li key={idx} className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm border border-red-200 dark:border-red-800/50">
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div>
                        <h4 className="text-sm font-bold text-secondary-700 dark:text-secondary-300 mb-2 flex items-center gap-1">
                            <HiTerminal /> مثال cURL:
                        </h4>
                        <CodeBlock code={generateCurl()} variant="terminal" />
                    </div>
                </div>
            )}
        </div>
    );
};

function ApiDocs() {
    const [expandedEndpoint, setExpandedEndpoint] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredEndpoints = selectedCategory === 'all'
        ? apiEndpoints
        : apiEndpoints.filter(section => section.id === selectedCategory);

    const toggleEndpoint = (sectionIdx, endpointIdx) => {
        const key = `${sectionIdx}-${endpointIdx}`;
        setExpandedEndpoint(expandedEndpoint === key ? null : key);
    };

    return (
        <div className="min-h-screen bg-secondary-0 dark:bg-secondary-900">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-0 mb-3 flex items-center justify-center gap-3">
                        <HiDocumentText className="text-primary-600 dark:text-primary-400" />
                        مستندات API
                    </h1>
                    <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-5">
                        پلتفرم فریلنسینگ - راهنمای کامل توسعه‌دهندگان
                    </p>
                    <div className="inline-block bg-linear-to-r from-primary-500 to-primary-600 px-6 py-3 rounded-lg shadow-md">
                        <code className="text-white font-mono font-semibold">
                            http://localhost:5000/api
                        </code>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-5 mb-10">
                    <InfoCard icon={HiLockClosed} title="احراز هویت">
                        Cookie-based authentication با accessToken و refreshToken
                    </InfoCard>
                    <InfoCard icon={HiUsers} title="نقش‌های کاربری">
                        <div className="flex flex-wrap gap-2 mt-2">
                            {['USER', 'FREELANCER', 'OWNER', 'ADMIN'].map(role => (
                                <Badge key={role}>{role}</Badge>
                            ))}
                        </div>
                    </InfoCard>
                    <InfoCard icon={HiChartBar} title="وضعیت‌ها">
                        200 موفق | 201 ایجاد | 400 خطا | 401 غیرمجاز | 404 یافت نشد
                    </InfoCard>
                </div>

                {/* Category Filter */}
                <div className="mb-8 flex flex-wrap gap-2 justify-center">
                    <CategoryButton
                        active={selectedCategory === 'all'}
                        onClick={() => setSelectedCategory('all')}
                    >
                        همه
                    </CategoryButton>
                    {apiEndpoints.map(section => (
                        <CategoryButton
                            key={section.id}
                            active={selectedCategory === section.id}
                            onClick={() => setSelectedCategory(section.id)}
                        >
                            {section.category}
                        </CategoryButton>
                    ))}
                </div>

                {/* Endpoints */}
                {filteredEndpoints.map((section, sectionIdx) => (
                    <div key={section.id} className="mb-10">
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-5 pb-2 border-b-2 border-primary-500 flex items-center gap-2">
                            {section.category}
                            <span className="text-sm font-normal text-secondary-500">
                                ({section.items.length})
                            </span>
                        </h2>
                        <div className="space-y-3">
                            {section.items.map((endpoint, endpointIdx) => (
                                <EndpointCard
                                    key={endpointIdx}
                                    endpoint={endpoint}
                                    isExpanded={expandedEndpoint === `${sectionIdx}-${endpointIdx}`}
                                    onToggle={() => toggleEndpoint(sectionIdx, endpointIdx)}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                {/* Footer */}
                <div className="mt-12 text-center p-6 bg-secondary-100 dark:bg-secondary-800 rounded-xl border border-secondary-200 dark:border-secondary-700">
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                        نسخه API: <span className="font-bold">1.0.0</span> | آخرین بروزرسانی: دسامبر 2024
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ApiDocs;
