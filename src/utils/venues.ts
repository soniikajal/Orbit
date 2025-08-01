// Utility to get available venue locations from markers.json
export interface VenueLocation {
  name: string;
  coordinates: [number, number]; // [lng, lat]
}

export const getAvailableVenues = async (): Promise<VenueLocation[]> => {
  try {
    const response = await fetch('/markers.json');
    const data = await response.json();
    
    return data.features.map((feature: any) => ({
      name: feature.properties.name,
      coordinates: feature.geometry.coordinates
    })).filter((venue: VenueLocation) => venue.name); // Filter out any undefined names
  } catch (error) {
    console.error('Error loading venues:', error);
    return [];
  }
};

// Function to navigate to a specific venue
export const navigateToVenue = (venueName: string) => {
  const encodedVenue = encodeURIComponent(venueName);
  // Navigate to fullmap page with the venue as a query parameter in a new tab
  const newWindow = window.open(`/navigation/fullmap?destination=${encodedVenue}`, '_blank');
  
  // Check if popup was blocked
  if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
    // Fallback: navigate in same tab if popup was blocked
    window.location.href = `/navigation/fullmap?destination=${encodedVenue}`;
  }
};
