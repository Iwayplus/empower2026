import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="container">
      <h1>Terms and Conditions</h1>
      <p>
        <strong>Effective Date:</strong> 12/06/2025
      </p>

      <p>
        Welcome to <strong>Empower Conference</strong>. By accessing or using
        our website{" "}
        <a
          href="https://empowerconference.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://empowerconference.in
        </a>
        , you agree to comply with and be bound by the following Terms and
        Conditions.
      </p>

      <h2>1. Use of Website</h2>
      <p>
        This website is intended to provide information related to the Empower
        Conference, including registration, event schedules, and related
        services. You agree to use the site only for lawful purposes.
      </p>

      <h2>2. Registration and Payments</h2>
      <ul>
        <li>All registrations are subject to availability and acceptance.</li>
        <li>Fees once paid are generally non-refundable unless otherwise stated.</li>
        <li>
          We reserve the right to cancel or reschedule the event with prior
          notice.
        </li>
      </ul>

      <h2>3. Intellectual Property</h2>
      <p>
        All content on this site, including text, logos, graphics, and media, is
        the property of Empower Conference or its licensors and is protected by
        copyright and intellectual property laws.
      </p>
    </div>
  );
};

export default TermsAndConditions;
