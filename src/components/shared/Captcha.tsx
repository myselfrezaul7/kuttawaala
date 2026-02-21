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
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LchaGgsAAAAAE-tlzeD1ApfHA2C6C-nM9Os41bf"}
                onChange={onChange}
                theme="light"
            />
        </div>
    );
}
