declare interface Channel {
  listen(event: string, callback: Function): Channel;
  stopListening(event?: string, callback?: Function): Channel;
  subscribed(callback: Function): Channel;
  error(callback: Function): Channel;
  leave(): void;
}

declare interface Echo {
  channel(name: string): Channel;
  private(name: string): Channel;
  leave(name: string): void;
  join(name: string): Channel;
  disconnect(): void;
  connect(): void;
  socketId(): string | null;
}

declare global {
  interface Window {
    Echo: Echo;
  }
}

export { Channel, Echo }; 