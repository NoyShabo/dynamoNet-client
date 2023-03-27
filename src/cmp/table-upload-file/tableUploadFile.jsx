// import { useRef, useState } from "react";
// import { DropZone } from "../drag-drop-file/dragDrop";

// import './tableUploadFile.scss'

// export function TableUploadFile() {
//     const [array, setArray] = useState([]);
//     const [headerKeys, setHeaderKeys] = useState([]);
//     const refTableHeader = useRef(null);
  
//     const csvFileToArray = string => {
//         const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
//         const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

//         const newArray = csvRows.map(i => {
//             const values = i.split(",");
//             const obj = csvHeader.reduce((object, header, index) => {
//                 object[header] = values[index];
//                 return object;
//             }, {});
//             return obj;
//         });
//         let walletAddressProp=null;
  
//         Object.keys(newArray[0]).map((key)=>{
//             // if(isAddress(array[0][key])) walletAddressProp=key
//         });
  
//         const addressList=[];
//         if(!walletAddressProp) return;
//         newArray.map((member)=>{
//             addressList.push(member[walletAddressProp]);
//             // member.id=generateUUID();
//         });
//         axios.post('/api/wallet-analysis',{addressList:addressList}).then(console.log);
//         if(newArray.length){
//             setArray(newArray);
//             setHeaderKeys(Object.keys(Object.assign({}, ...newArray)));
//         }
//     };
  
//     const scrollHeaderWithTable = (e) => {
//         refTableHeader.current.scrollLeft = e.target.scrollLeft;
//         refTableHeader.current.scrollLeft = e.target.scrollLeft;
//     };
  
//     return (
//         <div className='whitelist-analyser'>
//             <DropZone fileReadCallback={csvFileToArray} />
//             <div className={` table-container ${array.length?'':'hidden'}`}>
//                 <div className='table-header' ref={refTableHeader}>
//                     <table>
//                         <thead >
//                             <tr key={"header"}>
//                                 {headerKeys.map((key, index) => (
//                                     <td key={`${index}` + `${key}`}>{key}</td>
//                                 ))}
//                             </tr>
//                         </thead>
//                     </table>
//                 </div>
//                 <div className='table-values' onScroll={scrollHeaderWithTable}>
//                     <table className='table'>
//                         <tbody>
//                             {array.map((item, index) => (
//                                 <tr key={`${item.id}_tr_key`}>
//                                     {Object.values(item).map((val, index) => (
//                                         <td key={`${item.id}_td_key`}><div className='td-content'>{val}</div></td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }