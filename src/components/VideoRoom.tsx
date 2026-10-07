"use client";

import { useEffect, useRef } from "react";

const VideoRoomPage = ({ roomId }: { roomId: string }) => {
  const zpRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let zp: any = null;

    const start = async () => {
      try {
        const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
        const serverSecret =
          process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

        if (!appId || !serverSecret || !roomId) {
          console.error(
            "ZegoCloud App ID, Server Secret, or Room ID is missing"
          );
          return;
        }

        const { ZegoUIKitPrebuilt } = await import(
          "@zegocloud/zego-uikit-prebuilt"
        );

        // Prevent initialization after the effect is cleaned up
        if (cancelled || !containerRef.current) return;

        const userId = crypto.randomUUID();

        const kitToken =
          ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret,
            roomId,
            userId,
            "stranger"
          );

        if (cancelled || !containerRef.current) return;

        const instance = ZegoUIKitPrebuilt.create(kitToken);

        zp = instance;
        zpRef.current = instance;

        instance.joinRoom({
          container: containerRef.current,

          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },

          showPreJoinView: false,
          showTextChat: true,
          maxUsers: 2,

          turnOnCameraWhenJoining: true,
          turnOnMicrophoneWhenJoining: true,

          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,

          // Keep the bottom controls visible
          autoHideFooter: false,

          // Show audio/video settings button
          showAudioVideoSettingsButton: true,

          // Show more options button
          showMoreButton: true,
        });
      } catch (error) {
        if (!cancelled) {
          console.error("ZegoCloud initialization error:", error);
        }
      }
    };

    start();

    return () => {
      cancelled = true;

      if (zp) {
        zp.destroy();
        zp = null;
      }

      zpRef.current = null;
    };
  }, [roomId]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full min-h-0"
      style={{ minHeight: 0 }}
    />
  );
};

export default VideoRoomPage;