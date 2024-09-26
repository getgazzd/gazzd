import Script from "next/script";
import { useEffect, useRef } from "react";

const HelpdeskSetup = () => {
  const intervalRef = useRef<NodeJS.Timer>();
  const countRef = useRef(0);

  const loadForm = () => {
    console.log("LOADING FORM");
    if ($("#zammad-feedback-form")) {
      //@ts-ignore
      $("#zammad-feedback-form").ZammadForm({
        messageTitle: "Feedback Form",
        messageSubmit: "Submit",
        messageThankYou:
          "Thank you for your inquiry (#%s)! We'll contact you as soon as possible.",
      });
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (countRef.current >= 10 && intervalRef.current)
        clearInterval(intervalRef.current);
      try {
        loadForm();
        // @ts-ignore
        clearInterval(intervalRef.current);
      } catch {}
      countRef.current++;
    }, 200);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  return (
    <>
      {/* eslint-disable */}
      <Script
        id="jquery"
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      />
      <Script
        id="zammad_form_script"
        src="https://helpdesk.gazzd.com/assets/form/form.js"
      />
    </>
  );
};
export default HelpdeskSetup;
