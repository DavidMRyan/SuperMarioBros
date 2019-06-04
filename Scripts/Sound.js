let currentSong = null;

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
        currentSong = music;
        if(loop) music.loop = true;
    }

    /**
     * Stops the currently playing music for the level
     */
    static StopMusic() { currentSong.pause(); }

    /**
     * Plays a sound effect specified by the parameter
     * @param effect - The sound effect to be played
     */
    static PlayFX(effect)
    {
        let fx = new Audio(`Assets/Sound/Global/${effect}.wav`);
        fx.play();
    }
}