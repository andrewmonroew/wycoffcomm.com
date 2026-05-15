document.addEventListener('DOMContentLoaded', () => {
    // Form submission handling using AJAX for Formspree
    const form = document.getElementById('quote-form');
    const statusMsg = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            statusMsg.textContent = "Sending configuration...";
            statusMsg.className = "form-status";

            const data = new FormData(form);
            const actionUrl = form.getAttribute('action');

            try {
                const response = await fetch(actionUrl, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    statusMsg.textContent = "Thank you! We will evaluate your request and contact you.";
                    statusMsg.className = "form-status success";
                    form.reset();
                } else {
                    const resData = await response.json();
                    if (Object.hasOwn(resData, 'errors')) {
                        statusMsg.textContent = resData["errors"].map(error => error["message"]).join(", ");
                    } else {
                        statusMsg.textContent = "Oops! Problem submitting form.";
                    }
                    statusMsg.className = "form-status error";
                }
            } catch (error) {
                statusMsg.textContent = "Oops! Network error submitting form.";
                statusMsg.className = "form-status error";
            }
        });
    }
});
