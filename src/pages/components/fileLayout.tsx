import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from "react";
import ReactDiffViewer from 'react-diff-viewer';

function LineNumberedTextarea({ placeholder, value, onChange }: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}) {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = React.useRef<HTMLDivElement>(null);

    const lineCount = value ? value.split('\n').length : 1;
    const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

    const handleScroll = () => {
        if (textareaRef.current && lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    return (
        <div className="flex-1 min-h-0 flex rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600 focus-within:ring-2 focus-within:ring-blue-500">
            <div
                ref={lineNumbersRef}
                className="overflow-hidden select-none text-right py-4 px-3 text-sm leading-6 text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700"
            >
                {lines.map((n) => (
                    <div key={n}>{n}</div>
                ))}
            </div>
            <textarea
                ref={textareaRef}
                className="w-full h-full resize-none bg-transparent dark:text-gray-200 py-4 px-3 text-sm leading-6 focus:outline-none"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onScroll={handleScroll}
            />
        </div>
    );
}

export default function FileLayout() {
    const [opened, { open, close }] = useDisclosure(false);

    const [oldCode, setOldCode] = React.useState("");
    const [newCode, setNewCode] = React.useState("");
    const [isDraggingFile1, setIsDraggingFile1] = React.useState(false);
    const [isDraggingFile2, setIsDraggingFile2] = React.useState(false);

    const clearText = () => {
        setOldCode("");
        setNewCode("");
    }

    const processFile = (file: File, target: "file1" | "file2") => {
        const reader = new FileReader();
        reader.onload = () => {
            const code = reader.result as string;
            if (target === "file1") {
                setOldCode(code);
            } else {
                setNewCode(code);
            }
        };
        reader.readAsText(file);
    };

    const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0];
        const id = event.target?.id as "file1" | "file2";
        if (!file) return;
        processFile(file, id);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>, target: "file1" | "file2") => {
        e.preventDefault();
        if (target === "file1") setIsDraggingFile1(false);
        else setIsDraggingFile2(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file, target);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>, target: "file1" | "file2") => {
        e.preventDefault();
        if (target === "file1") setIsDraggingFile1(true);
        else setIsDraggingFile2(true);
    };

    const handleDragLeave = (_e: React.DragEvent<HTMLLabelElement>, target: "file1" | "file2") => {
        if (target === "file1") setIsDraggingFile1(false);
        else setIsDraggingFile2(false);
    };

    return (
        <div className="flex flex-col flex-1 min-h-0">
            {/* Text areas - fills remaining space */}
            <div className="flex flex-row gap-5 flex-1 min-h-0">
                <LineNumberedTextarea
                    placeholder="File 1 content"
                    value={oldCode}
                    onChange={setOldCode}
                />
                <LineNumberedTextarea
                    placeholder="File 2 content"
                    value={newCode}
                    onChange={setNewCode}
                />
            </div>

            <div className="text-xl text-center py-6 shrink-0">
                or upload the files
            </div>

            {/* File upload */}
            <div className="flex flex-row gap-5 shrink-0">
                <div className="flex-1">
                    <label
                        className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer ${isDraggingFile1 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : 'border-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'}`}
                        onDrop={(e) => handleDrop(e, "file1")}
                        onDragOver={(e) => handleDragOver(e, "file1")}
                        onDragLeave={(e) => handleDragLeave(e, "file1")}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <svg aria-hidden="true" className="w-6 h-6 mb-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click or drag file to upload</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">TXT file</p>
                        </div>
                        <input id="file1" type="file" className="hidden" accept=".txt" onChange={onFileUpload} />
                    </label>
                </div>
                <div className="flex-1">
                    <label
                        className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer ${isDraggingFile2 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : 'border-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'}`}
                        onDrop={(e) => handleDrop(e, "file2")}
                        onDragOver={(e) => handleDragOver(e, "file2")}
                        onDragLeave={(e) => handleDragLeave(e, "file2")}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <svg aria-hidden="true" className="w-6 h-6 mb-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click or drag file to upload</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">TXT file</p>
                        </div>
                        <input id="file2" type="file" className="hidden" accept=".txt" onChange={onFileUpload} />
                    </label>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center py-6 shrink-0' >
                <Group position="center">
                    <Button onClick={clearText} color='red' variant="filled" className='bg-red-700' size="lg" radius="md">
                        Clear All
                    </Button>
                    <Button onClick={open} color='green' variant="filled" className='bg-green-700' size="lg" radius="md">
                        Compare
                    </Button>
                </Group>
                <Modal
                    opened={opened}
                    onClose={close}
                    size="95%"
                    closeOnClickOutside={false}
                    closeOnEscape={false}
                    title="Result"
                    transitionProps={{ duration: 0 }}
                >
                    {oldCode === newCode ? (
                        <p className="text-center text-lg text-gray-500 py-8">No difference</p>
                    ) : (
                        <ReactDiffViewer
                            oldValue={oldCode}
                            newValue={newCode}
                            splitView={true}
                            showDiffOnly={true}
                            useDarkTheme={true}
                        />
                    )}
                </Modal>

            </div>
        </div>

    )
}