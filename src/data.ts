export const AUDIO_BASE = "files/audio/";

export type TrackInfo = {
  title: string;
  path: string;
  category: string;
  group: string;
  style?: string;
};

const rawAudioData = {
    "commissioned": {
        "Ensemble": [
            "commissioned/ensemble/Roundabout (Jazz).mp3"
        ],
        "Orchestra": [
            "commissioned/orchestra/Villain (Fantasy).mp3"
        ]
    },
    "original": {
        "Ensemble": [
            "original/ensemble/Cowboy Crossing (Country).mp3",
            "original/ensemble/Easy Drifter (Country).mp3",
            "original/ensemble/Espionage (Jazz).mp3",
            "original/ensemble/Ghost Town (Country).mp3",
            "original/ensemble/Halloween Mischief.mp3",
            "original/ensemble/Llega el Rey (Latin Jazz).mp3",
            "original/ensemble/Minor Infractions (Jazz).mp3",
            "original/ensemble/The Instigator.mp3"
        ],
        "Orchestra": [
            "original/orchestra/Alarms Triggered (Action).mp3",
            "original/orchestra/Ascend (Fantasy).mp3",
            "original/orchestra/Breach Protocol (Action).mp3",
            "original/orchestra/Escape The Compound (Action).mp3",
            "original/orchestra/Extraction Operation (Action).mp3",
            "original/orchestra/Falling (Fantasy).mp3",
            "original/orchestra/Stealth Takeout (Action).mp3",
            "original/orchestra/The Jester (Fantasy).mp3",
            "original/orchestra/Wicked Waltz (Dark).mp3"
        ],
        "Piano": [
            "original/piano/Falling.wav",
            "original/piano/Gentle Goodbye.wav",
            "original/piano/Memory.wav"
        ],
        "Rock": [
            "original/rock/Inadvertent (Hard).mp3",
            "original/rock/Spies (Hard).mp3",
            "original/rock/Suspended (Indie).mp3"
        ]
    }
};

function parseTrackInfoFromPath(path: string) {
  let raw = decodeURIComponent(path.split("/").pop() || "Unknown Track");
  raw = raw.replace(/\.[^/.]+$/, "").trim(); 
  
  const match = raw.match(/^(.*?)\s*\(([^)]+)\)$/);
  if (match) {
    return { title: match[1].trim(), style: match[2].trim() };
  }
  return { title: raw, style: undefined };
}

export const tracks: Record<string, TrackInfo[]> = {
  original: [],
  commissioned: [],
};

Object.entries(rawAudioData).forEach(([group, categories]) => {
  Object.entries(categories).forEach(([category, paths]) => {
    paths.forEach((path) => {
      const { title, style } = parseTrackInfoFromPath(path);
      tracks[group].push({
        title,
        style,
        path,
        category,
        group,
      });
    });
  });
});

export const allTracks: TrackInfo[] = [...tracks.original, ...tracks.commissioned];

