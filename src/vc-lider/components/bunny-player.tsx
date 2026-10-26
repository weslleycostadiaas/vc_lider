import { useEffect, useRef, useState } from "react";
import { Button } from "@/vc-lider/components/button";

/** Official Bunny Stream player.js (playerjs spec) — loaded lazily, once. */
const PLAYERJS_SRC = "https://assets.mediadelivery.net/playerjs/playerjs-latest.min.js";
type PlayerJs = {
  on: (e: string, cb: (v?: { seconds?: number }) => void) => void;
  play: () => void;
  pause?: () => void;
  mute?: () => void;
  unmute?: () => void;
  setVolume?: (v: number) => void;
};
type PlayerJsCtor = new (el: HTMLIFrameElement) => PlayerJs;
let loader: Promise<PlayerJsCtor | null> | null = null;

export function preloadBunnyApi(): Promise<PlayerJsCtor | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  const w = window as unknown as { playerjs?: { Player: PlayerJsCtor } };
  if (w.playerjs) return Promise.resolve(w.playerjs.Player);
  loader ??= new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = PLAYERJS_SRC;
    s.async = true;
    s.onload = () => resolve(w.playerjs?.Player ?? null);
    s.onerror = () => {
      loader = null;
      resolve(null);
    };
    document.head.appendChild(s);
  });
  return loader;
}

export type BunnyController = {
  play: (origin?: "manual" | "auto") => void;
  pause: () => void;
  unmute: () => void;
};

type Props = {
  src: string;
  title: string;
  cover?: string;
  coverAlt?: string;
  fallbackMs?: number;
  /** When false, never auto-plays on ready (pre-warmed players started later via controller). */
  autoPlay?: boolean;
  /** Undefined keeps legacy behavior; true/false drives play/pause from visibility. */
  active?: boolean;
  onController?: (controller: BunnyController | null) => void;
  /** Fires when the user pauses through the player's own controls (not our programmatic pauses). */
  onUserPause?: () => void;
  /** Native play can clear a previous manual pause without changing visibility. */
  onUserPlay?: () => void;
  /** VSL keeps its approved, clickable cover if audible autoplay is blocked. */
  retryCover?: boolean;
  /** Opt-in (VSL only): autoplay muted and show a discreet one-tap "Ativar som" control. */
  mutedAutoplay?: boolean;
};

/** Mounts the Bunny iframe and keeps our own art on top until real playback starts. */
export function BunnyPlayer({
  src,
  title,
  cover,
  fallbackMs = 3500,
  autoPlay = true,
  active,
  onController,
  onUserPause,
  onUserPlay,
  retryCover = false,
  mutedAutoplay = false,
}: Props) {
  const ref = useRef<HTMLIFrameElement>(null);
  const controllerRef = useRef<BunnyController | null>(null);
  const activeRef = useRef(active);
  const [started, setStarted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [soundOn, setSoundOn] = useState(!mutedAutoplay);
  const soundRef = useRef(!mutedAutoplay);
  const enableSound = () => {
    soundRef.current = true;
    setSoundOn(true);
    controllerRef.current?.unmute();
    controllerRef.current?.play();
  };
  const callbacks = useRef({ onController, onUserPause, onUserPlay });
  callbacks.current = { onController, onUserPause, onUserPlay };
  activeRef.current = active;

  useEffect(() => {
    let disposed = false;
    let ready = false;
    let playing = false;
    let hasPlayed = false;
    let pendingPause = false;
    let pendingPlay = false;
    let manuallyPaused = false;
    let wantsPlay = autoPlay && activeRef.current !== false;
    let p: PlayerJs | null = null;
    let audioOn = soundRef.current;
    const audio = () => {
      try {
        p?.unmute?.();
        p?.setVolume?.(100);
      } catch {
        /* unavailable */
      }
    };
    const play = (origin: "manual" | "auto" = "manual") => {
      if (origin === "auto" && manuallyPaused) return;
      if (origin === "manual") manuallyPaused = false;
      wantsPlay = true;
      if (
        !ready ||
        disposed ||
        activeRef.current === false ||
        document.hidden ||
        (playing && origin === "auto") ||
        pendingPause
      )
        return;
      // Only initialize sound before first playback; never overwrite later native volume changes.
      if (!hasPlayed && soundRef.current) audio();
      else if (!hasPlayed && !soundRef.current) {
        try {
          p?.mute?.();
        } catch {
          /* muted via URL */
        }
      }
      pendingPlay = true;
      try {
        p?.play();
      } catch {
        /* keep clickable cover/native controls */
      }
    };
    const pause = () => {
      wantsPlay = false;
      if (!ready || disposed) return;
      if (!playing && !pendingPlay) return;
      if (pendingPause) return;
      pendingPause = true;
      try {
        p?.pause?.();
      } catch {
        /* player gone */
      }
    };
    const controller: BunnyController = {
      play,
      pause,
      unmute: () => {
        if (!ready) {
          soundRef.current = true;
          return;
        }
        if (!hasPlayed || !audioOn) {
          audioOn = true;
          audio();
        }
      },
    };
    controllerRef.current = controller;
    callbacks.current.onController?.(controller);
    const reveal = () => {
      if (disposed) return;
      hasPlayed = true;
      setStarted(true);
      window.clearTimeout(timer);
    };
    // Timeout is not playback evidence: VSL retains its cover; modal exposes native controls.
    const timer = window.setTimeout(() => {
      if (!disposed) setTimedOut(true);
    }, fallbackMs);
    void preloadBunnyApi().then((Ctor) => {
      const el = ref.current;
      if (!Ctor || !el || disposed) return;
      try {
        p = new Ctor(el);
        p.on("ready", () => {
          if (disposed) return;
          ready = true;
          if (wantsPlay && activeRef.current !== false && !document.hidden) play("auto");
          else pause();
        });
        p.on("play", () => {
          if (disposed) return;
          const nativePlay = !pendingPlay;
          pendingPlay = false;
          playing = true;
          // Visibility is a safety gate; an old manual-pause intent is not.
          if (activeRef.current === false || document.hidden) {
            pause();
            return;
          }
          manuallyPaused = false;
          wantsPlay = true;
          if (nativePlay) callbacks.current.onUserPlay?.();
          reveal();
        });
        p.on("pause", () => {
          if (disposed) return;
          playing = false;
          pendingPlay = false;
          if (pendingPause) {
            pendingPause = false;
            // A delayed pause acknowledgment may arrive after visibility/play resumes.
            if (wantsPlay && activeRef.current !== false && !document.hidden) play("auto");
            return;
          }
          if (hasPlayed) {
            manuallyPaused = true;
            wantsPlay = false;
            callbacks.current.onUserPause?.();
          }
        });
        // timeupdate at 0s is not progress; only reveal once time actually advances.
        p.on("timeupdate", (v) => {
          if ((v?.seconds ?? 0) > 0) reveal();
        });
      } catch {
        /* timeout leaves an accessible retry/native fallback */
      }
    });
    return () => {
      disposed = true;
      window.clearTimeout(timer);
      controllerRef.current = null;
      callbacks.current.onController?.(null);
    };
  }, [fallbackMs, autoPlay]);

  // Visibility-driven play/pause (only when `active` is provided).
  useEffect(() => {
    if (active === undefined) return;
    if (active) controllerRef.current?.play("auto");
    else controllerRef.current?.pause();
  }, [active]);

  useEffect(() => {
    const sync = () => {
      if (document.hidden) controllerRef.current?.pause();
      else if (activeRef.current === true) controllerRef.current?.play("auto");
    };
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return (
    <>
      <iframe
        ref={ref}
        src={src}
        title={title}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
      {!started && retryCover && cover ? (
        <Button
          variant="video"
          size="natural"
          className="absolute inset-0"
          aria-label="Assista à Aula — reproduzir vídeo de Juliene Salvan"
          onClick={enableSound}
        >
          <img src={cover} alt="Juliene Salvan — Liderança é técnica. Assista à Aula." />
        </Button>
      ) : (
        !started &&
        !timedOut && (
          <div className="bunny-handoff" aria-hidden="true">
            {cover && <img src={cover} alt="" />}
            <span className="bunny-loader" />
          </div>
        )
      )}
      {mutedAutoplay && started && !soundOn && (
        <button type="button" className="vsl-sound" onClick={enableSound}>
          Ativar som
        </button>
      )}
    </>
  );
}
