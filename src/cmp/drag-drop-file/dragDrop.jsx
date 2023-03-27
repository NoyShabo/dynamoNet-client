import { Image } from '@mantine/core';
import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import './dragDrop.scss'
import '../../globalStyle.scss'

import uploadImg from "./import.svg"

export function DropZone({ fileReadCallback }) {
    const [draggingOver, setDraggingOver] = useState('');
    const [acceptedFiles, setAcceptedFiles] = useState([]);

    const input = useRef(null);

    const readFile = (e) => {
        if (e.target.files) {
            setAcceptedFiles(Array.from(e.target.files));
            const reader = new FileReader();
            reader.onload = function (event) {
                const text = event.target.result;
                fileReadCallback(text);
                console.log(text);
            };
            reader.readAsText(e.target.files[0]);
        }
    };

    const onDrop = useCallback((acceptedFiles) => {
        setAcceptedFiles(acceptedFiles);
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = (event) => {
            const text = event.target.result;
            fileReadCallback(text);
        };
        reader.readAsText(acceptedFiles[0]);
        setDraggingOver('');
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        noClick: true,
        useFsAccessApi: false,
        accept: { 'text/csv': ['.csv'] },
    });

    return (
        <div className="drop-cmp">
            <h2 className="title-header">Upload File</h2>
            <section
                className="drop-zone"
                onDragOver={(e) => setDraggingOver('dragging')}
                onDragLeave={(e) => setDraggingOver('')}
            >
                <div {...getRootProps()} className="drop-root">
                    <input {...getInputProps()} />
                    <form>
                        <Image src={uploadImg} height={50} fit="contain" />
                        <h2 className="title-upload-file">Drop CSV File</h2>
                        <h3>OR</h3>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                input.current.click();
                            }}
                        >
                            Browse
                        </button>
                        <input
                            ref={input}
                            className="hidden"
                            type="file"
                            accept=".csv"
                            onChange={readFile}
                        />
                        <h4>Files:</h4>
                        <br />
                        <ul>
                            {acceptedFiles.map((file) => (
                                <li key={file.name}>{file.name}</li>
                            ))}
                        </ul>
                    </form>
                </div>
            </section>
        </div>
    );
}