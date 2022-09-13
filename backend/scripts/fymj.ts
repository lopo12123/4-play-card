import { WebSocket } from "ws";

class Fymj {
    //
    private cardPool: any[] = []

    constructor(private roomId: string, private idList: string[]) {
    }

    // 初始化
    init() {

    }
}

export abstract class MjController {
    private static pool = new Map<string, Fymj>()

    /**
     * @description 开始
     */
    public static start(roomId: string, wsIdList: string[]) {
        this.pool.set(roomId, new Fymj(roomId, wsIdList))
    }
}