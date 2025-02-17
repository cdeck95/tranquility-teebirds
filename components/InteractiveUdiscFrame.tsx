"use client";

// InteractiveUdiscFrame: Embeds the UDisc course page in an iframe.
export default function InteractiveUdiscFrame() {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0, minHeight: "650px" }}
        src="https://udisc.com/courses/tranquility-trails-dgc-2GZr"
        allowFullScreen
      />
    </div>
  );
}
