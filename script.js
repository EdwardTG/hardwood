document.addEventListener('DOMContentLoaded', function() {
    let lastScrollPosition = 0;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const scrollThreshold = 50;
    
    // Function to check if device is mobile
    function isMobileDevice() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Function to check if we're on the home page
    function isHomePage() {
        return document.body.classList.contains('home');
    }

    // Initialize header and footer as visible
    header.classList.add('visible');
    footer.classList.add('visible');

    function handleScroll() {
        // Only apply scroll behavior on mobile devices and non-home pages
        if (!isMobileDevice() || isHomePage()) {
            // Ensure header and footer are always visible on desktop or home page
            header.classList.remove('hidden');
            header.classList.add('visible');
            footer.classList.remove('hidden');
            footer.classList.add('visible');
            return;
        }

        const currentScroll = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Show header when at top of page
        if (currentScroll <= 0) {
            header.classList.remove('hidden');
            header.classList.add('visible');
        }
        // Show footer when at bottom of page
        else if ((window.innerHeight + currentScroll) >= documentHeight - 50) {
            footer.classList.remove('hidden');
            footer.classList.add('visible');
        }
        // Handle scroll direction
        else if (Math.abs(currentScroll - lastScrollPosition) >= scrollThreshold) {
            // Scrolling down
            if (currentScroll > lastScrollPosition) {
                header.classList.add('hidden');
                header.classList.remove('visible');
                footer.classList.add('hidden');
                footer.classList.remove('visible');
            }
            // Scrolling up
            else {
                header.classList.remove('hidden');
                header.classList.add('visible');
                footer.classList.remove('hidden');
                footer.classList.add('visible');
            }
            lastScrollPosition = currentScroll;
        }
    }

    // Add initial scroll position
    lastScrollPosition = window.pageYOffset;
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add resize event listener to handle orientation changes
    window.addEventListener('resize', handleScroll);
    
    // Initial check for page position
    handleScroll();
}); 