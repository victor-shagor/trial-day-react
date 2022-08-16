import React, { useState } from "react";
import { Applicant } from "./StatusCard";
import { v4 as uuidv4 } from "uuid";

const CreateApplicantModal = (props: {
  show: boolean;
  toggle: () => void;
  onAddApplicant: (applicant: Applicant) => void;
}) => {
  const initialState = { name: "", age: "", position: "" };
  const [applicant, setApplicant] = useState(initialState);
  const [error, setError] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setApplicant((prevState) => ({ ...prevState, [name]: value }));
    setError({ ...error, [name]: "" });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { name, age, position } = applicant;
    if (!name || !age || !position) {
      const newError = {
        name: name ? "" : "Name is required",
        position: position ? "" : "position is required",
        age: age ? "" : "age is required",
      };
      return setError(newError);
    } else {
      const data: Applicant = {
        ...applicant,
        id: uuidv4(),
        status: "inReview",
      };
      props.onAddApplicant(data);
    }
  };

  return props.show ? (
    <div
      style={{ position: "fixed", ...styles.modal }}
      className="modal"
      onClick={props.toggle}
    >
      <div
        style={styles.modalContent}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.modalHeader} className="modal-header">
          <h4 style={styles.modalTitle} className="modal-title">
            Add A New Applicant
          </h4>
        </div>
        <div style={styles.modalBody} className="modal-body">
          <form
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
            data-testid="create-form"
          >
            <input
              style={styles.input}
              type="text"
              placeholder="name"
              required
              name="name"
              onChange={handleChange}
            />{" "}
            <span style={styles.text}>{error.name}</span>
            <br />
            <input
              style={styles.input}
              type="text"
              placeholder="position"
              required
              name="position"
              onChange={handleChange}
            />{" "}
            <span style={styles.text}>{error.position}</span>
            <input
              style={styles.input}
              type="text"
              placeholder="age"
              required
              name="age"
              onChange={handleChange}
            />{" "}
            <span style={styles.text}>{error.age}</span>
            <br />
            <div style={styles.submit}>
              <input type="submit" className="button" />
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default CreateApplicantModal;

const styles = {
  modal: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: "500px",
    backgroundColor: "white",
  },
  modalHeader: { padding: "10px" },

  modalTitle: {
    margin: 0,
  },

  modalBody: {
    padding: "10px",
    borderTop: "1px solid #eee",
    borderBottom: "1px solid #eee",
  },
  input: {
    width: "90%",
    padding: "12px 20px",
    display: "inline-block",
    marginTop: "1.5rem",
  },
  text: {
    color: "red",
    opacity: "0.5",
    fontSize: "15px",
  },
  submit: {
    display: "flex",
    width: "90%",
    justifyContent: "flex-end",
  },
};
