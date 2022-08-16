import React from "react";
import Card from "./Card";

export type Applicant = {
  id: string;
  name: string;
  age: string;
  position: string;
  status: string;
};

interface statusCardProp {
  title: string;
  status: string;
  applicants: Applicant[];
  onClickMove: (
    applicantId: string,
    presentStatus: string,
    direction: string
  ) => void;
}

const StatusCard = ({
  title,
  applicants,
  status,
  onClickMove,
}: statusCardProp) => {
  return (
    <div style={{ flexDirection: "column", ...styles.card }}>
      <div style={styles.title}>{title}</div>
      {applicants.length > 0 &&
        applicants
          .filter((el) => el.status === status)
          .map((app) => (
            <Card
              id={app.id}
              name={app.name}
              age={app.age}
              position={app.position}
              status={app.status}
              onClickMove={onClickMove}
            />
          ))}
    </div>
  );
};

export default StatusCard;

const styles = {
  card: {
    border: "1px solid black",
    display: "flex",
    alignItems: "center",
    paddingBottom: "150px",
    width: "500px",
    borderRadius: "10px",
    margin: "5px",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    backgroundColor: "#282c34",
    width: "100%",
    borderRadius: "10px",
  },
};
