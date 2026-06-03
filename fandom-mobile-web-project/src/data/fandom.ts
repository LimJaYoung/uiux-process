export type MessageStatus = "sending" | "sent" | "read" | "failed";

export interface Member {
  id: string;
  name: string;
  role: string;
  aura: string;
  color: string;
  stat: string;
}

export interface FeedPost {
  id: string;
  author: string;
  body: string;
  tag: string;
  cheers: number;
  imageTone: string;
}

export interface VotePollData {
  id: string;
  title: string;
  options: Array<{ id: string; label: string; percent: number }>;
  selectedOptionId?: string;
}

export interface LiveSchedule {
  id: string;
  title: string;
  time: string;
  state: "live" | "soon" | "scheduled";
  notified: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  unread: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "me" | "artist" | "fan" | "system";
  body: string;
  time: string;
  status?: MessageStatus;
  kind: "text" | "image" | "emoji" | "badge" | "system";
}

export interface ChatRoomData {
  id: string;
  name: string;
  avatar: string;
  isLive: boolean;
  unreadCount: number;
  messages: ChatMessage[];
}

export const members: Member[] = [
  { id: "luna", name: "LUNA", role: "Vocal / Moon Lead", aura: "calm signal", color: "#9BE7FF", stat: "2.4M cheers" },
  { id: "nari", name: "NARI", role: "Dance / Prism Core", aura: "fast orbit", color: "#E9FF6A", stat: "1.8M cheers" },
  { id: "sera", name: "SERA", role: "Rap / Solar Pulse", aura: "bold flare", color: "#FF7AB8", stat: "2.1M cheers" },
  { id: "io", name: "IO", role: "Visual / Starlight", aura: "soft glow", color: "#BDA8FF", stat: "1.6M cheers" }
];

export const feedPosts: FeedPost[] = [
  { id: "f1", author: "orbit.mina", body: "LUNA teaser color is unreal. The blue flare feels like the whole comeback concept.", tag: "teaser", cheers: 1248, imageTone: "blue" },
  { id: "f2", author: "sera.zip", body: "Vote reminder: Solar Pulse mission closes in 12 minutes. We can still flip the ranking.", tag: "vote", cheers: 836, imageTone: "pink" },
  { id: "f3", author: "nari.loop", body: "Tonight live chat room opens 20 minutes early. Bring your lightstick emoji.", tag: "live", cheers: 1642, imageTone: "lime" }
];

export const initialPoll: VotePollData = {
  id: "v1",
  title: "오늘 라이브 오프닝 응원 문구",
  options: [
    { id: "o1", label: "Orbit lights the night", percent: 42 },
    { id: "o2", label: "AURORA begins here", percent: 35 },
    { id: "o3", label: "Stay in our orbit", percent: 23 }
  ]
};

export const lives: LiveSchedule[] = [
  { id: "l1", title: "Comeback Countdown Live", time: "오늘 20:30", state: "soon", notified: false },
  { id: "l2", title: "Backstage Voice Room", time: "오늘 21:10", state: "scheduled", notified: true },
  { id: "l3", title: "Afterglow Mini Talk", time: "내일 19:00", state: "scheduled", notified: false }
];

export const notifications: NotificationItem[] = [
  { id: "n1", title: "Vote result update", body: "오프닝 문구 1위가 3분 전 바뀌었어요.", unread: true },
  { id: "n2", title: "Live room opened", body: "Countdown Live 채팅방이 열렸습니다.", unread: true },
  { id: "n3", title: "Badge unlocked", body: "7일 연속 응원 배지를 획득했어요.", unread: false }
];

export const chatRoom: ChatRoomData = {
  id: "c1",
  name: "Countdown Orbit Room",
  avatar: "CO",
  isLive: true,
  unreadCount: 8,
  messages: [
    { id: "m1", sender: "system", body: "운영 안내: 서로를 존중하며 응원 메시지를 남겨주세요.", time: "20:01", kind: "system" },
    { id: "m2", sender: "fan", body: "티저 보고 바로 들어왔어요. 오늘 색감 미쳤다.", time: "20:03", kind: "text" },
    { id: "m3", sender: "artist", body: "Orbit, we see your lights already ✦", time: "20:04", kind: "badge" },
    { id: "m4", sender: "me", body: "오프닝 투표도 완료. 라이브 시작 전에 다 모이자!", time: "20:05", status: "read", kind: "text" }
  ]
};

