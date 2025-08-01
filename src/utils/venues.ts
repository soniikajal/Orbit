// Utility to get available venue locations from markers.json
export interface VenueLocation {
  name: string;
  coordinates: [number, number]; // [lng, lat]
  originalName?: string; // Original name from markers.json for navigation
}

export const getAvailableVenues = async (): Promise<VenueLocation[]> => {
  try {
    const response = await fetch('/markers.json');
    const data = await response.json();
    
    const venues: VenueLocation[] = [];
    
    data.features.forEach((feature: any) => {
      const originalName = feature.properties.name;
      const coordinates = feature.geometry.coordinates;
      
      if (!originalName) return;
      
      // Check if the name contains "/"
      if (originalName.includes('/')) {
        // Split by "/" and create separate entries for each part
        const parts = originalName.split('/').map((part: string) => part.trim());
        parts.forEach((part: string) => {
          if (part) {
            venues.push({
              name: part,
              coordinates: coordinates,
              originalName: originalName // Keep reference to original name for navigation
            });
          }
        });
      } else {
        // Add as single venue
        venues.push({
          name: originalName,
          coordinates: coordinates,
          originalName: originalName
        });
      }
    });
    
    return venues;
  } catch (error) {
    console.error('Error loading venues:', error);
    return [];
  }
};

// Function to navigate to a specific venue
export const navigateToVenue = async (venueName: string) => {
  try {
    // Get available venues to find the original name if needed
    const venues = await getAvailableVenues();
    const venue = venues.find(v => v.name === venueName);
    
    // Use original name if available, otherwise use the provided name
    const nameToNavigate = venue?.originalName || venueName;
    const encodedVenue = encodeURIComponent(nameToNavigate);
    
    // Navigate to fullmap page with the venue as a query parameter in a new tab
    const newWindow = window.open(`/navigation/fullmap?destination=${encodedVenue}`, '_blank');
    
    // Check if popup was blocked
    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
      // Fallback: navigate in same tab if popup was blocked
      window.location.href = `/navigation/fullmap?destination=${encodedVenue}`;
    }
  } catch (error) {
    console.error('Error navigating to venue:', error);
    // Fallback to original behavior
    const encodedVenue = encodeURIComponent(venueName);
    const newWindow = window.open(`/navigation/fullmap?destination=${encodedVenue}`, '_blank');
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
      window.location.href = `/navigation/fullmap?destination=${encodedVenue}`;
    }
  }
};
