import { QuestionnaireResponse } from "../../types/QuestionnaireResponse";
import "./ResponseViewModal.css";

interface ResponseViewModalProps {
  response: QuestionnaireResponse | null;
  onClose: () => void;
}

export const ResponseViewModal = ({
  response,
  onClose,
}: ResponseViewModalProps) => {
  const formatDate = (date: string) => {
    const time = new Date(date).getTime();
    const offsetDate = new Date(
      time + new Date().getTimezoneOffset() * 60 * 1000
    );
    return offsetDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    response && (
      <div className="modal-overlay">
        <div className="response-modal">
          <div className="modal-header">
            <h2>Sleep Journal Entry</h2>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>

          <div className="modal-content">
            <div className="date-section">
              <h3>{formatDate(response.date)}</h3>
            </div>

            <div className="responses-section">
              <p>{response.responses[0]} Hours of Sleep</p>
              <p>{response.responses[1]} Sleep Quality</p>
              <p>{response.responses[2]} Sleepiness</p>
              <p>{response.responses[3]} Productivity</p>
              <p>{response.responses[4]} Energy Levels</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
