import React, { useState } from "react";
import StatusCard, { Applicant } from "components/StatusCard";
import { statuses } from "constant";
import "App.css";
import Modal from "components/CreateApplicantModal";

const App = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  const onClickMove = (
    applicantId: string,
    presentStatus: string,
    direction: string
  ) => {
    const presentStatusIndex = statuses.findIndex(
      (el) => el.status === presentStatus
    );

    const newStatus =
      direction === "next"
        ? statuses[presentStatusIndex + 1].status
        : statuses[presentStatusIndex - 1].status;
    const newApplicants = applicants.map((applicant) => {
      if (applicant.id === applicantId) {
        applicant.status = newStatus;
        return applicant;
      }
      return applicant;
    });
    setApplicants(newApplicants);
  };

  const [showModal, setShowModal] = useState(false);

  const toggle = () => setShowModal(!showModal);

  const onAddApplicant = (applicant: Applicant) => {
    setApplicants([applicant, ...applicants]);
    toggle();
  };

  return (
    <>
      <div className="buttonDiv">
        <button className="button" onClick={toggle}>
          Add Applicant
        </button>
      </div>
      <div className="App">
        {statuses.map((status) => (
          <StatusCard
            title={status.title}
            status={status.status}
            applicants={applicants}
            onClickMove={onClickMove}
          />
        ))}
      </div>
      <Modal show={showModal} toggle={toggle} onAddApplicant={onAddApplicant} />
    </>
  );
};

export default App;
