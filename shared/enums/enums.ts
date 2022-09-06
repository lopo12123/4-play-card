/**
 * @description 全部枚举项的映射表
 */
export const EnumLabelList = [
    '东', '南', '西', '北',
    '东', '南', '西', '北',
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