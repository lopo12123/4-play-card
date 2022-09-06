/**
 * @description 全部枚举项的映射表
 */
export const EnumLabelList = [
    '东', '南', '西', '北',
    '东风', '南风', '西风', '北风',
    '红中', '发财', '白板',
    '一万', '二万', '三万',
    '四万', '五万', '六万',
    '七万', '八万', '九万',
    '一筒', '二筒', '三筒',
    '四筒', '五筒', '六筒',
    '七筒', '八筒', '九筒',
    '一索', '二索', '三索',
    '四索', '五索', '六索',
    '七索', '八索', '九索',
] as const

/**
 * @description 座次方向
 */
export const enum Seat {
    east = 0x00,
    south,
    west,
    north,
}

/**
 * @description 卡池
 */
export const enum MJCard {
    dong = 0x04,
    nan, xi, bei,
    zhong, fa, blank,
    wan1, wan2, wan3,
    wan4, wan5, wan6,
    wan7, wan8, wan9,
    tong1, tong2, tong3,
    tong4, tong5, tong6,
    tong7, tong8, tong9,
    suo1, suo2, suo3,
    suo4, suo5, suo6,
    suo7, suo8, suo9,
}