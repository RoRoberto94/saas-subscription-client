import React, { useState } from "react";
import styles from "./DemoGuide.module.css";

const DemoGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  //This component is only rendered in the production environment to guide evaluators.
  if (!isVisible) {
    return null;
  }

  if (import.meta.env.DEV) {
    return null;
  }

  return (
    <div className={styles.guideBanner}>
      <button
        onClick={() => setIsVisible(false)}
        className={styles.closeButton}
      >
        &times;
      </button>
      <h4 className={styles.title}>
        <span role="img" aria-label="light-bulb">
          💡
        </span>{" "}
        Demo Guide
      </h4>
      <ul className={styles.infoList}>
        <li>
          <strong>Admin Access:</strong>
        </li>
        <li>
          Email: <code>admin.demo@sub.scribe</code>
        </li>
        <li>
          Password: <code>Password123!</code>
        </li>
        <li style={{ marginTop: "0.75rem" }}>
          <strong>Test Card (Stripe):</strong>
        </li>
        <li>
          Number: <code>4242 4242 4242 4242</code>
        </li>
        <li>Any future date & 3-digit CVC</li>
      </ul>
    </div>
  );
};

export default DemoGuide;
