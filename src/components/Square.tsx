import './Square.css'

/**
 * 
 * @param value 
 * @function onClick set the marker of the field by clicking it ('O', 'X')
 * @returns 
 */
type SquareProps = {
    value : string
    onClick : () => void
}

export function Square({value, onClick} : SquareProps) {

    return <button key={value} onClick={onClick} className='square'>{value}</button>
}