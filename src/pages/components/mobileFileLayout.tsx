import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from "react";
import ReactDiffViewer from 'react-diff-viewer';

export default function MobileFileLayout() {
    const [opened, { open, close }] = useDisclosure(false);
    const [oldCode, setOldCode] = React.useState("");
    const [newCode, setNewCode] = React.useState("");
    const [activeTab, setActiveTab] = React.useState<"file1" | "file2">("file1");

    const clearText = () => {
        setOldCode("");
        setNewCode("");
    };

    const processFile = (file: File, target: "file1" | "file2") => {
        const reader = new FileReader();
        reader.onload = () => {
            const code = reader.result as string;
            if (target === "file1") setOldCode(code);
            else setNewCode(code);
        };
        reader.readAsText(file);
    };

    const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0];
        if (!file) return;
        processFile(file, activeTab);
    };

    return (
        <div className="flex flex-col flex-1 min-h-0 px-4">
            {/* Tab switcher */}
            <div className="flex flex-row shrink-0 mb-2">
                <button
                    className={`flex-1 py-2 text-center text-sm font-semibold rounded-l-lg transition-colors ${activeTab === "file1"
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                        }`}
                    onClick={() => setActiveTab("file1")}
                >
                    File 1
                </button>
                <button
                    className={`flex-1 py-2 text-center text-sm font-semibold rounded-r-lg transition-colors ${activeTab === "file2"
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                        }`}
                    onClick={() => setActiveTab("file2")}
                >
                    File 2
                </button>
            </div>

            {/* Active textarea */}
            <div className="flex-1 min-h-0 flex rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600 focus-within:ring-2 focus-within:ring-blue-500">
                <textarea
                    className="w-full h-full resize-none bg-transparent dark:text-gray-200 p-4 text-sm leading-6 focus:outline-none"
                    placeholder={activeTab === "file1" ? "File 1 content" : "File 2 content"}
                    value={activeTab === "file1" ? oldCode : newCode}
                    onChange={(e) => activeTab === "file1" ? setOldCode(e.target.value) : setNewCode(e.target.value)}
                />
            </div>

            {/* Upload zone */}
            <div className="shrink-0 mt-2">
                <label
                    className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                >
                    <div className="flex flex-col items-center justify-center">
                        <svg aria-hidden="true" className="w-5 h-5 mb-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Upload {activeTab === "file1" ? "File 1" : "File 2"}</span> — TXT
                        </p>
                    </div>
                    <input type="file" className="hidden" accept=".txt" onChange={onFileUpload} />
                </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-3 justify-center py-2 shrink-0">
                <Button onClick={clearText} color='red' variant="filled" className='bg-red-700' size="sm" radius="md">
                    Clear All
                </Button>
                <Button onClick={open} color='green' variant="filled" className='bg-green-700' size="sm" radius="md">
                    Compare
                </Button>
            </div>

            <Modal
                opened={opened}
                onClose={close}
                size="100%"
                closeOnClickOutside={false}
                closeOnEscape={false}
                title="Result"
                transitionProps={{ duration: 0 }}
                fullScreen
            >
                {oldCode === newCode ? (
                    <p className="text-center text-lg text-gray-500 py-8">No difference</p>
                ) : (
                    <ReactDiffViewer
                        oldValue={oldCode}
                        newValue={newCode}
                        splitView={false}
                        showDiffOnly={true}
                        useDarkTheme={true}
                    />
                )}
            </Modal>
        </div>
    );
}
