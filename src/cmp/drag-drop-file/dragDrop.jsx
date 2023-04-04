import { Image } from '@mantine/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import './dragDrop.scss'
import '../../globalStyle.scss'

import uploadImg from "./import.svg"

export function DropZone({ fileReadCallback ,setFileToSend}) {
    const [draggingOver, setDraggingOver] = useState('');
    const [acceptedFile, setAcceptedFile] = useState(null);

    const input = useRef(null);

    const readFile = (e) => {
        if (e.target.files) {
            setAcceptedFile(e.target.files[0]);

            const reader = new FileReader();
            reader.onload = function (event) {
                const text = event.target.result;
                setFileToSend(text)
                fileReadCallback(text);
            };
            reader.readAsText(e.target.files[0]);
        }
    };

    const onDrop = useCallback((acceptedFile) => {
        setAcceptedFile(acceptedFile);
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = (event) => {
            const text = event.target.result;
            fileReadCallback(text);
        };
        reader.readAsText(acceptedFile);
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
            {/* <h2 className="title-header">Upload File</h2> */}
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
                        <h4>File:</h4>
                        <br />
                        <ul>
                            {acceptedFile && <li >{acceptedFile.name}</li>}
                        </ul>
                    </form>
                </div>
            </section>
        </div>
    );
}