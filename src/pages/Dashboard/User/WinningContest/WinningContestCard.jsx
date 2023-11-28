import PropTypes from 'prop-types';

const WinningContestCard = ({ contest }) => {

    return (
        <div className="w-full min-h-[35vh] bg-cardCol" style={{ backgroundImage: `url(${contest.image})`, backgroundSize: "cover" }}>
            <div className='w-full h-full bg-seconderyCol/90 top-0 left-0 relative'>
                <div className='text-center mt-2 md:absolute top-0 flex items-center justify-center w-full'>
                    <h3 className='text-center font-semibold text-white text-2xl border-b-2 inline px-2 '>The Winner</h3>
                </div>
                <div className='flex flex-col md:flex-row items-center justify-evenly gap-4 py-3'>
                    <div className='text-white '>
                        <h3 className='text-xl md:text-4xl font-semibold text-primaryCol drop-shadow-lg uppercase'>{contest?.name}</h3>
                        <p className='text-lg font-medium'>{contest?.contest_type}</p>
                        <p className='text-xl font-medium'>You won out of <span>{contest?.participate_count}</span> participants.</p>
                        <h2 className='text-xl font-medium'>You won <span className='text-primaryCol'>${contest?.prize_money}</span>  from this contest</h2>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <img className='w-32 md:w-64 md:h-64 rounded-full object-cover border-2 border-primaryCol drop-shadow-lg' src={contest?.winner?.image} alt="" />
                        <h3 className='text-white uppercase font-medium'>{contest?.winner?.name}</h3>
                        <h3 className='text-white'>{contest?.winner?.email}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

WinningContestCard.propTypes = {
    contest: PropTypes.object
}

export default WinningContestCard;