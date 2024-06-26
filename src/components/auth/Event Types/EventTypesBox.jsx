import React, { useState, useEffect } from "react";
import EditEventSidebar from "./EditEventSidebar";
import axios from "axios";
import Modal from "react-modal";
import menu from "../../../assets/icon/menu.svg";
import close from "../../../assets/icon/close.svg";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function EventTypesBox({ box, setRefresh, refresh }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const closeModal = () => setModalIsOpen(false);

  const handleDelete = (id) => {
    axios
      .delete(`https://localhost:7210/api/EventTypes/delete-eventtype-${id}`)
      .then((response) => {
        setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
        console.log(`Deleted box with id: ${id}`);
        console.log(response.data, "yes");
        toast.success("Event deleted successfully ");
        setRefresh((prev) => !prev);
      })
      .catch((error) => console.error("Error deleting box:", error));
    closeModal();
  };

  const handleCopyLink = () => {
    const link = `https://meetinglink/meeting/${box.id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard!", { autoClose: 3000 });
        console.log(link);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 3000);
        setRefresh((prev) => !prev);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy link");
      });
  };

  return (
    <div className="box">
      <div className="items-center justify-between bg-transparent px-5 p-3 rounded-lg border border-[#DFE1E7] h-[150px] w-[350px] my-5 mx-5 relative">
        <div className="flex items-center justify-between ">
          <div className="flex flex-col">
            <p className="text-[#56647E] text-[13px] font-medium">{box.name}</p>
            <p className="text-[#919AAB] text-[13px]">{box.duration} hours</p>
            <p className="text-[#919AAB] text-[13px]">
              Location:{box.location}
            </p>
          </div>
          <button onClick={() => setModalIsOpen(!modalIsOpen)}>
            <img src={menu} alt="" />
          </button>
        </div>
        <ToastContainer />

        <div
          className={
            modalIsOpen
              ? "flex flex-col items-start border  border-gray-300 space-x-2  absolute bottom-[-0%] right-0 bg-white p-2 rounded-lg shadow-lg"
              : "hidden justify-between space-x-2 mt-1"
          }
        >
          <button
            className="bg-gray-100 px-6 py-1 rounded-md w-full mb-1"
            onClick={() => setOverlay(true)}
          >
            Edit
          </button>
          <button
            className="bg-gray-100 px-6 py-1 rounded-md w-full ml-0 o-ml-0"
            onClick={() => handleDelete(box.id)}
          >
            Delete
          </button>
        </div>

        <hr className="horizontal-line-contacts my-2"></hr>
        <div className="flex items-center justify-between">
          <button onClick={handleCopyLink}>
            <p
              className={`text-[13px] ${
                linkCopied ? "text-[#6572E1] underline" : "text-[#919AAB]"
              }`}
            >
              {linkCopied ? "Link Copied!" : "Copy Link"}
            </p>
          </button>
          <button className="btn-eventtype border p-4 flex items-center mb-2">
            <p>Share</p>
          </button>
        </div>
      </div>
      {overlay && (
        <EditEventSidebar
          overlay={overlay}
          setOverlay={setOverlay}
          item={box}
          setRefresh={setRefresh}
          refresh={refresh}
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </div>
  );
}

export default EventTypesBox;
