import { WSController } from "./wsServer";
import { MJCard } from "../../shared/enums/enums";

class Fymj {
    private cardPool: any[] = []

    constructor(private roomId: string, private idList: string[]) {
    }

    // 初始化
    init() {
        for (let i = 0x04; i <= 0x25; i++) {
            this.cardPool.push(i, i, i, i)
        }
        const setupStatus: { [k: string]: number[] } = {}
        this.idList.forEach(wsId => {
            for (let i = 0; i < 13; i++) {
                const _rand = Math.floor(Math.random() * this.cardPool.length)
                setupStatus[wsId].push(this.cardPool[_rand])
                this.cardPool.splice(_rand, 1)
            }
        })
        return setupStatus
    }
}

/**
 * @description controller
 */
export abstract class MjController {
    private static pool = new Map<string, Fymj>()

    /**
     * @description 开始
     */
    public static start(roomId: string) {
        const wsIdList = WSController.roomInfo([ roomId ])[0].wsList

        if(wsIdList.length !== 4) return null
        else {
            const _ = new Fymj(roomId, wsIdList)
            this.pool.set(roomId, _)
            return _.init()
        }
    }
}