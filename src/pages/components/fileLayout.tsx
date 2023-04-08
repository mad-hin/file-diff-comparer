import { Button, Grid, Modal, Textarea} from '@nextui-org/react';
import React from "react";
import ReactDiffViewer from 'react-diff-viewer';

let oldCode = ``;
let newCode = ``;

// adjust the row number according to the screen size
let rowNumber = 20;
if (typeof window !== 'undefined') {
    rowNumber = window.innerHeight / 40;
    console.log(rowNumber, window.innerHeight);
}

export default function FileLayout() {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };
    return (
        <div>
            {/* Text area */}
            {/* <div className="flex flex-row ">
                <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 bg-white rounded-t-lg dark:bg-gray-700">
                        <label className="sr-only">Text Area 1</label>
                        <textarea id="Text Area 1" className="w-full px-0 h-96 text-sm text-gray-900 bg-white border-0 dark:bg-gray-700 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="File 1 content" ></textarea>
                    </div>
                </div>
                <div className="px-5" />
                <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 bg-white rounded-t-lg dark:bg-gray-700">
                        <label className="sr-only">Text Area 2</label>
                        <textarea id="Text Area 2" className="w-full px-0 h-96 text-sm text-gray-900 bg-white border-0 dark:bg-gray-700 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="File 2 content"></textarea>
                    </div>
                </div>
            </div> */}

            <Grid.Container gap={2}>
                <Grid xs={12} md={6} >
                    <Textarea
                        placeholder="File 1 content"
                        fullWidth={true}
                        bordered
                        size="xl"
                        rows={rowNumber}
                        onChange={(e) => {
                            oldCode = e.target.value;
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
                        onChange={(e) => {
                            newCode = e.target.value;
                        }}
                    />
                </Grid>
            </Grid.Container>

            {/* <div className="text-2xl text-center py-8 ">
                or upload the files
            </div> */}

            {/* File upload
            <div className="flex flex-row ">
                <div className="flex-1 items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">TXT file</p>
                        </div>
                        <input id="file1" type="file" className="hidden" accept=".txt" />
                    </label>
                </div>
                <div className="px-5" />
                <div className="flex-1 items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">TXT file</p>
                        </div>
                        <input id="file2" type="file" className="hidden" accept=".txt" />
                    </label>
                </div>
            </div> */}
            <div className='flex flex-col items-center justify-center py-10' >
                <Button
                    className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onPress={
                        handler
                        
                    }>
                    Compare
                </Button>
                <Modal
                    open={visible}
                    onClose={closeHandler}
                    blur
                    width='80%'
                    // noPadding
                    closeButton
                    preventClose
                    className='bg-gray-50 dark:bg-gray-800'
                >
                    <Modal.Body
                        autoMargin
                        color='gray-700'
                    >
                        <ReactDiffViewer
                            oldValue={oldCode}
                            newValue={newCode}
                            splitView={true}
                            showDiffOnly={false}
                            // useDarkTheme={true}
                        />
                   </Modal.Body>
                </Modal>

            </div>
        </div>

    )
}