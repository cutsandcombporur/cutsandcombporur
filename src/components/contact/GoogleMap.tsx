interface GoogleMapProps {
  embedUrl: string;
  address: string;
}

function GoogleMap({ embedUrl, address }: GoogleMapProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Location
      </h2>
      
      <div className="rounded-lg overflow-hidden shadow-lg h-96 md:h-[500px]">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Cuts & Comb Salon Location - Porur"
            aria-label={`Map showing location of salon at ${address}`}
          ></iframe>
        ) : (
          <div className="bg-secondary-200 h-full flex flex-col items-center justify-center p-6 text-center">
            <svg className="w-16 h-16 text-secondary-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-secondary-600 text-lg font-medium">Map will be displayed here</p>
            <p className="text-secondary-500 text-sm mt-2">
              Configure VITE_GOOGLE_MAPS_EMBED_URL in environment variables
            </p>
          </div>
        )}
      </div>
      
      {embedUrl && (
        <a
          href={import.meta.env.VITE_GOOGLE_MAPS_LINK || 'https://maps.app.goo.gl/AeKqXZV2YKDh4yR57'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-primary-600 hover:text-primary-700 mt-3 text-center w-full"
        >
          Open in Google Maps for directions →
        </a>
      )}
    </div>
  );
}

export default GoogleMap;
