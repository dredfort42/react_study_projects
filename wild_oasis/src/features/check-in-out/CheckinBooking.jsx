import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import { useSettings } from '../settings/useSettings';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBrearfast] = useState(false);

    const { settings, isPending: isSettingsLoading } = useSettings();

    const { booking, isPending: isBookingLoading } = useBooking();
    const { checkin, isCheckingIn } = useCheckin();

    const moveBack = useMoveBack();

    useEffect(() => setConfirmPaid(booking?.is_payed ?? false), [booking]);

    if (isBookingLoading || isSettingsLoading) return <Spinner />;

    const {
        id: bookingId,
        guests,
        total_price,
        number_of_guests,
        is_breakfast_included,
        number_of_nights,
    } = booking;

    const breakfastTotalPrice =
        settings.breakfast_price * number_of_nights * number_of_guests;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast) {
            checkin({
                bookingId,
                breakfast: {
                    is_breakfast_included: true,
                    extras_price: breakfastTotalPrice,
                    total_price: total_price + breakfastTotalPrice,
                },
            });
        } else {
            checkin({ bookingId, breakfast: {} });
        }
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!is_breakfast_included && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBrearfast((breakfast) => !breakfast);
                            setConfirmPaid(false);
                        }}
                        id="breakfast"
                    >
                        Add breakfast for {formatCurrency(breakfastTotalPrice)}?
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    id="confirm"
                    disabled={confirmPaid || isCheckingIn}
                >
                    {guests.full_name} has paid the total amount of{' '}
                    {!addBreakfast
                        ? formatCurrency(total_price)
                        : formatCurrency(total_price + breakfastTotalPrice) +
                          ` (${formatCurrency(total_price)} + ${formatCurrency(
                              breakfastTotalPrice
                          )})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingIn}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
