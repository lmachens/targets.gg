"use client";

import dynamic from "next/dynamic";
const Whiteboard = dynamic(() => import("components/editor/Whiteboard"), {
  ssr: false,
});

export default function Client() {
  return <Whiteboard />;
}
