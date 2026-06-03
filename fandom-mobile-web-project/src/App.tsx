import { useMemo, useState } from "react";
import { chatRoom, feedPosts, initialPoll, lives, members, notifications, type ChatMessage } from "./data/fandom";

type Tab = "home" | "members" | "feed" | "vote" | "live" | "chat" | "my";

const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: "home", label: "Home", icon: "✦" },
  { id: "members", label: "Members", icon: "◐" },
  { id: "feed", label: "Feed", icon: "◫" },
  { id: "vote", label: "Vote", icon: "◉" },
  { id: "chat", label: "Chat", icon: "✉" },
  { id: "my", label: "My", icon: "◇" }
];

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedVote, setSelectedVote] = useState<string | undefined>(initialPoll.selectedOptionId);
  const [likedPosts, setLikedPosts] = useState<string[]>(["f3"]);
  const [liveStates, setLiveStates] = useState(lives);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(chatRoom.messages);

  const votedPoll = useMemo(() => {
    if (!selectedVote) return initialPoll;
    return {
      ...initialPoll,
      selectedOptionId: selectedVote,
      options: initialPoll.options.map((option) => ({
        ...option,
        percent: option.id === selectedVote ? Math.min(option.percent + 8, 78) : Math.max(option.percent - 3, 12)
      }))
    };
  }, [selectedVote]);

  const sendMessage = () => {
    const body = draft.trim();
    if (!body) return;
    setMessages((items) => [
      ...items,
      {
        id: `m-${Date.now()}`,
        sender: "me",
        body,
        time: "now",
        status: "sent",
        kind: "text"
      }
    ]);
    setDraft("");
  };

  return (
    <main className="min-h-screen bg-[#060711] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col overflow-hidden bg-[#090A18] shadow-2xl shadow-black/40">
        <AppHeader />
        <section className="flex-1 overflow-y-auto px-4 pb-28 pt-3">
          {activeTab === "home" && (
            <HomeScreen
              setActiveTab={setActiveTab}
              selectedVote={selectedVote}
              setSelectedVote={setSelectedVote}
              liveStates={liveStates}
              setLiveStates={setLiveStates}
            />
          )}
          {activeTab === "members" && <MembersScreen />}
          {activeTab === "feed" && <FeedScreen likedPosts={likedPosts} setLikedPosts={setLikedPosts} />}
          {activeTab === "vote" && <VoteScreen poll={votedPoll} selectedVote={selectedVote} setSelectedVote={setSelectedVote} />}
          {activeTab === "live" && <LiveScreen liveStates={liveStates} setLiveStates={setLiveStates} />}
          {activeTab === "chat" && <ChatScreen messages={messages} draft={draft} setDraft={setDraft} sendMessage={sendMessage} />}
          {activeTab === "my" && <MyScreen />}
        </section>
        <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </main>
  );
}

function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#090A18]/90 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#9BE7FF]">AURORA:NE</p>
          <h1 className="text-xl font-black tracking-tight">Fan Orbit</h1>
        </div>
        <div className="rounded-full border border-[#E9FF6A]/50 bg-[#E9FF6A]/10 px-3 py-1 text-xs font-bold text-[#E9FF6A]">LIVE 20:30</div>
      </div>
    </header>
  );
}

function HomeScreen(props: {
  setActiveTab: (tab: Tab) => void;
  selectedVote?: string;
  setSelectedVote: (id: string) => void;
  liveStates: typeof lives;
  setLiveStates: (items: typeof lives) => void;
}) {
  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_20%_10%,#9BE7FF55,transparent_35%),radial-gradient(circle_at_85%_20%,#FF7AB855,transparent_28%),linear-gradient(145deg,#15173A,#080913)] p-5">
        <div className="absolute right-4 top-4 h-20 w-20 rounded-full border border-white/20 bg-white/10 blur-sm" />
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#E9FF6A]">Tonight mission</p>
        <h2 className="mt-4 text-4xl font-black leading-[0.95]">Orbit gathers before the light.</h2>
        <p className="mt-4 max-w-[280px] text-sm leading-6 text-white/72">라이브 전, 같은 마음의 팬들과 먼저 모이고 오늘의 응원을 완성하세요.</p>
        <div className="mt-5 flex gap-2">
          <button className="rounded-full bg-[#E9FF6A] px-4 py-3 text-sm font-black text-[#080913]" onClick={() => props.setActiveTab("chat")}>채팅방 입장</button>
          <button className="rounded-full border border-white/20 px-4 py-3 text-sm font-bold text-white" onClick={() => props.setActiveTab("vote")}>응원 투표</button>
        </div>
      </section>
      <LivePreview liveStates={props.liveStates} setLiveStates={props.setLiveStates} />
      <VoteScreen poll={initialPoll} selectedVote={props.selectedVote} setSelectedVote={props.setSelectedVote} compact />
      <FeedScreen likedPosts={["f3"]} setLikedPosts={() => undefined} compact />
    </div>
  );
}

function MembersScreen() {
  return (
    <section className="space-y-3">
      <SectionTitle eyebrow="Members" title="4개의 빛, 하나의 궤도" />
      <div className="grid grid-cols-2 gap-3">
        {members.map((member) => (
          <article key={member.id} className="rounded-[24px] border border-white/10 bg-white/[0.06] p-3">
            <div className="flex aspect-square items-end rounded-[22px] p-3" style={{ background: `radial-gradient(circle at 45% 25%, ${member.color}, #161735 62%)` }}>
              <span className="text-3xl font-black text-black/50">{member.name.slice(0, 2)}</span>
            </div>
            <h3 className="mt-3 text-lg font-black">{member.name}</h3>
            <p className="text-xs text-white/60">{member.role}</p>
            <div className="mt-3 flex items-center justify-between rounded-full bg-black/20 px-3 py-2 text-[11px]">
              <span>{member.aura}</span>
              <b style={{ color: member.color }}>{member.stat}</b>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeedScreen({ likedPosts, setLikedPosts, compact = false }: { likedPosts: string[]; setLikedPosts: (ids: string[]) => void; compact?: boolean }) {
  const posts = compact ? feedPosts.slice(0, 2) : feedPosts;
  return (
    <section className="space-y-3">
      <SectionTitle eyebrow="Fan feed" title="지금 올라온 Orbit 반응" />
      {posts.map((post) => {
        const liked = likedPosts.includes(post.id);
        return (
          <article key={post.id} className="rounded-[24px] border border-white/10 bg-white/[0.06] p-4">
            <div className="flex items-center justify-between">
              <b className="text-sm">{post.author}</b>
              <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/70">#{post.tag}</span>
            </div>
            <div className={`mt-3 h-24 rounded-[20px] ${post.imageTone === "blue" ? "bg-[#9BE7FF]" : post.imageTone === "pink" ? "bg-[#FF7AB8]" : "bg-[#E9FF6A]"} opacity-80`} />
            <p className="mt-3 text-sm leading-6 text-white/78">{post.body}</p>
            <button
              className={`mt-3 rounded-full px-3 py-2 text-xs font-black ${liked ? "bg-[#FF7AB8] text-white" : "bg-white/10 text-white/70"}`}
              onClick={() => setLikedPosts(liked ? likedPosts.filter((id) => id !== post.id) : [...likedPosts, post.id])}
            >
              {liked ? "응원 완료" : "응원하기"} · {post.cheers + (liked ? 1 : 0)}
            </button>
          </article>
        );
      })}
    </section>
  );
}

function VoteScreen({ poll, selectedVote, setSelectedVote, compact = false }: { poll: typeof initialPoll; selectedVote?: string; setSelectedVote: (id: string) => void; compact?: boolean }) {
  return (
    <section className="space-y-3">
      <SectionTitle eyebrow="Vote" title={compact ? "오프닝 응원 문구" : poll.title} />
      <article className="rounded-[24px] border border-[#E9FF6A]/20 bg-[#E9FF6A]/[0.07] p-4">
        {poll.options.map((option) => (
          <button key={option.id} className="mb-3 block w-full text-left" onClick={() => setSelectedVote(option.id)}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <b>{option.label}</b>
              <span className={selectedVote === option.id ? "text-[#E9FF6A]" : "text-white/50"}>{option.percent}%</span>
            </div>
            <span className="block h-2 overflow-hidden rounded-full bg-white/10">
              <i className="block h-full rounded-full bg-[#E9FF6A]" style={{ width: `${option.percent}%` }} />
            </span>
          </button>
        ))}
      </article>
    </section>
  );
}

function LivePreview({ liveStates, setLiveStates }: { liveStates: typeof lives; setLiveStates: (items: typeof lives) => void }) {
  return <LiveScreen liveStates={liveStates} setLiveStates={setLiveStates} compact />;
}

function LiveScreen({ liveStates, setLiveStates, compact = false }: { liveStates: typeof lives; setLiveStates: (items: typeof lives) => void; compact?: boolean }) {
  const list = compact ? liveStates.slice(0, 2) : liveStates;
  return (
    <section className="space-y-3">
      <SectionTitle eyebrow="Live" title="오늘의 라이브 일정" />
      {list.map((live) => (
        <article key={live.id} className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#9BE7FF]">{live.state}</p>
            <h3 className="mt-1 font-black">{live.title}</h3>
            <p className="text-sm text-white/55">{live.time}</p>
          </div>
          <button
            className={`rounded-full px-3 py-2 text-xs font-black ${live.notified ? "bg-[#9BE7FF] text-[#061019]" : "bg-white/10 text-white"}`}
            onClick={() => setLiveStates(liveStates.map((item) => (item.id === live.id ? { ...item, notified: !item.notified } : item)))}
          >
            {live.notified ? "알림 ON" : "알림"}
          </button>
        </article>
      ))}
    </section>
  );
}

function ChatScreen({ messages, draft, setDraft, sendMessage }: { messages: ChatMessage[]; draft: string; setDraft: (value: string) => void; sendMessage: () => void }) {
  return (
    <section className="flex min-h-[calc(100vh-160px)] flex-col">
      <div className="mb-3 rounded-[24px] border border-white/10 bg-white/[0.06] p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#E9FF6A] text-sm font-black text-[#080913]">{chatRoom.avatar}</span>
          <div>
            <h2 className="font-black">{chatRoom.name}</h2>
            <p className="text-xs text-[#E9FF6A]">Live room open · {chatRoom.unreadCount} unread</p>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-3 rounded-[24px] border border-white/10 bg-black/20 p-3">
        <p className="mx-auto w-fit rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/50">Today 20:00</p>
        {messages.map((message) => <ChatBubble key={message.id} message={message} />)}
        <div className="rounded-[18px] border border-[#FF7AB8]/30 bg-[#FF7AB8]/10 p-3 text-xs leading-5 text-white/70">
          안전 안내: 불편한 메시지는 신고하거나 차단할 수 있습니다.
        </div>
      </div>
      <div className="sticky bottom-20 mt-3 flex gap-2 rounded-full border border-white/10 bg-[#101226] p-2">
        <button className="grid h-10 w-10 place-items-center rounded-full bg-white/10">＋</button>
        <input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/35" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Orbit에게 메시지 보내기" />
        <button className="rounded-full bg-[#E9FF6A] px-4 text-sm font-black text-[#080913]" onClick={sendMessage}>전송</button>
      </div>
    </section>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.sender === "system") {
    return <p className="rounded-full bg-white/10 px-3 py-2 text-center text-[11px] text-white/55">{message.body}</p>;
  }
  const mine = message.sender === "me";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[78%] rounded-[22px] px-4 py-3 text-sm leading-6 ${mine ? "rounded-br-md bg-[#E9FF6A] text-[#080913]" : "rounded-bl-md bg-white/10 text-white"}`}>
        <p>{message.body}</p>
        <span className={`mt-1 block text-[10px] ${mine ? "text-black/55" : "text-white/40"}`}>{message.time} {message.status ? `· ${message.status}` : ""}</span>
      </div>
    </div>
  );
}

function MyScreen() {
  return (
    <section className="space-y-3">
      <SectionTitle eyebrow="My Orbit" title="오늘의 참여 기록" />
      {notifications.map((item) => (
        <article key={item.id} className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-black">{item.title}</h3>
              <p className="mt-1 text-sm text-white/60">{item.body}</p>
            </div>
            {item.unread && <span className="h-2 w-2 rounded-full bg-[#FF7AB8]" />}
          </div>
        </article>
      ))}
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#9BE7FF]">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-black tracking-tight">{title}</h2>
    </div>
  );
}

function BottomTabBar({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (tab: Tab) => void }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-30 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-6 gap-1 border-t border-white/10 bg-[#090A18]/95 px-3 py-3 backdrop-blur-xl">
      {tabs.map((tab) => (
        <button key={tab.id} className={`rounded-2xl px-1 py-2 text-[10px] font-bold ${activeTab === tab.id ? "bg-white text-[#080913]" : "text-white/50"}`} onClick={() => setActiveTab(tab.id)}>
          <span className="block text-base">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

