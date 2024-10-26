document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default behavior
            alert("You are being redirected to an external site.");
            window.open(link.href, "_blank"); // Open link in new tab
        });
    });

    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.addEventListener("mouseover", () => {
            section.style.backgroundColor = "#f0f8ff"; // Lighten the background color
        });
        section.addEventListener("mouseout", () => {
            section.style.backgroundColor = "#ffffff"; // Reset the background color
        });
    });

    // Toggle functionality for sections
    const toggleHeaders = document.querySelectorAll('.toggle');
    toggleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling; // Select the corresponding section content
            const indicator = header.querySelector('.indicator'); // Select the indicator span
            if (content.classList.contains('open')) {
                content.classList.remove('open'); // Close the section
                indicator.textContent = '+'; // Change to plus sign
            } else {
                content.classList.add('open'); // Open the section
                indicator.textContent = '−'; // Change to minus sign
            }
        });
    });
});
