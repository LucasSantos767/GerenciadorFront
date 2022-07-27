import io, { Socket } from "socket.io-client";

export class SocketModule {
  private static instance: SocketModule;

  private io: Socket;
  private listeners = new Map<string, any>();

  
  constructor(uri: string) {
    this.io = io(uri);
    this.registerDefaultListeners();
  }
  
  public static connect() {
    if (SocketModule.instance) return SocketModule.instance;
    SocketModule.instance = new SocketModule("ws://localhost:3001");
    return SocketModule.instance;
  }
  
  private registerDefaultListeners() {

  }

  public registerListener(
    namespace: string,
    event: string,
    cb: (userEmail: string) => void
  ) {
    if (this.listeners.has(`${namespace}/${event}`)) return;

    this.io.on(event, cb);
    this.listeners.set(`${namespace}/${event}`, cb);
  }
}