import PropTypes from 'prop-types';
import Button from '../Shared/Button/Button';
const ContestCard = ({ contest }) => {
    const { name, image, participate_count, description } = contest
    return (
        <div className='bg-cardCol py-2 px-3 rounded-md flex flex-col justify-evenly group'>
            <div className='relative w-full h-full pb-16'>
                <div className='relative overflow-hidden'>
                    <div className='scale-105 group-hover:scale-100 transition duration-300'>
                    <img src={image} alt="" />
                    </div>
                    <h4 className='absolute bg-seconderyCol/70 px-2 py-1 font-medium text-white rounded-md top-0 right-0 mt-2 mr-2'>Participated: {participate_count}</h4>
                </div>
                <h3 className='text-white font-semibold text-2xl uppercase my-1 min-h-[64px]'>{name}</h3>
                <hr className='my-2 border-seconderyCol/70' />
                <p className='text-sm text-white'>{description.slice(0, 60)}...</p>
                <div className='text-center absolute bottom-2 w-full'>
                    <Button name="Details"></Button>
                </div>
            </div>
        </div>
    );
};

ContestCard.propTypes = {
    contest: PropTypes.object.isRequired
}
export default ContestCard;