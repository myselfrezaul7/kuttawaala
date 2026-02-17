export async function submitToWeb3Forms(data: any) {
    // Use env var or the key provided by user directly
    const access_key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "aea1b172-9662-4481-9dc0-ca1705fe1a5c";

    if (!access_key) {
        console.error("Web3Forms Access Key is missing!");
        return { success: false, message: "Server configuration error. Please contact support." };
    }

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key,
                ...data,
                subject: `New Submission from Kuttawaala: ${data.form_name || "Form"}`,
            }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Web3Forms Error:", error);
        return { success: false, message: "Failed to send message. Please try again." };
    }
}
