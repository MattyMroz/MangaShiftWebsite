import type { Options } from 'plyr';

/**
 * Plyr configuration - black & white theme, English i18n
 * Volume on the left side (after mute button)
 */
export const plyrOptions: Options = {
    // iOS native fullscreen for better compatibility
    fullscreen: { iosNative: true },

    // Show tooltips on hover
    tooltips: { controls: true, seek: true },

    // Auto-hide controls
    hideControls: true,

    // Global keyboard shortcuts
    keyboard: { focused: false, global: true },

    // Seek time in seconds
    seekTime: 5,

    // Quality options
    quality: {
        default: 1080,
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240, 144]
    },

    // Controls layout - volume on LEFT side (mute, volume before captions)
    controls: [
        'play-large',    // Large play button in center
        'restart',       // Restart playback
        'rewind',        // Rewind by seekTime
        'play',          // Play/pause
        'fast-forward',  // Fast forward by seekTime
        'progress',      // Progress bar
        'current-time',  // Current time display
        'duration',      // Duration display
        'mute',          // Mute toggle
        'volume',        // Volume slider (LEFT side - after mute)
        'captions',      // Captions toggle
        'settings',      // Settings menu
        'pip',           // Picture-in-picture
        'airplay',       // AirPlay (Safari)
        'download',      // Download button
        'fullscreen',    // Fullscreen toggle
    ],

    // English i18n
    i18n: {
        restart: 'Restart',
        rewind: 'Rewind {seektime}s',
        play: 'Play',
        pause: 'Pause',
        fastForward: 'Forward {seektime}s',
        seek: 'Seek',
        seekLabel: '{currentTime} of {duration}',
        played: 'Played',
        buffered: 'Buffered',
        currentTime: 'Current time',
        duration: 'Duration',
        volume: 'Volume',
        mute: 'Mute',
        unmute: 'Unmute',
        enableCaptions: 'Enable captions',
        disableCaptions: 'Disable captions',
        download: 'Download',
        enterFullscreen: 'Enter fullscreen',
        exitFullscreen: 'Exit fullscreen',
        frameTitle: 'Player for {title}',
        captions: 'Captions',
        settings: 'Settings',
        menuBack: 'Go back to previous menu',
        speed: 'Speed',
        normal: 'Normal',
        quality: 'Quality',
        loop: 'Loop',
        start: 'Start',
        end: 'End',
        all: 'All',
        reset: 'Reset',
        disabled: 'Disabled',
        enabled: 'Enabled',
        advertisement: 'Ad',
        qualityBadge: {
            4320: '8K',
            2880: '5K',
            2160: '4K',
            1440: 'QHD',
            1080: 'FHD',
            720: 'HD',
            576: 'SD',
            480: 'SD',
            360: 'SD',
        },
    },
};

/**
 * Video source configuration (ORIGINAL - commented out)
 * 4K 60FPS anime opening from HuggingFace
 */
// export const demoVideoSource = {
//     type: 'video' as const,
//     sources: [
//         {
//             src: 'https://huggingface.co/MattyMroz/ANIME/resolve/main/Spare%20Me%2C%20Great%20Lord!%20-%20Opening%204K%2060FPS.mkv?raw=true',
//             type: 'video/mp4',
//             size: 2160,
//         },
//     ],
//     poster: '/assets/demo/spare-me-great-lord.gif',
// };

/**
 * Video source configuration - Example with standard MP4
 */
export const demoVideoSource = {
    type: 'video' as const,
    sources: [
        {
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'video/mp4',
            size: 1080,
        },
    ],
    poster: '/assets/demo/spare-me-great-lord.gif',
};
