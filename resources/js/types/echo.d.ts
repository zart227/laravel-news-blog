interface EchoChannel {
  listen(event: string, callback: (e: any) => void): EchoChannel;
  stopListening(event: string, callback?: (e: any) => void): EchoChannel;
  subscribed(callback: () => void): EchoChannel;
  error(callback: (error: any) => void): EchoChannel;
  leave(): void;
}

interface Echo {
  channel(channel: string): EchoChannel;
  private(channel: string): EchoChannel;
  join(channel: string): EchoChannel;
  leave(channel: string): void;
  disconnect(): void;
}

declare global {
  interface Window {
    Echo: Echo;
  }
}

export { Echo, EchoChannel }; 