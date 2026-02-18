import React, { useState } from "react";
import "./TCTForm.css";

function TCTForm() {
  // State สำหรับเก็บข้อมูลฟอร์ม
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [comment, setComment] = useState("");
  const [accept, setAccept] = useState(false);

  // State สำหรับ Modal และ Validation
  const [showModal, setShowModal] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  // ฟังก์ชันแปลงค่าตัวย่อ -> คำเต็ม (สำหรับแสดงผล)
  const getGenderFull = (g) => {
    if (g === "M") return "Male";
    if (g === "F") return "Female";
    if (g === "N") return "Prefer not to say";
    return "Not Specified";
  };

  const getRegionFull = (r) => {
    const regions = {
      N: "North",
      NE: "North East",
      C: "Central",
      S: "South",
    };
    return regions[r] || "Not Selected";
  };

  // ฟังก์ชันกดส่งฟอร์ม
  function FormSubmit() {
    if (!accept) {
      // ถ้าไม่ติ๊กยอมรับ ให้เขย่ากล่องเตือน
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500); // หยุดเขย่าหลัง 0.5 วิ
      return;
    }

    // ถ้าผ่านเงื่อนไข ให้เปิด Modal
    setShowModal(true);
  }

  // ฟังก์ชันปิด Modal และ (อาจจะ) รีเซ็ตฟอร์ม
  const closeModal = () => {
    setShowModal(false);
    // ถ้าต้องการเคลียร์ฟอร์มหลังจากกดปิด ให้เปิดคอมเมนต์ด้านล่าง
    // setName(''); setGender(''); setRegion(''); setComment(''); setAccept(false);
  };

  return (
    <div className="form-page-container">
      <div className="form-card">
        <h1 className="form-title">
          <i className="bi bi-ui-checks"></i> TCT <span>Form</span>
        </h1>

        {/* Name Input */}
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Gender Radio */}
        <div className="form-group">
          <label className="form-label">Gender</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="rdGender"
                value="M"
                checked={gender === "M"}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Male</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="rdGender"
                value="F"
                checked={gender === "F"}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Female</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="rdGender"
                value="N"
                checked={gender === "N"}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>N/A</span>
            </label>
          </div>
        </div>

        {/* Region Select */}
        <div className="form-group">
          <label className="form-label">Region</label>
          <select
            className="form-control"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">-- Select your region --</option>
            <option value="N">North</option>
            <option value="NE">North East</option>
            <option value="C">Central</option>
            <option value="S">South</option>
          </select>
        </div>

        <hr className="divider" />

        {/* Comment Textarea */}
        <div className="form-group">
          <label className="form-label">Additional Comments</label>
          <textarea
            className="form-control"
            placeholder="Type your message here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        {/* Professional Accept Checkbox */}
        <div className="form-group">
          <label className={`acceptance-box ${errorShake ? "error" : ""}`}>
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={accept}
              onChange={(e) => setAccept(e.target.checked)}
            />
            <div>
              <span className="accept-text">
                I accept the Terms and Conditions
              </span>
              <span className="accept-subtext">
                By clicking this, you agree to our usage policy.
              </span>
            </div>
          </label>
        </div>

        <button className="btn-submit-form" onClick={FormSubmit}>
          <i className="bi bi-send-fill"></i> Submit Data
        </button>
      </div>

      {/* --- Modal แสดงผลลัพธ์ --- */}
      {showModal && (
        <div className="form-modal-overlay" onClick={closeModal}>
          <div className="form-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="form-modal-header">
              <h2>
                <i className="bi bi-check-circle-fill"></i> Submission Success
              </h2>
            </div>
            <div className="form-modal-body">
              <div className="result-row">
                <span className="result-label">Name:</span>
                <span className="result-value">{name || "-"}</span>
              </div>
              <div className="result-row">
                <span className="result-label">Gender:</span>
                <span className="result-value text-primary">
                  {getGenderFull(gender)}
                </span>
              </div>
              <div className="result-row">
                <span className="result-label">Region:</span>
                <span className="result-value">{getRegionFull(region)}</span>
              </div>
              <div
                className="result-row"
                style={{ border: "none", flexDirection: "column", gap: "5px" }}
              >
                <span className="result-label">Comment:</span>
                <div
                  style={{
                    background: "#F3F4F6",
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                  }}
                >
                  {comment || "No comments provided."}
                </div>
              </div>
            </div>
            <div className="form-modal-footer">
              <button className="btn-close-modal" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TCTForm;
