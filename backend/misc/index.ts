/**
 * @description 格式化时间输出
 */
export const formatDate = () => {
    const _date = new Date()
    return `${ _date.getFullYear() }`
        + `/${ _date.getMonth().toString().padStart(2, '0') }`
        + `/${ _date.getDate().toString().padStart(2, '0') }`
        + ` ${ _date.getHours().toString().padStart(2, '0') }`
        + `:${ _date.getMinutes().toString().padStart(2, '0') }`
        + `:${ _date.getSeconds().toString().padStart(2, '0') }`
}

// region 标准输出颜色、样式
/**
 * @description 字体颜色
 */
export enum FontColorEnums {
    'white' = '30',
    'red' = '31',
    'green' = '32',
    'yellow' = '33',
    'blue' = '34',
    'purple' = '35',
    'lightBlue' = '36',
    'brown' = '37'
}

/**
 * @description 背景色
 */
export enum BackgroundColorEnums {
    'white' = '40',
    'red' = '41',
    'green' = '42',
    'yellow' = '43',
    'blue' = '44',
    'purple' = '45',
    'lightBlue' = '46',
    'brown' = '47'
}

/**
 * @description 内容 字体颜色 背景颜色
 */
export type ColorfulConfig = {
    message: string
    /**
     * @description 字体颜色
     * @default FontColorEnums.black
     */
    fontColor?: FontColorEnums
    /**
     * @description 背景颜色
     * @default BackgroundColorEnums.white
     */
    backgroundColor?: BackgroundColorEnums
}
/**
 * @description 设置颜色输出
 */
export const colorfulStdout = (chunks: ColorfulConfig[]) => {
    return chunks
        .map(chunk => {
            if(!chunk.fontColor && !chunk.backgroundColor)
                return '\x1b[0m' + chunk.message
            else if(chunk.fontColor && chunk.backgroundColor)
                return `\x1b[${ chunk.fontColor };${ chunk.backgroundColor }m${ chunk.message }`
            else
                return `\x1b[0m\x1b[${ chunk.fontColor ?? chunk.backgroundColor }m${ chunk.message }`
        })
        .join('') + '\x1b[0m'
}
// endregion