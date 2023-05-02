import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
 
export const Rating = ({rating, onClick}) => {
    return (
        <div>
          {[...Array(5)].map((_, i) => (
            <span key={i} onClick={()=>onClick(i) }>
                { rating > i ? 
                (
                <AiFillStar fontSize="15px" />
                ) 
                : 
                (
                 <AiOutlineStar fontSize="15px" />   
                ) 
                } 
            </span>
          ))}
        </div>
    )
}