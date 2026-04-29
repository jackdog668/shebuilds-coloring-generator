import type { ColoringPageState } from "./types";

export interface Preset {
  id: string;
  name: string;
  state: ColoringPageState;
}

export const PRESETS: Preset[] = [
  {
    id: "rose-room",
    name: "Rose Room",
    state: {
      style: "florals",
      motif: "rose bouquet with vines",
      lineWeight: "medium",
      complexity: "intermediate",
      pageSize: "kdp-8.5x11",
      hasFrame: true,
      seed: 1234,
    },
  },
  {
    id: "moon-mandala",
    name: "Moon Mandala",
    state: {
      style: "mandala",
      motif: "celestial moon and stars",
      lineWeight: "fine",
      complexity: "advanced",
      pageSize: "kdp-8.5x11",
      hasFrame: false,
      seed: 808,
    },
  },
  {
    id: "tiny-foxes",
    name: "Tiny Foxes",
    state: {
      style: "animals-cute",
      motif: "sleepy fox curled up",
      lineWeight: "bold",
      complexity: "beginner",
      pageSize: "kdp-8.5x11",
      hasFrame: true,
      seed: 4242,
    },
  },
  {
    id: "honey-cottage",
    name: "Honey Cottage",
    state: {
      style: "cottagecore",
      motif: "cottage with garden gate",
      lineWeight: "medium",
      complexity: "intermediate",
      pageSize: "kdp-8.5x11",
      hasFrame: true,
      seed: 2412,
    },
  },
  {
    id: "tessellation",
    name: "Tessellation",
    state: {
      style: "geometric",
      motif: "tessellating hexagons",
      lineWeight: "fine",
      complexity: "expert",
      pageSize: "square",
      hasFrame: false,
      seed: 909,
    },
  },
  {
    id: "fae-court",
    name: "Fae Court",
    state: {
      style: "fairy-tale",
      motif: "fairy with butterfly wings",
      lineWeight: "mixed",
      complexity: "advanced",
      pageSize: "kdp-8.5x11",
      hasFrame: true,
      seed: 808,
    },
  },
  {
    id: "study-desk",
    name: "Study Desk",
    state: {
      style: "doodle",
      motif: "study desk doodles",
      lineWeight: "medium",
      complexity: "intermediate",
      pageSize: "us-letter",
      hasFrame: false,
      seed: 7321,
    },
  },
  {
    id: "kawaii-friends",
    name: "Kawaii Friends",
    state: {
      style: "kawaii-faces",
      motif: "rainbow with face",
      lineWeight: "bold",
      complexity: "beginner",
      pageSize: "square",
      hasFrame: false,
      seed: 1212,
    },
  },
];
