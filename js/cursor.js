document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    let cursorPos = { x: 0, y: 0 };
    let cursorOutlinePos = { x: 0, y: 0 };

    document.addEventListener('mousemove', (e) => {
        cursorPos.x = e.clientX;
        cursorPos.y = e.clientY;

        cursorDot.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`;
    });

    requestAnimationFrame(function animate() {
        cursorOutlinePos.x += (cursorPos.x - cursorOutlinePos.x) * 0.15;
        cursorOutlinePos.y += (cursorPos.y - cursorOutlinePos.y) * 0.15;
        cursorOutline.style.transform = `translate(${cursorOutlinePos.x}px, ${cursorOutlinePos.y}px)`;
        
        requestAnimationFrame(animate);
    });

    // Cursor interactions
    document.querySelectorAll('a, button, .feature-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = `translate(${cursorOutlinePos.x}px, ${cursorOutlinePos.y}px) scale(1.5)`;
            cursorOutline.style.borderColor = 'var(--accent-color)';
            cursorDot.style.backgroundColor = 'var(--accent-color)';
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = `translate(${cursorOutlinePos.x}px, ${cursorOutlinePos.y}px) scale(1)`;
            cursorOutline.style.borderColor = 'var(--primary-color)';
            cursorDot.style.backgroundColor = 'var(--primary-color)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseout', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    document.addEventListener('mouseover', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
}); 