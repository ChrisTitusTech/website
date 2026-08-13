type Stream = { videoId: string; title: string; date: string; hasChatReplay: boolean };
type ChatComment = {
  content_offset_seconds: number;
  commenter?: { display_name?: string; name?: string };
  message?: { body?: string; user_color?: string; user_badges?: Array<{ _id: string; version: string }>; fragments?: Array<{ text?: string; emoticon?: { emoticon_id?: string } }> };
};

const dataElement = document.querySelector<HTMLScriptElement>("#stream-data");
const streams: Stream[] = dataElement ? JSON.parse(dataElement.textContent ?? "[]") : [];
const videoId = new URLSearchParams(location.search).get("v") ?? "";
const stream = streams.find((item) => item.videoId === videoId);
if (!stream || !/^[A-Za-z0-9_-]{6,16}$/.test(videoId)) location.replace("/live-streams/");

if (stream) {
  const title = document.querySelector<HTMLElement>("#stream-title");
  const date = document.querySelector<HTMLElement>("#stream-date");
  if (title) title.textContent = stream.title;
  if (date) date.textContent = stream.date;
  const fallback = document.querySelector<HTMLAnchorElement>("#youtube-fallback");
  if (fallback) fallback.href = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
  document.title = `${stream.title} | Chris Titus Tech`;
}

let comments: ChatComment[] = [];
let pointer = 0;
let lastTime = -1;
let timer: number | undefined;
let autoScroll = true;
const emoteMap = new Map<string, string>();
const badgeMap = new Map<string, string>();
let player: { getCurrentTime(): number } | undefined;

function formatTime(value: number) {
  const seconds = Math.max(0, Math.floor(value));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const remainder = seconds % 60;
  return `${hours ? `${hours}:` : ""}${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function renderMessage(comment: ChatComment, suppressScroll = false) {
  const container = document.querySelector<HTMLElement>("#chat-messages");
  if (!container) return;
  const row = document.createElement("div");
  row.className = "chat-message";
  const timestamp = document.createElement("span");
  timestamp.className = "chat-ts";
  timestamp.textContent = formatTime(comment.content_offset_seconds);
  row.append(timestamp);
  for (const badge of comment.message?.user_badges ?? []) {
    const source = badgeMap.get(`${badge._id}/${badge.version}`);
    if (!source) continue;
    const image = document.createElement("img");
    image.className = "chat-badge"; image.src = source; image.alt = badge._id; row.append(image);
  }
  const name = document.createElement("strong");
  name.className = "chat-user";
  name.textContent = `${comment.commenter?.display_name ?? comment.commenter?.name ?? "unknown"}:`;
  row.append(name);
  const body = document.createElement("span");
  for (const fragment of comment.message?.fragments ?? [{ text: comment.message?.body ?? "" }]) {
    const emoteId = fragment.emoticon?.emoticon_id;
    if (!emoteId) { body.append(document.createTextNode(fragment.text ?? "")); continue; }
    const image = document.createElement("img");
    image.className = "chat-emote"; image.alt = fragment.text ?? "emote"; image.title = image.alt;
    image.src = emoteMap.get(emoteId) ?? `https://static-cdn.jtvnw.net/emoticons/v2/${encodeURIComponent(emoteId)}/default/dark/1.0`;
    image.addEventListener("error", () => image.replaceWith(document.createTextNode(fragment.text ?? "")), { once: true });
    body.append(image);
  }
  row.append(body); container.append(row);
  if (!suppressScroll && autoScroll) container.scrollTop = container.scrollHeight;
}

function pointerAt(time: number) {
  let low = 0; let high = comments.length;
  while (low < high) { const middle = low + high >> 1; if (comments[middle].content_offset_seconds <= time) low = middle + 1; else high = middle; }
  return low;
}
function seekChat(time: number) {
  const container = document.querySelector<HTMLElement>("#chat-messages"); if (!container) return;
  container.replaceChildren(); pointer = pointerAt(time);
  for (let index = Math.max(0, pointer - 50); index < pointer; index += 1) renderMessage(comments[index], true);
  container.scrollTop = container.scrollHeight; lastTime = time;
}
function syncChat() {
  const time = player?.getCurrentTime(); if (time === undefined || Number.isNaN(time) || time < 0) return;
  if (lastTime >= 0 && Math.abs(time - lastTime) > 3) { seekChat(time); return; }
  lastTime = time;
  while (pointer < comments.length && comments[pointer].content_offset_seconds <= time) renderMessage(comments[pointer++]);
  const status = document.querySelector<HTMLElement>("#chat-status"); if (status) status.textContent = `${pointer}/${comments.length}`;
}

const messages = document.querySelector<HTMLElement>("#chat-messages");
const scrollButton = document.querySelector<HTMLButtonElement>("#chat-scroll-btn");
messages?.addEventListener("scroll", () => { autoScroll = messages.scrollHeight - messages.scrollTop - messages.clientHeight < 80; if (scrollButton) scrollButton.hidden = autoScroll; });
scrollButton?.addEventListener("click", () => { if (messages) messages.scrollTop = messages.scrollHeight; autoScroll = true; scrollButton.hidden = true; });

if (stream?.hasChatReplay) fetch(`/chats/${encodeURIComponent(videoId)}.json`).then((response) => {
  if (!response.ok) throw new Error("Chat replay unavailable"); return response.json();
}).then((data) => {
  for (const emote of data.embeddedData?.firstParty ?? []) if (emote.id && emote.data) emoteMap.set(emote.id, `data:image/${emote.imageType ?? "png"};base64,${emote.data}`);
  for (const badge of data.embeddedData?.twitchBadges ?? []) for (const [version, value] of Object.entries<any>(badge.versions ?? {})) if (value.bytes) badgeMap.set(`${badge.Name}/${version}`, `data:image/${value.imageType ?? "png"};base64,${value.bytes}`);
  comments = (data.comments ?? []).filter((comment: ChatComment) => Number.isFinite(comment.content_offset_seconds)).sort((left: ChatComment, right: ChatComment) => left.content_offset_seconds - right.content_offset_seconds);
  const chat = document.querySelector<HTMLElement>("#chat-col"); chat?.removeAttribute("hidden");
  document.querySelector("#player-wrapper")?.classList.add("has-chat");
}).catch(() => {});

declare global { interface Window { YT: any; onYouTubeIframeAPIReady: () => void } }
window.onYouTubeIframeAPIReady = () => {
  player = new window.YT.Player("yt-player", { host: "https://www.youtube-nocookie.com", videoId, playerVars: { rel: 0, modestbranding: 1, origin: location.origin }, events: { onStateChange(event: { data: number }) {
    if (event.data === window.YT.PlayerState.PLAYING && timer === undefined) timer = window.setInterval(syncChat, 500);
    else if (event.data !== window.YT.PlayerState.PLAYING && timer !== undefined) { clearInterval(timer); timer = undefined; }
  } } });
};
const youtubeApi = document.createElement("script"); youtubeApi.src = "https://www.youtube.com/iframe_api"; youtubeApi.async = true; document.head.append(youtubeApi);

export {};
