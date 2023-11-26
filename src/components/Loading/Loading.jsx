import 'ldrs/spiral'
import Container from '../Shared/Container/Container';

const Loading = () => {
    return (
        <Container>
            <div className='w-full min-h-[70vh] flex justify-center items-center'>
                <l-spiral
                    size="40"
                    speed="0.9"
                    color="#0ECDB9"
                ></l-spiral>
            </div>
        </Container>
    );
};

export default Loading;