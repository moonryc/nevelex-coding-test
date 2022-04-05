const { useState, useEffect } = require('react');




/**
 *
 * @returns {'xs, sm, md, lg, xl'}
 */
export const useCurrentBreakpoint = () => {


    const [currentBreakpoint, setCurrentBreakpoint] = useState('sm');
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            switch (true) {
                case (window.innerWidth < 480):
                    setCurrentBreakpoint('xs');
                    break;
                case (window.innerWidth < 768):
                    setCurrentBreakpoint('sm');
                    break;
                case (window.innerWidth < 992):
                    setCurrentBreakpoint('md');
                    break;
                case (window.innerWidth < 1200):
                    setCurrentBreakpoint('lg');
                    break;
                default:
                    setCurrentBreakpoint('xl');
            }
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return currentBreakpoint;
}