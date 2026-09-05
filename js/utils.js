/* utils.js */
/**
 * Utility functions for the Event Management Website
 */

// Load HTML components dynamically
async function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}`);
        }
        const html = await response.text();
        element.innerHTML = html;
        
        // Dispatch event when component is loaded
        const event = new CustomEvent('componentLoaded', { detail: { id: elementId } });
        document.dispatchEvent(event);
    } catch (error) {
        console.error('Error loading component:', error);
        element.innerHTML = '<div class="error">Failed to load component.</div>';
    }
}
