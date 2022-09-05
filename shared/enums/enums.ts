export const EnumLabelList = [
    /**
     * @see Position
     */
    '东', '南', '西', '北',
] as const

/**
 * @description
 */
export const enum Position {
    east = 0x00,
    south = 0x01,
    west = 0x02,
    north = 0x03,
}