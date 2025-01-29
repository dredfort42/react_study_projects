import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Spinner';
import { HiArrowDownOnSquare } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isPending } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const moveBack = useMoveBack();
    const navigate = useNavigate();

    if (isPending) {
        return <Spinner />;
    }

    console.log(booking);
    const { status } = booking;

    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{booking.id}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace('-', ' ')}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === 'unconfirmed' && (
                    <Button
                        icon={<HiArrowDownOnSquare />}
                        onClick={() => navigate(`/checkin/${booking.id}`)}
                    >
                        Check in
                    </Button>
                )}
                {status === 'checked-in' && (
                    <Button
                        onClick={() => checkout(booking.id)}
                        disabled={isCheckingOut}
                    >
                        Check out
                    </Button>
                )}
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
