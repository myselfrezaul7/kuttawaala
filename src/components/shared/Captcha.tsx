"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

interface CaptchaProps {
    onChange: (token: string | null) => void;
}

export function Captcha({ onChange }: CaptchaProps) {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    return (
        <div className="flex justify-center my-4">
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Test key for dev
                onChange={onChange}
                theme="light"
            />
        </div>
    );
}
