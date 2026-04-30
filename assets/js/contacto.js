
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById("contactName").value;
            const email = document.getElementById("contactEmail").value;
            const subject = document.getElementById("contactSubject").value;
            const message = document.getElementById("contactMessage").value;

            const fullMessage = `Hola, soy ${name}.\nCorreo: ${email}\nAsunto: ${subject}\nMensaje:\n${message}`;

            const phoneNumber = window.getWhatsAppNumber ? window.getWhatsAppNumber() : '59177822038';
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;

            window.open(whatsappURL, '_blank');
        });
    }
});
