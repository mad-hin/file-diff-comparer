import { Button, Group, Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from "react";
import ReactDiffViewer from 'react-diff-viewer';

// adjust the row number according to the screen size
let rowNumber = 20;
if (typeof window !== 'undefined') {
    rowNumber = window.innerHeight / 40;
    console.log(rowNumber, window.innerHeight);
}

export default function FileLayout() {
    const [opened, { open, close }] = useDisclosure(false);

    const [oldCode, setOldCode] = React.useState("");
    const [newCode, setNewCode] = React.useState("");

    const clearText = () => {
        setOldCode("");
        setNewCode("");
    }

    // adjust the row number according to the screen size
    let rowNumber = 20;
    if (typeof window !== 'undefined') {
        rowNumber = window.innerHeight / 80;
        console.log(rowNumber, window.innerHeight);
    }

    const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0];
        const id = event.target?.id;

        if (!file) return; // there does not exist a file

        const reader = new FileReader();
        reader.onload = () => {
            const code = reader.result as string;
            console.log(code);
            // Do something with the file contents...

            if (id === "file1") {
                setOldCode(code);
                console.log(oldCode);
                // Do something with the old code...
            } else {
                setNewCode(code);
                console.log(newCode);
                // Do something with the new code...
            }
        };
        reader.readAsText(file);
    };

    return (
        <div>
            {/* Text area */}
            {/* <div className="flex flex-row ">
                <div className="w-full border border-gray-200 rounded-lg bg-gray-700 border-gray-600">
                    <div className="px-4 bg-white rounded-t-lg bg-gray-700">
                        <label className="sr-only">Text Area 1</label>
                        <textarea id="Text Area 1" className="w-full px-0 h-96 text-sm text-gray-900 bg-white border-0 bg-gray-700 focus:ring-0 text-white placeholder-gray-400" placeholder="File 1 content" ></textarea>
                    </div>
                </div>
                <div className="px-5" />
                <div className="w-full border border-gray-200 rounded-lg bg-gray-700 border-gray-600">
                    <div className="px-4 bg-white rounded-t-lg bg-gray-700">
                        <label className="sr-only">Text Area 2</label>
                        <textarea id="Text Area 2" className="w-full px-0 h-96 text-sm text-gray-900 bg-white border-0 bg-gray-700 focus:ring-0 text-white placeholder-gray-400" placeholder="File 2 content"></textarea>
                    </div>
                </div>
            </div> */}

            {/* <Grid.Container gap={2}>
                <Grid xs={12} md={6} >
                    <Textarea
                        placeholder="File 1 content"
                        fullWidth={true}
                        bordered
                        size="xl"
                        rows={rowNumber}
                        value={oldCode}
                        onChange={(e) => {
                            setOldCode(e.target.value);
                        }}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <Textarea
                        placeholder="File 2 content"
                        fullWidth={true}
                        bordered
                        size="xl"
                        rows={rowNumber}
                        value={newCode}
                        onChange={(e) => {
                            setNewCode(e.target.value);
                        }}
                    />
                </Grid>
            </Grid.Container> */}
            <Group grow>
                <Textarea
                    placeholder="File 1 content"
                    autosize
                    minRows={rowNumber}
                    maxRows={rowNumber}
                    variant="filled"
                    radius='lg'
                    value={oldCode}
                    onChange={(e) => {
                        setOldCode(e.target.value);
                    }}
                    size="lg"
                />
                <Textarea
                    placeholder="File 2 content"
                    autosize
                    minRows={rowNumber}
                    maxRows={rowNumber}
                    variant="filled"
                    radius='lg'
                    value={newCode}
                    onChange={(e) => {
                        setNewCode(e.target.value);
                    }}
                    size="lg"
                />
            </Group>

            <div className="text-2xl text-center py-8 ">
                or upload the files
            </div>

            {/* File upload */}
            <div className="flex flex-row ">
                <div className="flex-1 items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2  border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-gray-700  border-gray-600 hover:border-gray-500 hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span></p>
                            <p className="text-xs text-gray-400">TXT file</p>
                        </div>
                        <input id="file1" type="file" className="hidden" accept=".txt" onChange={onFileUpload} />
                    </label>
                </div>
                <div className="px-5" />
                <div className="flex-1 items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-gray-700  border-gray-600 hover:border-gray-500 hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span></p>
                            <p className="text-xs text-gray-400">TXT file</p>
                        </div>
                        <input id="file2" type="file" className="hidden" accept=".txt" onChange={onFileUpload} />
                    </label>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center py-10' >
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
                >
                    <ReactDiffViewer
                        oldValue={oldCode}
                        newValue={newCode}
                        splitView={true}
                        showDiffOnly={false}
                    // useDarkTheme={true}
                    />
                </Modal>

            </div>
        </div>

    )
}