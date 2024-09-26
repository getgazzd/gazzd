import Layout from "components/Layouts/PageLayout";

const PrivacyPolicy = () => {
  return (
    <Layout title="GAZZD - Prospect" description="">
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <h1 style={{ fontSize: 28, textAlign: "center", marginBottom: 20 }}>
          Terms and Conditions
        </h1>

        <div style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 24, marginBottom: 10 }}>
            Acceptance of Terms
          </h2>
          <p>
            By using this website and its services, you agree to be bound by the
            following terms and conditions.
          </p>
          <p>
            By accessing or using the website, you agree to be bound by these
            terms and conditions, which may be updated by GAZZD AB from time to
            time without notice. You should review these terms and conditions
            periodically for changes.
          </p>
        </div>

        <div style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 24, marginBottom: 10 }}>
            Use of Cookies and Tracking Technologies
          </h2>
          <p>
            This website uses cookies and similar tracking technologies to
            enhance your browsing experience, analyze website traffic, and
            deliver personalized content and advertisements.
          </p>
          <p>
            By accepting our cookie policy, you consent to the use of cookies as
            described in our Privacy Policy.
          </p>
        </div>

        <div style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 24, marginBottom: 10 }}>
            Intellectual Property Rights
          </h2>
          <p>
            All content and materials available on this website, including but
            not limited to text, graphics, logos, button icons, images, audio
            clips, data compilations, and software, are the property of GAZZD AB
            or its content suppliers and are protected by international
            copyright laws.
          </p>
          <p>
            You may not reproduce, modify, distribute, or republish any content
            from this website without prior written permission.
          </p>
        </div>

        {/* Add more sections as needed */}

        <div style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 24, marginBottom: 10 }}>
            Contact Information
          </h2>
          <p>
            If you have any questions or concerns about these terms and
            conditions, please contact GAZZD AB at [Your Contact Email].
          </p>
        </div>

        <p style={{ fontSize: 16, textAlign: "center", marginTop: 40 }}>
          By clicking Accept or by continuing to use this website, you
          acknowledge that you have read, understood, and agree to be bound by
          these terms and conditions.
        </p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
