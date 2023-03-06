import React, { useEffect, useState } from "react";
import './modal.scss'
import {DatasetList} from  '../sourceList/list';


export const Modal = ({ onRequestClose }) => {
	// Use useEffect to add an event listener to the document
    console.log("here")
	useEffect(() => {
		function onKeyDown(event) {
			if (event.keyCode === 27) {
				// Close the modal when the Escape key is pressed
				onRequestClose();
			}
		}

		// Prevent scolling
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onKeyDown);

		// Clear things up when unmounting this component
		return () => {
			document.body.style.overflow = "visible";
			document.removeEventListener("keydown", onKeyDown);
		};
	});

	return (
		<div className="modal__backdrop">
			<div className="modal__container">
	                <DatasetList/>
				<button type="button" className="close-modal" onClick={onRequestClose}>
					Close
				</button>
			
			</div>
		</div>
	);
};

// export const PageModal = () => {
// 	const [isModalOpen, setModalIsOpen] = useState(false);
// 		const toggleModal = () => {
// 		setModalIsOpen(!isModalOpen);
// 	};

// 	return (
// 		<main>
// 			{isModalOpen && <Modal onRequestClose={toggleModal} />}
// 			<h1>React modal</h1>
// 			<p>
// 				This Pen shows an example of a controlled modal component built using React hooks, specifically <code>useState()</code> and <code>useEffect()</code>.
// 			</p>
// 			<p>Hit the button below to show the modal.</p>
// 			<button onClick={toggleModal} type="button">
// 				Show the modal
// 			</button>
		
// 		</main>
// 	);
// };

