import { useEffect, useRef, useState } from 'react';

export const TookBox = () => {

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isActiveGeoLoc, setIsActiveGeoLoc] = useState(false);
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const closeModal = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Vérifie l’état réseau
  useEffect(() => {
    const id = setInterval(() => {
      setIsOnline(navigator.onLine);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Lance la caméra quand la modal s’ouvre
  useEffect(() => {
    if (isCameraActive) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Erreur caméra :', err);
        });
    }
  }, [isCameraActive]);

  const handleGeoloc = () => {
    setIsActiveGeoLoc((prev) => !prev);
  };

  useEffect(() => {
    if (isActiveGeoLoc) {
      if (!navigator.geolocation) {
        setGeoError('Géolocalisation non supportée par le navigateur');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setGeoError(null);
        },
        (err) => {
          setGeoError(err.message);
          setPosition(null);
        }
      );
    }
  }, [isActiveGeoLoc]);

  return (
    <>
      <div className="mt-3 d-flex flex-row justify-content-around">

        <button className="btn btn-primary">
          {isOnline ? '🟢 En ligne' : '🔴 Hors ligne'}
        </button>

        <button className="btn btn-primary" onClick={() => setIsCameraActive(true)}>
          Activer la caméra
        </button>

        <button className="btn btn-primary" onClick={handleGeoloc}>
          Toogle geolocalisation
        </button>

      </div>

      {isActiveGeoLoc && position && (
        <p>
          Latitude: {position.latitude.toFixed(5)}, Longitude: {position.longitude.toFixed(5)}
        </p>
      )}

      {isActiveGeoLoc && geoError && (
        <p className="text-danger">
          {geoError}
        </p>
      )}

      {isCameraActive && (
        <div className="d-flex flex-column align-items-center justify-content-center p-3 rounded-lg shadow-lg relative">
          <button
            className="btn btn-primary"
            onClick={closeModal}
          >
            Close
          </button>
          <video ref={videoRef} autoPlay className="d-block rounded" style={{ width: '300px', height: '300px' }} />
        </div>
      )}

    </>
  );
};
