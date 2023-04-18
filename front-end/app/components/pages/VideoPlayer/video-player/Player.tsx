import {
    Container,
    Controlls,
    IconPlayBackRate,
    ItemPlaybackRate,
    Loading,
    StandyByInfo,
    VideoPreLoading,
    VolumeControll,
} from './styles';
import {
    FaArrowLeft,
    FaCompress,
    FaExpand,
    FaPause,
    FaPlay,
    FaRedoAlt,
    FaStepForward,
    FaUndoAlt,
    FaVolumeDown,
    FaVolumeMute,
    FaVolumeOff,
    FaVolumeUp,
} from 'react-icons/fa';
import {FiCheck, FiX} from 'react-icons/fi';
import {SyntheticEvent, useEffect, useRef, useState} from "react";
import Link from "next/link";

export interface IProps {
    title: string | undefined;
    subTitle?: string | boolean;
    titleMedia?: string | boolean;
    extraInfoMedia?: string | boolean;
    fullPlayer?: boolean;
    backButton?: () => void;
    src: string;
    autoPlay?: boolean;
    onCanPlay?: () => void;
    onTimeUpdate?: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
    onEnded?: () => void;
    onErrorVideo?: () => void;
    onNextClick?: () => void;
    onClickItemListReproduction?: (id: string | number, playing: boolean) => void;
    onCrossClick?: () => void;
    primaryColor?: string;
    secondaryColor?: string;
    startPosition?: number;
    playbackRateEnable?: boolean;
    fontFamily?: string;
    playbackRateStart?: number;
    playbackRateOptions?: string[];
    autoControllCloseEnabled?: boolean;
    overlayEnabled?: boolean;
    onChangeQuality?: (quality: string | number) => void;
    link: number
}

export const Player = ({
                                               title,
                                               subTitle = false,
                                               titleMedia = false,
                                               extraInfoMedia = false,

                                               fullPlayer = true,
                                               backButton = undefined,

                                               src,
                                               autoPlay = false,

                                               onCanPlay = undefined,
                                               onTimeUpdate = undefined,
                                               onEnded = undefined,
                                               onErrorVideo = undefined,
                                               onNextClick = undefined,
                                               onClickItemListReproduction = undefined,
                                               onCrossClick = () => { },
                                               startPosition = 0,
                                               onChangeQuality = [] as any,
                                               playbackRateEnable = true,
                                               overlayEnabled = true,
                                               autoControllCloseEnabled = true,

                                               // Styles
                                               primaryColor = '#03dffc',
                                               secondaryColor = '#ffffff',
                                               fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",

                                               playbackRateOptions = ['0.25', '0.5', '0.75', 'Normal', '1.25', '1.5', '2'],
                                               playbackRateStart = 1, link
                                           }: // subtitleMedia,
                                               IProps) => {
    // Referências
    const videoComponent = useRef<null | HTMLVideoElement>(null);
    const video = document.querySelector("video");
    const timerRef = useRef<null | NodeJS.Timeout>(null);
    const timerBuffer = useRef<null | NodeJS.Timeout>(null);
    const playerElement = useRef<null | HTMLDivElement>(null);
    const listReproduction = useRef<null | HTMLDivElement>(null);

    // Estados
    const [videoReady, setVideoReady] = useState(false);
    const [playing, setPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [end, setEnd] = useState(false);
    const [controlBackEnd, setControlBackEnd] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [volume, setVolume] = useState(100);
    const [muted, setMuted] = useState(false);
    const [error, setError] = useState(false);
    const [waitingBuffer, setWaitingBuffer] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [playbackRate, setPlaybackRate] = useState<string | number>(playbackRateStart);
    const [started, setStarted] = useState(false);

    const [showControlVolume, setShowControlVolume] = useState(false);
    const [showQuality, setShowQuality] = useState(false);
    const [showDataNext, setShowDataNext] = useState(false);
    const [showPlaybackRate, setShowPlaybackRate] = useState(false);
    const [showReproductionList, setShowReproductionList] = useState(false);


    // const [, setActualBuffer] = useState({
    //   index: 0,
    //   start: 0,
    //   end: 0,
    //   endBuffer: 0,
    // });

    const secondsToHms = (d: number) => {
        d = Number(d);
        const h = Math.floor(d / 3600);
        const m = Math.floor((d % 3600) / 60);
        let s = Math.floor((d % 3600) % 60);
        let seconds = s.toString();

        if (s < 10) {
            seconds = `0${s}`;
        }

        if (h) {
            return `${h}:${m}:${seconds}`;
        }

        return `${m}:${seconds}`;
    };

    const timeUpdate = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
        setShowInfo(false);
        setEnd(false);
        if (playing) {
            setPlaying(true);
        }

        if (waitingBuffer) {
            setWaitingBuffer(false);
        }

        if (timerBuffer.current) {
            clearTimeout(timerBuffer.current);
        }

        timerBuffer.current = setTimeout(() => setWaitingBuffer(true), 1000);

        if (onTimeUpdate) {
            onTimeUpdate(e);
        }

        let choseBuffer = 0;

        const target = e.target as HTMLVideoElement;

        const lenghtBuffer = target.buffered.length;
        let start = 0;
        let endBuffer = 0;
        const atualTime = target.currentTime;

        for (let i = 1; i <= lenghtBuffer; i++) {
            const startCheck = target.buffered.start(i - 1);
            const endCheck = target.buffered.end(i - 1);

            if (endCheck > atualTime && atualTime > startCheck) {
                choseBuffer = i;

                if (endCheck > endBuffer) {
                    endBuffer = endCheck;
                }

                if (startCheck < start) {
                    start = startCheck;
                }
            }
        }

        // setActualBuffer({
        //   index: choseBuffer,
        //   start,
        //   endBuffer,
        // });

        setProgress(target.currentTime);
    };

    const goToPosition = (position: number) => {
        if (videoComponent.current) {
            videoComponent.current.currentTime = position;
            setProgress(position);
        }
    };

    const play = () => {
        if (videoComponent.current) {
            setPlaying(!playing);

            if (videoComponent.current.paused) {
                videoComponent.current.play();
                return;
            }

            videoComponent.current.pause();
        }
    };

    const onEndedFunction = () => {
        if (videoComponent.current) {
            if (+startPosition === +videoComponent.current.duration && !controlBackEnd) {
                setControlBackEnd(true);
                videoComponent.current.currentTime = videoComponent.current.duration - 15;
                if (autoPlay) {
                    setPlaying(true);
                    videoComponent.current.play();
                } else {
                    setPlaying(false);
                }
            } else {
                setEnd(true);
                setPlaying(false);

                if (onEnded) {
                    onEnded();
                }
            }
        }
    };

    const nextSeconds = (seconds: number) => {
        if (videoComponent.current) {
            const current = videoComponent.current.currentTime;
            const total = videoComponent.current.duration;

            if (current + seconds >= total - 2) {
                videoComponent.current.currentTime = videoComponent.current.duration - 1;
                setProgress(videoComponent.current.duration - 1);
                return;
            }

            videoComponent.current.currentTime += seconds;
            setProgress(videoComponent.current.currentTime + seconds);
        }
    };

    const previousSeconds = (seconds: number) => {
        if (videoComponent.current) {
            const current = videoComponent.current.currentTime;

            if (current - seconds <= 0) {
                videoComponent.current.currentTime = 0;
                setProgress(0);
                return;
            }

            videoComponent.current.currentTime -= seconds;
            setProgress(videoComponent.current.currentTime - seconds);
        }
    };

    const startVideo = () => {
        if (videoComponent.current) {
            try {
                setDuration(videoComponent.current.duration);
                setVideoReady(true);

                if (!started) {
                    setStarted(true);
                    setPlaying(false);

                    if (autoPlay) {
                        videoComponent.current.play();
                        setPlaying(!videoComponent.current.paused);
                    }
                }

                if (onCanPlay) {
                    onCanPlay();
                }
            } catch (err) {
                setPlaying(false);
            }
        }
    };

    const erroVideo = () => {
        if (onErrorVideo) {
            onErrorVideo();
        }
    };

    const setMuttedAction = (value: boolean) => {
        if (videoComponent.current) {
            setMuted(value);
            setShowControlVolume(false);
            videoComponent.current.muted = value;
        }
    };

    const setVolumeAction = (value: number) => {
        if (videoComponent.current) {
            setVolume(value);
            videoComponent.current.volume = value / 100;
        }
    };

    const exitFullScreen = () => {
        if (
            document.fullscreenElement
        ) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }

            setFullScreen(false);
        }
    };

    const enterFullScreen = () => {
        if (playerElement.current) {
            setShowInfo(true);
            if (playerElement.current.requestFullscreen) {
                playerElement.current.requestFullscreen();
                setFullScreen(true);
            }
        }
    };

    const chooseFullScreen = () => {
        if (playerElement.current) {
            if (
                document.fullscreenElement
            ) {
                document.exitFullscreen();
                return;
            }

            setShowInfo(true);

            if (playerElement.current.requestFullscreen) {
                playerElement.current.requestFullscreen();
            }
            setFullScreen(true);
        }
    };

    const setStateFullScreen = () => {
        if (
            !document.fullscreenElement
        ) {
            setFullScreen(false);
            return;
        }

        setFullScreen(true);
    };

    const controllScreenTimeOut = () => {
        if (!autoControllCloseEnabled) {
            setShowInfo(true);
            return;
        }

        setShowControls(false);
        if (!playing) {
            setShowInfo(true);
        }
    };

    const hoverScreen = () => {
        setShowControls(true);
        setShowInfo(false);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(controllScreenTimeOut, 2000);
    };

    const getKeyBoardInteration = (e: KeyboardEvent) => {
        if (e.key === ' ' && videoComponent?.current?.paused) {
            if (videoComponent.current.paused) {
                setPlaying(true);
                hoverScreen();
            } else {
                videoComponent.current.pause();
                setPlaying(false);
                hoverScreen();
            }
        }
        else if(e.key === 'f' && video){
            enterFullScreen();
            hoverScreen();
        }
    };

    const scrollToSelected = () => {
        const element = listReproduction.current;
        if (element) {
            const selected = element.getElementsByClassName('selected')[0] as HTMLElement;
            const position = selected.offsetTop;
            const height = selected.offsetHeight;
            element.scrollTop = position - height * 2;
        }
    };

    const onChangePlayBackRate = (value: string | number) => {
        if (videoComponent.current) {
            const speed = value === 'Normal' ? 1 : +value;
            videoComponent.current.playbackRate = speed;
            setPlaybackRate(speed);
        }
    };

    useEffect(() => {
        if (showReproductionList) {
            scrollToSelected();
        }
    }, [showReproductionList]);

    useEffect(() => {
        if (src && videoComponent.current) {
            videoComponent.current.currentTime = startPosition;
            setProgress(0);
            setDuration(0);
            setVideoReady(false);
            setError(false);
            setShowReproductionList(false);
            setShowDataNext(false);
            // setActualBuffer({
            //   index: 0,
            //   start: 0,
            //   end: 0,
            //   endBuffer: 0,
            // });
            setPlaying(autoPlay);
        }
    }, [src]);

    useEffect(() => {

        video && video.addEventListener('keydown', getKeyBoardInteration);
        playerElement.current && playerElement.current.addEventListener('fullscreenchange', setStateFullScreen, false);
    }, []);

    // When changes happen in fullscreen document, teh state of fullscreen is changed
    useEffect(() => {
        setStateFullScreen();
    }, [document.fullscreenElement]);

    function renderLoading() {
        return (
            <Loading color={primaryColor}>
                <div>
                    <div />
                    <div />
                    <div />
                </div>
            </Loading>
        );
    }

    function renderInfoVideo() {
        return (
            <StandyByInfo
                primaryColor={primaryColor}
                secundaryColor={secondaryColor}
                show={showInfo && videoReady && !playing}
            >
                {(title || subTitle) && (
                    <section className="center">
                        <h1 className="title"><img src={title} alt={title}/></h1>
                        <h2 className="sub-title">{subTitle}</h2>
                    </section>
                )}
            </StandyByInfo>
        );
    }

    function renderCloseVideo() {
        return (
            <VideoPreLoading
                backgroundColorHoverButtonError="#f78b28"
                colorHoverButtonError="#ddd"
                colorButtonError="#ddd"
                backgroundColorButtonError="#333"
                colorTitle="#fff"
                colorSubTitle="#fff"
                colorIcon="#fff"
                show={!videoReady || (videoReady && error)}
                showError={error}
            >
                {(title || subTitle) && (
                    <header>
                        <div>
                            <h1></h1>
                            <h2>{subTitle}</h2>
                        </div>
                        <Link href={`/v/${link}`}>
                        <FiX />
                        </Link>
                    </header>
                )}
                
            </VideoPreLoading>
        );
    }

    return (
        <Container
            onMouseMove={hoverScreen}
            ref={playerElement}
            onDoubleClick={chooseFullScreen}
            fullPlayer={fullPlayer}
            hideVideo={error}
            fontFamily={fontFamily}
        >
            {(!videoReady || (waitingBuffer && playing)) && !error && !end && renderLoading()}

            {!!overlayEnabled && renderInfoVideo()}

            {renderCloseVideo()}

            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                ref={videoComponent}
                src={src}
                controls={false}
                onCanPlay={() => startVideo()}
                onTimeUpdate={timeUpdate}
                onError={erroVideo}
                onEnded={onEndedFunction}
                preload='metadata'
            />
            {/* <track label="English" kind="subtitles" srcLang="en" src={subtitleMedia} default /> */}

            <Controlls
                show={showControls && videoReady && !error}
                primaryColor={primaryColor}
                progressVideo={(progress * 100) / duration}
            >
                {backButton && (
                    <div className="back">
                        <div onClick={backButton} style={{ cursor: 'pointer' }}>
                            <FaArrowLeft />
                        </div>
                    </div>
                )}

                {!showControlVolume && !showQuality && !showDataNext && !showReproductionList && (
                    <div className="line-reproduction">
                        <input
                            type="range"
                            value={progress}
                            className="progress-bar"
                            max={duration}
                            onChange={e => goToPosition(+e.target.value)}
                            title=""
                            style={
                                {
                                    // background: `linear-gradient(93deg, rgba(247,139,40,1) ${
                                    //   (progress * 100) / duration
                                    // }%, blue ${
                                    //   (progress * 100) / duration
                                    // }%, blue ${
                                    //   (atualBuffer.end * 100) / duration
                                    // }%, red ${
                                    //   (atualBuffer.end * 100) / duration
                                    // }%)`,
                                }
                            }
                        />
                        <span>{secondsToHms(duration - progress)}</span>
                    </div>
                )}

                {videoReady && (
                    <div className="controlls">
                        <div className="start">
                            <div className="item-control">
                                {!playing && <FaPlay onClick={play} />}
                                {playing && <FaPause onClick={play} />}
                            </div>

                            <div className="item-control">
                                <FaUndoAlt onClick={() => previousSeconds(15)} />
                            </div>

                            <div className="item-control">
                                <FaRedoAlt onClick={() => nextSeconds(15)} />
                            </div>

                            {!muted && (
                                <VolumeControll
                                    onMouseLeave={() => setShowControlVolume(false)}
                                    className="item-control"
                                    primaryColor={primaryColor}
                                    percentVolume={volume}
                                >
                                    {showControlVolume && (
                                        <div className="volumn-controll">
                                            <div className="box-connector" />
                                            <div className="box">
                                                <input
                                                    type="range"
                                                    min={0}
                                                    max={100}
                                                    step={0.01}
                                                    value={volume}
                                                    onChange={e => setVolumeAction(+e.target.value)}
                                                    title=""
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {volume >= 60 && (
                                        <FaVolumeUp onMouseEnter={() => setShowControlVolume(true)} onClick={() => setMuttedAction(true)} />
                                    )}

                                    {volume < 60 && volume >= 10 && (
                                        <FaVolumeDown
                                            onMouseEnter={() => setShowControlVolume(true)}
                                            onClick={() => setMuttedAction(true)}
                                        />
                                    )}

                                    {volume < 10 && volume > 0 && (
                                        <FaVolumeOff
                                            onMouseEnter={() => setShowControlVolume(true)}
                                            onClick={() => setMuttedAction(true)}
                                        />
                                    )}

                                    {volume <= 0 && (
                                        <FaVolumeMute onMouseEnter={() => setShowControlVolume(true)} onClick={() => setVolumeAction(0)} />
                                    )}
                                </VolumeControll>
                            )}

                            {muted && (
                                <div className="item-control">
                                    <FaVolumeMute onClick={() => setMuttedAction(false)} />
                                </div>
                            )}

                            <div className="item-control info-video">
                                <span className="info-first">{titleMedia}</span>
                                <span className="info-secund">{extraInfoMedia}</span>
                            </div>
                        </div>

                        <div className="end">
                            {!!playbackRateEnable && (
                                <div className="item-control" onMouseLeave={() => setShowPlaybackRate(false)}>
                                    {showPlaybackRate && (
                                        <ItemPlaybackRate>
                                            <div>
                                                {playbackRateOptions.map((item, index) => (
                                                    <div key={index} className="item" onClick={() => onChangePlayBackRate(item)}>
                                                        {(+item === +playbackRate || (item === 'Normal' && +playbackRate === 1)) && FiCheck({})}
                                                        <div className="bold">{item === 'Normal' ? item : `${item}x`}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="box-connector" />
                                        </ItemPlaybackRate>
                                    )}

                                    <IconPlayBackRate className="playbackRate" onMouseEnter={() => setShowPlaybackRate(true)}>
                    <span>
                      {playbackRate === 'Normal' ? '1' : `${playbackRate}`}
                        <small>x</small>
                    </span>
                                    </IconPlayBackRate>
                                </div>
                            )}

                            {onNextClick && (
                                <div className="item-control" onMouseLeave={() => setShowDataNext(false)}>

                                    <FaStepForward onClick={onNextClick} onMouseEnter={() => setShowDataNext(true)} />
                                </div>
                            )}

                            <div className="item-control">
                                {!fullScreen && <FaExpand onClick={enterFullScreen} />}
                                {fullScreen && <FaCompress onClick={exitFullScreen} />}
                            </div>
                        </div>
                    </div>
                )}
            </Controlls>
        </Container>
    );
}