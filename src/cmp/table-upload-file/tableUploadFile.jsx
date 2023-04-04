import { useRef, useState } from "react";
import { DropZone } from "../drag-drop-file/dragDrop";

import './tableUploadFile.scss'

export function TableUploadFile({array, setArray, setFileToSend}) {
    const [headerKeys, setHeaderKeys] = useState([]);
    const refTableHeader = useRef(null);
  
    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const newArray = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });

        setArray(newArray);
        setHeaderKeys(csvHeader);
    };
  
    const scrollHeaderWithTable = (e) => {
        refTableHeader.current.scrollLeft = e.target.scrollLeft;
        refTableHeader.current.scrollLeft = e.target.scrollLeft;
    };
  
    return (
        <div className='table-analyser'>
            <DropZone fileReadCallback={csvFileToArray} setFileToSend={setFileToSend}/>
            <div className={` table-container ${array.length?'':'hidden'}`}>
                <div className='table-header' ref={refTableHeader}>
                    <table>
                        <thead >
                            <tr key={"header"}>
                                {headerKeys.map((key, index) => (
                                    <td key={`${index} + ${key}a`}>{key}</td>
                                ))}
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className='table-values' onScroll={scrollHeaderWithTable}>
                    <table className='table'>
                        <tbody>
                            {array.map((item, index1) => (
                                <tr key={`${index1}_tr_key`}>
                                    {Object.values(item).map((val, index2) => (
                                        <td key={`${index1}_td_key_${index2}`}><div className='td-content'>{val}</div></td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}