isPlaying = {sound: null, bool: false};

class Sound
{
    /**
     * Plays the music for the specified level, with an optional loop after the sound file ends.
     * @param level - The level of the music to be played
     * @param loop - Whether or not to loop after the music finishes
     */
    static PlayMusic(level, loop)
    {
        let music = new Audio(`Assets/Sound/${level}/${level}.mp3`);
        music.play();
        isPlaying.music = music;
        isPlaying.bool = true;
        if(loop) music.loop = true;
    }

    /**
     * Stops the currently playing music for the level
     */
    static StopMusic() {if(isPlaying.bool) isPlaying.music.pause(); }
}